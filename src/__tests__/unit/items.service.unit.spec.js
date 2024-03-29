import { ItemsService } from '../../service/items.service';

let mockItemsRepository = {
  createItem: jest.fn(),
  getItems: jest.fn(),
  getItemById: jest.fn(),
  getTypeItems: jest.fn(),
  updateItem: jest.fn(),
  deleteItem: jest.fn(),
};

let itemsService = new ItemsService();
itemsService._itemsRepository = mockItemsRepository;

const itemReturnValue = [
  {
    id: 1,
    name: '아메리카노',
    price: 3500,
    type: 'COFFEE',
    amount: 2,
    option_id: 1,
    createdAt: new Date('07 October 2011 15:50 UTC'),
    updatedAt: new Date('07 October 2011 15:50 UTC'),
  },
  {
    id: 2,
    name: '카페라떼',
    price: 4000,
    type: 'COFFEE',
    amount: 2,
    option_id: 1,
    createdAt: new Date('07 October 2011 15:50 UTC'),
    updatedAt: new Date('07 October 2011 15:50 UTC'),
  },
];

describe('Layered Architecture Pattern Items Service Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('getItems by Success', () => {
    const allItemsReturnValue = [
      {
        id: 2,
        name: '카페라떼',
        price: 4000,
        type: 'COFFEE',
        amount: 5,
        option_id: 1,
        createdAt: new Date('07 October 2011 15:50 UTC'),
        updatedAt: new Date('07 October 2011 15:50 UTC'),
      },
      {
        id: 1,
        name: '아메리카노',
        price: 3500,
        type: 'COFFEE',
        amount: 2,
        option_id: 1,
        createdAt: new Date('07 October 2011 15:50 UTC'),
        updatedAt: new Date('07 October 2011 15:50 UTC'),
      },
    ];

    mockItemsRepository.getItems = jest.fn(() => {
      return allItemsReturnValue;
    });
    itemsService.getItems();

    expect(mockItemsRepository.getItems).toHaveBeenCalledTimes(1);
  });

  test('getItemById by Success', () => {
    const itemReturnValue = {
      id: 1,
      name: '아메리카노',
      price: 3500,
      type: 'COFFEE',
      amount: 2,
      option_id: 1,
      createdAt: new Date('07 October 2011 15:50 UTC'),
      updatedAt: new Date('07 October 2011 15:50 UTC'),
    };
    const id = 1;
    mockItemsRepository.getItemById = jest.fn(() => {
      return itemReturnValue;
    });

    itemsService.getItemById(id);
    expect(mockItemsRepository.getItemById).toHaveBeenCalledTimes(1);
  });

  test('getItemById by Invalid Params Error', () => {
    const id = ''; // 잘못된 인자
    try {
      itemsService.getItemById(id);
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe('id는 숫자만 입력 가능합니다.');
      expect(e.statusCode).toBe(400);
      expect(mockItemsRepository.getItemById).toHaveBeenCalledTimes(0);
    }
  });

  test('getTypeItems by Success', () => {
    const type = 'COFFEE';
    mockItemsRepository.getTypeItems = jest.fn(() => {
      return itemReturnValue;
    });
    itemsService.getTypeItems(type);
    expect(mockItemsRepository.getTypeItems).toHaveBeenCalledTimes(1);
  });
});
