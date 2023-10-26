import { Test, TestingModule } from '@nestjs/testing';
import { ThonXomService } from '../thon-xom.service';

describe('ThonXomService', () => {
	let service: ThonXomService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ThonXomService],
		}).compile();

		service = module.get<ThonXomService>(ThonXomService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
