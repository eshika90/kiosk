import { ItemsController } from '../../../controller/items.controller.js';

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

  test('createItem test : Success', async () => {
    const createItemRequestBody = {
      name: '아메리카노',
      price: 3500,
      type: 'COFFEE',
    };

    mockRequest.body = createItemRequestBody;

    const createItemReturnValue = {
      insertId: undefined,
      name: createItemRequestBody.name,
      price: createItemRequestBody.price,
      type: createItemRequestBody.type,
      created_at: new Date().toString(),
      updated_at: new Date().toString(),
    };

    // service의 return 값을 입력한 변수에 할당
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
      Message: `${createItemReturnValue.id}번으로 메뉴가 생성되었습니다.`,
    });
  });

  test('createItem test : Fail', async () => {
    // 아이템 생성 시 name, price, type 하나라도 없으면 실패
    const createNothing = {};
    const createOne = {
      price: 3500,
    };
    const createItemErrorName = {
      price: 3500,
      type: 'COFFEE',
    };
    const createItemErrorPrice = {
      name: '아메리카노',
      type: 'COFFEE',
    };
    const createItemErrorType = {
      name: '아메리카노',
      price: '3500',
    };
    const errorBodies = [
      createNothing,
      createOne,
      createItemErrorName,
      createItemErrorPrice,
      createItemErrorType,
    ];
    for (const errorBody of errorBodies) {
      mockRequest.body = errorBody;

      mockResponse.status = jest.fn(() => mockResponse);

      await itemsController.createItem(mockRequest, mockResponse);
      // res.status는 1번 호출되고, 400번의 http status code가 호출
      expect(mockResponse.status).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      // response의 결과값이 json타입으로 오는지 확인
      expect(mockResponse.json).toHaveBeenCalledWith({
        errorMessage: expect.any(String),
      });
      expect(mockResponse.json).toHaveBeenCalledWith({
        errorMessage: 'name, price, type은 필수로 입력해야 합니다.',
      });
    }
  });

  // test('getItems test', async () => {
  //   const allItemsReturnValue = [
  //     {
  //       id: 2,
  //       nickname: 'Nickname_2',
  //       title: 'Title_2',
  //       createdAt: new Date('07 October 2011 15:50 UTC'),
  //       updatedAt: new Date('07 October 2011 15:50 UTC'),
  //     },
  //     {
  //       id: 1,
  //       nickname: 'Nickname_1',
  //       title: 'Title_1',
  //       createdAt: new Date('06 October 2011 15:50 UTC'),
  //       updatedAt: new Date('06 October 2011 15:50 UTC'),
  //     },
  //   ];
  // });
});
