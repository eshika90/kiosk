import express from 'express';
import itemsRouter from './items.js';
import PlaceOrderItemsRoute from './place.order.items.route.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { options } from '../modules/swagger.js';

const router = express.Router();
const specs = swaggerJsdoc(options);

router.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true }),
);
router.use('/items', itemsRouter);
router.use('/placeorderitems', PlaceOrderItemsRoute);

export default router;

// import express from 'express';
// import userRouter from './user';

// const router = express.Router();

// router.use('/user', userRouter);

// module.exports = router;
