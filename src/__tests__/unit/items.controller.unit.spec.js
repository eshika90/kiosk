import { ItemsController } from '../../controller/items.controller.js';

let mockItemsService = {
  createItem: jest.fn(),
  getItems: jest.fn(),
  getItemById: jest.fn(),
  getTypeItems: jest.fn(),
  updateItem: jest.fn(),
  deleteItem: jest.fn(),
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
      // service의 createItem은 호출되지 않음.
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

  test('getItems test', async () => {
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
        id: 2,
        name: '아메리카노',
        price: 3500,
        type: 'COFFEE',
        amount: 2,
        option_id: 1,
        createdAt: new Date('07 October 2011 15:50 UTC'),
        updatedAt: new Date('07 October 2011 15:50 UTC'),
      },
    ];
    // service 계층에서 getItems Method를 실행했을 때 반환 값을
    // 위의 변수로 설정
    mockItemsService.getItems = jest.fn(() => allItemsReturnValue);

    // controller계층에서 getItems를 실행
    await itemsController.getItems(mockRequest, mockResponse);

    // 해당 메소드의 로직
    // 1. itemsService의 getItems는 1회 호출
    // 2. res.status는 1회 호출, 200의 값을 반환
    // 3. service에서 반환된 값을 res.json Method를 이용해 { data: items} 의 형식으로 반환
    expect(mockItemsService.getItems).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: allItemsReturnValue,
    });
  });

  test('getItemById by success', async () => {
    const itemId = 1;
    const itemReturnValue = {
      id: itemId,
      name: '아메리카노',
      price: 3500,
      type: 'COFFEE',
      amount: 2,
      option_id: 1,
      createdAt: new Date('07 October 2011 15:50 UTC'),
      updatedAt: new Date('07 October 2011 15:50 UTC'),
    };

    mockRequest.body = { id: itemId };
    mockItemsService.getItemById = jest.fn(() => itemReturnValue);
    await itemsController.getItemById(mockRequest, mockResponse);

    // 해당 메소드의 로직
    // 1. req로 item의 id를 받음
    // 2. service의 getItemById는 1회만 호출
    // 3. res.status는 1회만 호출
    // 4. res.status는 200번 리턴
    // 5. res.status는 성공 시 json타입으로 Message; id번으로 리턴
    expect(mockItemsService.getItemById).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: itemReturnValue,
    });
  });

  test('getItemById by Invalid Params Error', async () => {
    mockRequest.body = {};
    await itemsController.getItemById(mockRequest, mockResponse);

    // 해당 메소드의 로직
    // 1. req로 item의 빈 객체를 받음
    // 2. service의 getItemById는 호출되지 않음
    // 3. res.status는 400번 리턴
    // 4. res.status는 json타입으로 errorMessage ... 으로 리턴
    expect(mockItemsService.getItemById).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      errorMessage: 'id는 필수로 입력해야 합니다.',
    });
  });

  test('getItemByType by success', async () => {
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
        amount: 3,
        option_id: 1,
        createdAt: new Date('07 October 2011 15:50 UTC'),
        updatedAt: new Date('07 October 2011 15:50 UTC'),
      },
    ];

    mockRequest.body = { type: 'COFFEE' };
    mockItemsService.getTypeItems = jest.fn(() => itemReturnValue);
    await itemsController.getTypeItems(mockRequest, mockResponse);
    expect(mockItemsService.getTypeItems).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: itemReturnValue,
    });
  });

  test('getItemByType by Invalid Params Error', async () => {
    mockRequest.body = {};
    await itemsController.getTypeItems(mockRequest, mockResponse);

    expect(mockItemsService.getTypeItems).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      errorMessage: 'type은 필수로 입력해야 합니다.',
    });
  });

  test('updateItem by Success', async () => {
    const updateItemRequestBody = {
      name: '아메리카노',
      price: 3500,
      type: 'COFFEE',
    };

    mockRequest.body = updateItemRequestBody;
    await itemsController.updateItem(mockRequest, mockResponse);

    expect(mockItemsService.updateItem).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: '수정이 완료되었습니다.',
    });
  });

  test('updateItem by Invalid Params Error', async () => {
    const updateNothing = {};
    const updateOne = {
      price: 3500,
    };
    const updateItemErrorName = {
      price: 3500,
      type: 'COFFEE',
    };
    const updateItemErrorPrice = {
      name: '아메리카노',
      type: 'COFFEE',
    };
    const updateItemErrorType = {
      name: '아메리카노',
      price: '3500',
    };

    const errorBodies = [
      updateNothing,
      updateOne,
      updateItemErrorName,
      updateItemErrorPrice,
      updateItemErrorType,
    ];

    for (const errorBody of errorBodies) {
      mockRequest.body = errorBody;
      mockResponse.status = jest.fn(() => mockResponse);
      await itemsController.updateItem(mockRequest, mockResponse);
      expect(mockItemsService.updateItem).toHaveBeenCalledTimes(0);
      expect(mockResponse.status).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        errorMessage: 'name, price, type은 필수로 입력해야 합니다.',
      });
    }
  });

  test('deleteItem by Success', async () => {
    mockRequest.body = { name: '아메리카노' };
    await itemsController.deleteItem(mockRequest, mockResponse);

    expect(mockItemsService.deleteItem).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: '삭제가 완료되었습니다.',
    });
  });

  test('deleteItem by Invalid Params Error', async () => {
    mockRequest.body = {};
    await itemsController.deleteItem(mockRequest, mockResponse);

    expect(mockItemsService.deleteItem).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      errorMessage: 'name은 필수로 입력해야 합니다.',
    });
  });
});
