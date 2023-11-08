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
import { Cron, CronExpression } from '@nestjs/schedule';
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

	async getProvince(name: string) {
		name = removeVietnameseTones(name).toLocaleLowerCase();

		const filter = {
			unaccent_name: { $regex: name, $options: 'i' },
		};

		const result = await this.provinceService.findOneByCondition({}, filter);

		return result as Province;
	}

	async getDistrict(name, province: Province) {
		if (!province?.province_code) {
			return null;
		}

		name = removeVietnameseTones(name).toLocaleLowerCase();

		const filter = {
			province_code: province.province_code,
			unaccent_name: { $regex: name, $options: 'i' },
		};

		const result = await this.districtService.findOneByCondition({}, filter);

		return result;
	}

	@Cron(CronExpression.EVERY_5_SECONDS)
	async parishesCrawler() {
		const browser = await puppeteer.launch({
			headless: 'new',
			args: ['--no-sandbox'],
		});

		try {
			if (this.emptyCount > 10) return false;

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
					.match(/(?:Ngày thường: )(.*)(?:Thứ Bảy: )(.*)(?:Chúa Nhật: )(.*)/i);

				const noteContent =
					churchAddressTextContent
						.match(/((?<=Ghi chú: )(.*)(?=Giờ lễNgày thường))/gi)?.[0]
						.trim() || '';

				const convertTextDistrict = (str: string = ''): string => {
					return str.replace(/q\./gi, 'Quận ').replace(/\s\s/gi, ' ').trim();
				};
				const convertTextWards = (str: string = ''): string => {
					return str.replace(/p\./gi, 'Phường ').replace(/\s\s/gi, ' ').trim();
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
			});

			if (allInfo) {
				if (this.emptyCount > 0) {
					this.emptyCount = 0;
				}

				const province = await this.getProvince(allInfo.address.province);
				const district = await this.getDistrict(
					allInfo.address.district,
					province,
				);
				const unaccent_name = removeVietnameseTones(
					allInfo.name,
				).toLocaleLowerCase();
				const slug = unaccent_name.replace(/\s/gi, '-');

				const address: ParishAddress = {
					province: province as Province,
					district: district as District,
					wards: allInfo.address.wards,
					streetNumber: allInfo.address.streetNumber,
				};
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
				const result = await this.parishService.create(payload);

				this.logger.debug({
					id: this.id,
					status: 'done',
					result: JSON.stringify(result),
					payload: JSON.stringify(payload),
				});
				return;
			} else {
				this.logger.debug({ id: this.id, status: 'not found' });
				this.emptyCount = ++this.emptyCount;
				return;
			}
		} catch (error) {
			this.logger.error({ id: this.id, ...error });
		} finally {
			this.id = ++this.id;
			await browser.close();
			return;
		}
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
