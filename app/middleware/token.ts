const jwt = require('jsonwebtoken');
const verifyToken = (token: string, privateKey: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, privateKey, (error, decoded) => {
      if (error) {
        reject(error);
      }
      resolve(decoded);
    });
  });
};

module.exports = () => {
  return async function(ctx, next) {
    const authorization = ctx.headers.authorization;
    const token = authorization.split(' ')[1];

    try {
      const decoded = await verifyToken(token, 'privateKey');
      await next();
      ctx.body = {
        status: true,
        body: decoded,
        message: 'success',
      };
    } catch (error) {
      ctx.body = {
        status: false,
        message: error,
      };
    }
  };
};
