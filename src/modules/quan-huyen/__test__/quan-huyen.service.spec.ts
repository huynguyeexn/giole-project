import { Test, TestingModule } from '@nestjs/testing';
import { QuanHuyenService } from '../quan-huyen.service';

describe('QuanHuyenService', () => {
	let service: QuanHuyenService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [QuanHuyenService],
		}).compile();

		service = module.get<QuanHuyenService>(QuanHuyenService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
