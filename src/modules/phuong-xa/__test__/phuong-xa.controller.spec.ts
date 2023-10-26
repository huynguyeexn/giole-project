import { Test, TestingModule } from '@nestjs/testing';
import { PhuongXaController } from '../phuong-xa.controller';
import { PhuongXaService } from '../phuong-xa.service';

describe('PhuongXaController', () => {
	let controller: PhuongXaController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PhuongXaController],
			providers: [PhuongXaService],
		}).compile();

		controller = module.get<PhuongXaController>(PhuongXaController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
