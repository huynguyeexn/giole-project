import { Test, TestingModule } from '@nestjs/testing';
import { PhuongXaService } from '../phuong-xa.service';

describe('PhuongXaService', () => {
	let service: PhuongXaService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PhuongXaService],
		}).compile();

		service = module.get<PhuongXaService>(PhuongXaService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
