import express from 'express';
import itemsRouter from './items.js';
import PlaceOrderItemsRoute from './place.order.items.route.js';

const router = express.Router();

router.use('/items', itemsRouter);
router.use('/placeorderitems', PlaceOrderItemsRoute);

export default router;

// import express from 'express';
// import userRouter from './user';

// const router = express.Router();

// router.use('/user', userRouter);

// module.exports = router;
