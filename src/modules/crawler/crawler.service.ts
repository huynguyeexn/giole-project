import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import puppeteer from 'puppeteer';
import { Logger } from 'winston';

@Injectable()
export class CrawlerService {
	constructor(
		@Inject('winston')
		private readonly logger = new Logger(),
	) {}

	private id = 0;

	@Cron(CronExpression.EVERY_5_SECONDS)
	async handleCron() {
		const browser = await puppeteer.launch({
			headless: 'new',
			args: ['--no-sandbox'],
		});
		try {
			if (this.id > 2500) return;

			const page = await browser.newPage();

			await page.goto(`https://giole.vn/x.0/y.0/a-${this.id}.html`);
			this.id = ++this.id;
			const allInfo = await page.evaluate(() => {
				try {
					if (
						!document.querySelector('#accordion') ||
						!document.querySelector('#accordion').innerHTML.trim()
					) {
						return false;
					}

					const churchNameTextContent = document
						.querySelector('#heading0 > a > h5')
						.textContent.replace(/\t|\n/gi, '')
						.trim();

					const churchAddressTextContent = document
						.querySelector('#accordion > div > div.card-body > a')
						.textContent.replace(/\t|\n/gi, '')
						.trim();

					const churchContentTextContent = document
						.querySelector('#collapse0 > div')
						.textContent.replace(/\t|\n/gi, '')
						.trim();

					const isMatchNhaThoText =
						churchNameTextContent.match(/(Nhà thờ)(.*)/i)?.[2].trim() || '';

					const timeRawTextToArray = churchContentTextContent
						.match(/(?<=Giờ lễ)(.*)(?= Xem đường đi)/gi)[0]
						.match(
							/(?:Ngày thường: )(.*)(?:Thứ Bảy: )(.*)(?:Chúa Nhật: )(.*)/i,
						);

					const noteContent =
						churchAddressTextContent
							.match(/((?<=Ghi chú: )(.*)(?=Giờ lễNgày thường))/gi)?.[0]
							.trim() || '';

					const convertTextDistrict = (str: string = ''): string => {
						return str.replace(/q\./gi, 'Quận ').replace(/\s\s/gi, ' ').trim();
					};
					const convertTextWards = (str: string = ''): string => {
						return str
							.replace(/p\./gi, 'Phường ')
							.replace(/\s\s/gi, ' ')
							.trim();
					};
					const addrArr = [
						...new Set(churchAddressTextContent.split(', ').reverse()),
					];
					const addrArrLg = addrArr.length;
					const province = addrArrLg > 1 ? addrArr[0].trim() || '' : '';
					const district = addrArrLg > 1 ? convertTextDistrict(addrArr[1]) : '';
					const wards = addrArrLg > 3 ? convertTextWards(addrArr[2]) : '';
					const streetNumber =
						addrArrLg > 3
							? addrArr[3].trim() || ''
							: addrArrLg === 3
							? addrArr[2].trim() || ''
							: addrArrLg === 1
							? addrArr[0].trim() || ''
							: '';
					const address = {
						province,
						district,
						wards,
						streetNumber,
					};

					// 05h00,   07h00,   09h30, 15h00,   17h00,   19h00
					// 06:00, 16h30 (dành cho thiếu nhi);  19:00
					// 06:00, 08:30, 16:00, 18:00, 20:00
					// 07:00;  17:00;   19:00
					// 08:00 (thiếu nhi) - 18:00 - 20:00
					// 05:00  18:00
					const convertTimeTextToArray = (str: string = ''): string[] => {
						if (str === '') return [];

						// 05h00, 05g00 => 05:00
						str = str.replace(/(\d+)(.)(\d+)/g, '$1:$3').trim();

						// 05:00,   07:00 => 05:00, 07:00
						// 05:00 - 07:00 => 05:00, 07:00
						// 05:00; 07:00 => 05:00, 07:00
						// 05:00  07:00 => 05:00, 07:00
						str = str.replace(/\,\s*|\;\s+|\s+-\s+|\s\s/gi, ', ');

						// 06:00 16:30 => 05:00, 07:00
						str = str.replace(/(\d+)(\s)(\d+)/gi, '$1, $3');

						return str.split(', ');
					};

					const timeObject = {
						normalDay: convertTimeTextToArray(timeRawTextToArray[1]),
						saturday: convertTimeTextToArray(timeRawTextToArray[2]),
						sunday: convertTimeTextToArray(timeRawTextToArray[3]),
					};

					return {
						isChurch: !!isMatchNhaThoText,
						name: isMatchNhaThoText ? isMatchNhaThoText : churchNameTextContent,
						address,
						note: noteContent,
						time: timeObject,
					};
				} catch (error) {
					throw error;
				}
			});

			if (allInfo) {
				this.logger.debug(
					JSON.stringify({
						id: this.id - 1,
						...allInfo,
					}),
				);
			}
		} catch (error) {
			this.logger.error({ id: this.id - 1, ...error });
		} finally {
			await browser.close();
		}
	}
}
