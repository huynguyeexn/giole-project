import { Test, TestingModule } from '@nestjs/testing';
import { TinhThanhController } from '../tinh-thanh.controller';
import { TinhThanhService } from '../tinh-thanh.service';

describe('TinhThanhController', () => {
	let controller: TinhThanhController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TinhThanhController],
			providers: [TinhThanhService],
		}).compile();

		controller = module.get<TinhThanhController>(TinhThanhController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
