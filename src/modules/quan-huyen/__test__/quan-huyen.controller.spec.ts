import { Test, TestingModule } from '@nestjs/testing';
import { QuanHuyenController } from '../quan-huyen.controller';
import { QuanHuyenService } from '../quan-huyen.service';

describe('QuanHuyenController', () => {
	let controller: QuanHuyenController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [QuanHuyenController],
			providers: [QuanHuyenService],
		}).compile();

		controller = module.get<QuanHuyenController>(QuanHuyenController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
