import { Test, TestingModule } from '@nestjs/testing';
import { ThonXomController } from '../thon-xom.controller';
import { ThonXomService } from '../thon-xom.service';

describe('ThonXomController', () => {
	let controller: ThonXomController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ThonXomController],
			providers: [ThonXomService],
		}).compile();

		controller = module.get<ThonXomController>(ThonXomController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
