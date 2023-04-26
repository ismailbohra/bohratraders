const { jwtDecode } = require('./authorization');

const verifyToken = async (req, resp, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return resp.status(401).json({
        message: 'Unauthorized',
      });
    }
    const { id } = jwtDecode(token.replace('Bearer ', ''));
    if (!id) {
      return resp.status(401).json({
        message: 'Unauthorized',
      });
    }
    next();
  } catch (error) {
    return resp.status(401).json({
      message: 'Unauthorized',
    });
  }
};
module.exports = { verifyToken };
