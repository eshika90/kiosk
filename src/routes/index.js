import express from 'express';
import itemsRouter from './items.js';

const router = express.Router();

router.use('/items', itemsRouter);

export default router;

// import express from 'express';
// import userRouter from './user';

// const router = express.Router();

// router.use('/user', userRouter);

// module.exports = router;
