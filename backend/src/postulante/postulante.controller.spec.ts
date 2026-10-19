import { Test, TestingModule } from '@nestjs/testing';
import { PostulanteController } from './entities/postulante.controller';

describe('PostulanteController', () => {
  let controller: PostulanteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostulanteController],
    }).compile();

    controller = module.get<PostulanteController>(PostulanteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
