import { removeVietnameseTones } from '@common/utils.common';
import { DistrictsService } from '@modules/districts/districts.service';
import { CreateDistrictDto } from '@modules/districts/dto/create-district.dto';
import { District } from '@modules/districts/entities/district.entity';
import {
	ParishAddress,
	ParishMassTimes,
	Parishes,
} from '@modules/parishes/entities/parish.entity';
import { ParishesService } from '@modules/parishes/parishes.service';
import { CreateProvinceDto } from '@modules/provinces/dto/create-province.dto';
import { Province } from '@modules/provinces/entities/province.entity';
import { ProvincesService } from '@modules/provinces/provinces.service';
import { Inject, Injectable } from '@nestjs/common';
// import { Cron, CronExpression } from '@nestjs/schedule';
import puppeteer from 'puppeteer';
import { Logger } from 'winston';

type ProvindersCrawler = {
	name: string;
	code: number;
	division_type: string;
	codename: string;
	phone_code: number;
	districts: [];
};

type DistrictsCrawler = {
	name: string;
	code: number;
	division_type: string;
	codename: string;
	province_code: number;
	wards: [];
};

@Injectable()
export class CrawlerService {
	constructor(
		@Inject('winston')
		private readonly logger = new Logger(),
		private readonly provinceService: ProvincesService,
		private readonly districtService: DistrictsService,
		private readonly parishService: ParishesService,
	) {}

	private id = 0;
	private emptyCount = 0;
	private start = false;

	async delay(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	async getProvince(name: string) {
		if (!name) return null;

		name = removeVietnameseTones(name)
			.toLocaleLowerCase()
			.replace(/[^a-zA-Z0-9 ]/g, '')
			.replace('qui', 'quy')
			.trim();

		const regex = new RegExp(`^${name}|${name}$`);

		const filter = {
			unaccent_name: { $regex: regex, $options: 'i' },
		};

		const result = await this.provinceService.findOneByCondition({}, filter);

		return result as Province;
	}

	async getDistrict(
		province: Province,
		districtText?: string,
		provinceText?: string,
	) {
		if (!province?.province_code) {
			return null;
		}

		districtText = removeVietnameseTones(districtText)
			.toLocaleLowerCase()
			.replace(/[^a-zA-Z0-9 ]/g, '')
			.replace('qui', 'quy')
			.trim();
		provinceText = removeVietnameseTones(provinceText)
			.toLocaleLowerCase()
			.replace(/[^a-zA-Z0-9 ]/g, '')
			.replace('qui', 'quy')
			.trim();

		const regex = new RegExp(
			`^${districtText}|${districtText}$|${provinceText}`,
		);

		const filter = {
			province_code: province.province_code,
			unaccent_name: { $regex: regex, $options: 'i' },
		};

		let result = await this.districtService.findOneByCondition({}, filter);

		return result;
	}

	// @Cron(CronExpression.EVERY_5_SECONDS)
	async parishesCrawler() {
		console.log('parishesCrawler status: ' + this.start);

		if (this.start) return;
		console.log('parishesCrawler is started');
		this.start = true;
		const browser = await puppeteer.launch({
			headless: 'new',
			args: ['--no-sandbox'],
		});
		while (this.emptyCount <= 20) {
			try {
				const page = await browser.newPage();

				await page.goto(`https://giole.vn/x.0/y.0/a-${this.id}.html`);

				const allInfo = await page.evaluate(function () {
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
						const textReplace = str
							.trim()
							.replace(/^(tp|h|tt|tx)(\s|\.)/gi, '')
							.replace(
								/^(thành phố|huyện|huyện đảo|đảo|thị trấn|thị xã)(\s|\.)/gi,
								'',
							)
							.replace(/q(\s|\.)/gi, 'Quận ')
							.trim();

						const result = textReplace.match(/^Quận\s+\D+$/gi)
							? textReplace.replace('Quận', '')
							: textReplace;
						return result.replace(/\s+/gi, ' ').trim();
					};
					const convertTextWards = (str: string = ''): string => {
						return str
							.trim()
							.replace(/p(\s|\.)/gi, 'Phường ')
							.replace(/\s+/gi, ' ')
							.trim();
					};
					const addrArr = [
						...new Set(churchAddressTextContent.split(',').reverse()),
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
							: addrArrLg === 2
							? addrArr[1].trim() || ''
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
				});

				if (allInfo) {
					if (this.emptyCount > 0) {
						this.emptyCount = 0;
					}

					const province = await this.getProvince(allInfo.address.province);
					const district = await this.getDistrict(
						province,
						allInfo.address.district,
						allInfo.address.province,
					);
					const unaccent_name = removeVietnameseTones(
						allInfo.name,
					).toLocaleLowerCase();
					const slug = unaccent_name.replace(/\W+/gi, '-').trim();

					const fullAdress = Object.values(allInfo.address)
						.reverse()
						.join(' ')
						.trim();

					const address: ParishAddress = {
						streetNumber:
							!province && !district
								? fullAdress
								: allInfo.address.streetNumber,
						wards: !district ? allInfo.address.district : allInfo.address.wards,
						province: province as Province,
						district: district as District,
					};

					this.logger.debug(address);

					const payload: Parishes = {
						parish_code: this.id,
						is_church: allInfo.isChurch,
						name: allInfo.name,
						unaccent_name,
						slug: allInfo.isChurch ? `nha-tho-${slug}` : slug,
						note: allInfo.note,
						address,
						mass_time: allInfo.time as ParishMassTimes,
					};

					await this.parishService.create(payload);

					this.logger.debug({
						id: this.id,
						status: 'done',
					});
				} else {
					this.logger.error({ id: this.id, status: 'not found' });
					this.emptyCount = ++this.emptyCount;
				}
				await page.close();
			} catch (error) {
				this.logger.error({ id: this.id, status: 'error', ...error });
			} finally {
				this.id = ++this.id;
				// await this.delay(1000);
			}
		}
		await browser.close();
	}

	async provincesCrawler() {
		try {
			const res = await fetch('https://provinces.open-api.vn/api/p/');
			if (res.ok) {
				const data: ProvindersCrawler[] = await res.json();
				const remapData: CreateProvinceDto[] = data.map(
					(p): CreateProvinceDto => {
						const { code, codename, division_type, name } = p;
						let slug = codename.replace(/\_/gi, '-');

						if (division_type === 'thành phố trung ương') {
							slug = slug.replace('thanh-pho-', '');
						} else if (division_type === 'tỉnh') {
							slug = slug.replace('tinh-', '');
						}

						return {
							province_code: code,
							name,
							unaccent_name: slug.replace(/\-/gi, ' '),
							slug,
							division_type: p.division_type,
						};
					},
				);

				const result = await this.provinceService.addCrawlerData(remapData);
				this.logger.debug(result);
			}
			return 'OK';
		} catch (error) {
			this.logger.error(error);
			return 'Error';
		}
	}

	async districtsCrawler() {
		try {
			const res = await fetch('https://provinces.open-api.vn/api/d/');
			if (res.ok) {
				const data: DistrictsCrawler[] = await res.json();
				const remapData: CreateDistrictDto[] = data.map((d) => {
					const { code, codename, division_type, name, province_code } = d;
					let slug = codename.replace(/\_/gi, '-');

					switch (division_type) {
						case 'quận':
							slug = slug.match(/^quan\-\D+$/gi)
								? slug.replace('quan-', '')
								: slug;
							break;

						case 'huyện':
							slug = slug.replace('huyen-', '');
							break;

						case 'thành phố':
							slug = slug.replace('thanh-pho-', '');
							break;

						case 'thị xã':
							slug = slug.replace('thi-xa-', '');
							break;
					}

					return {
						district_code: code,
						name,
						unaccent_name: slug.replace(/\-/gi, ' '),
						slug,
						division_type: d.division_type,
						province_code,
					};
				});

				const result = await this.districtService.addCrawlerData(remapData);
				this.logger.debug(result);
			}
			return 'OK';
		} catch (error) {
			this.logger.error(error);
			return 'Error';
		}
	}
}
