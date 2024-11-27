import { Test, TestingModule } from '@nestjs/testing';
import { JewelsController } from './jewels.controller';
import { jewelsServiceMock } from '../testing/jewels/jewels-service.mock';
import { AuthGuard } from '../auth/guards/auth.guard';
import { authGuardMock } from '../testing/auth/auth-guard.mock';
import { createJewelsMock } from '../testing/jewels/create-jewels.mock';
import { updateJewelsMock } from '../testing/jewels/update-jewels.mock';

describe('JewelsController', () => {
  let jewelsController: JewelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JewelsController],
      providers: [jewelsServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

      jewelsController = module.get<JewelsController>(JewelsController);
  });

  it('should be defined', () => {
    expect(jewelsController).toBeDefined();
  });

  describe('Create', () => {
    it('should be create jewels', async () => {
      const newJewel = await jewelsController.create(createJewelsMock)

      expect(newJewel).toHaveProperty('id')
    })

    it('should be distribuite jewels', async () => {
      const jewels = await jewelsController.distribuiteJewels(2, 3)

      expect(jewels.active).toEqual(false)
    })
  })

  describe('Read', () => {
    it('should be find all jewels', async () => {
      const jewels = await jewelsController.findAll()

      expect(jewels.length).toBeGreaterThan(0)
    })

    it('should be find jewel by id', async () => {
      const jewel = await jewelsController.jewelById(9)

      console.log('user ',jewel.user)

      expect(jewel.name).toEqual('Inclusion Stone')
    })
  })

  describe('Update', () => {
    it('should be update jewel', async () => {
      const updateJewel = await jewelsController.update(1, updateJewelsMock)

      expect(updateJewel.active).toEqual(updateJewelsMock.active)
    })
  })
});
