import jwt from 'jsonwebtoken';

const middleware = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ message: 'Token does not exist.' });
    }

    const decodedToken = jwt.verify(token, JWT_KEY);
    const customerId = decodedToken.id;

    // const customer = await Customer.findOne
    next();
  } catch (e) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default middleware;
