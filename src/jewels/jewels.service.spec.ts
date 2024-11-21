import { Test, TestingModule } from '@nestjs/testing';
import { JewelsService } from './jewels.service';
import { jewelsRepositoryMock } from '../testing/jewels/jewels-repository.mock';
import { userRepositoryMock } from '../testing/users/user-repository.mock';
import { createJewelsMock } from '../testing/jewels/create-jewels.mock';
import { jewelsMock } from '../testing/jewels/jewels.mock';

describe('JewelsService', () => {
  let jewelsService: JewelsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JewelsService, jewelsRepositoryMock, userRepositoryMock],
    }).compile();

    jewelsService = module.get<JewelsService>(JewelsService);
  });

  it('should be defined', () => {
    expect(jewelsService).toBeDefined();
  });

  describe('Create', () => {
    it('should be create jewels', async () => {
      jest.spyOn(jewelsService, 'findJewel').mockResolvedValueOnce(null);
      const jewel = await jewelsService.create(createJewelsMock);

      expect(jewel).toHaveProperty('id');
    });

    it('should be distribuite jewels', async () => {
      const mockUser = {
        id: 2,
        firstName: 'Severino',
        lastName: 'Julio da Cunha',
        email: 'severino.julio.dacunha@bodyfast.com.br',
        password: '1234',
        role: 'user',
        emailVerified: true,
        createdAt: '2024-11-12 09:40:34.562012',
        updatedAt: '2024-11-13 19:19:32.0005',
        deleteAt: null,
        coins: 10,
        productsPurchased: [],
        jewels: [],
      };

      userRepositoryMock.useValue.findOne.mockResolvedValue(mockUser)

      await jewelsService.distribuiteJewels(2, 2)

      expect(userRepositoryMock.useValue.findOne).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        select: { id: true, firstName: true, role: true, email: true, coins: true },
        relations: { jewels: true },
      })

      expect(userRepositoryMock.useValue.save).toHaveBeenCalledWith({...mockUser, coins: 110, jewels: [{id: mockUser.id}] })

      expect(jewelsRepositoryMock.useValue.save).toHaveBeenCalledWith({...jewelsMock[1], active: false, user: {id: mockUser.id}})
      
    });
  });
});
