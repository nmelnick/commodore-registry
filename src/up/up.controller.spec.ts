import { Test, TestingModule } from '@nestjs/testing';
import { UpController } from './up.controller';

describe('UpController', () => {
  let controller: UpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpController],
    }).compile();

    controller = module.get<UpController>(UpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
