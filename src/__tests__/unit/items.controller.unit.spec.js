import { ItemsController } from '../../controller/items.controller.js';

let mockItemsService = {
  createItem: jest.fn(),
};

let mockRequest = {
  body: jest.fn(),
};

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

let itemsController = new ItemsController();

itemsController._itemsService = mockItemsService;

describe('ItemsController Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  test('Items Controller createItem Method by Success', async () => {
    const createItemRequestBody = {
      name: '아메리카노',
      price: 3500,
      type: 'coffee',
    };

    mockRequest.body = createItemRequestBody;

    const createItemReturnValue = {
      id: 1,
      name: createItemRequestBody.name,
      price: createItemRequestBody.price,
      type: createItemRequestBody.type,
      created_at: new Date().toString(),
      updated_at: new Date().toString(),
    };

    mockItemsService.createItem = jest.fn(() => createItemReturnValue);

    // 실행됨
    await itemsController.createItem(mockRequest, mockResponse);
    // 여기서부터 결과 예상
    // ItemsController.createItem 성공 케이스
    // 1. req.body에 들어있는 값을 바탕으로 service.createItem이 호출됨
    // 2. res.status는 1번 호출되고, 201의 값으로 호출됨
    // 3. service.createItem에서 반환된 변수를 이용해 res.json Method가 호출

    // 1.
    expect(mockItemsService.createItem).toHaveBeenCalledTimes(1);
    expect(mockItemsService.createItem).toHaveBeenCalledWith(
      createItemRequestBody.name,
      createItemRequestBody.price,
      createItemRequestBody.type,
    );

    // 2.
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);

    // 3.
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: createItemReturnValue,
    });
  });
});
