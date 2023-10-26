import { Test, TestingModule } from '@nestjs/testing';
import { TinhThanhService } from '../tinh-thanh.service';

describe('TinhThanhService', () => {
	let service: TinhThanhService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TinhThanhService],
		}).compile();

		service = module.get<TinhThanhService>(TinhThanhService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
