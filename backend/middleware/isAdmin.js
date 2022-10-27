const jwt = require('jsonwebtoken');

module.exports.isAdmin = (req, res, next) => {
  // try {
  //   if(req.headers.authorization) {
  //     const token = req.headers.authorization.split(' ')[1];
  //     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  //     if(decodedToken.user.isAdmin) {
  //       return next();
  //     }
  //   }

  //   return res.status(400).json({
  //     message: 'You are not allowed to do this'
  //   });
  // } catch (error) {
  //   return res.status(500).json({
  //     message: 'Something went wrong'
  //   });
  // }
  if(req.user.isAdmin) {
    return next();
  }
  return res.status(400).json({
    message: 'You are not allowed to do this'
  });
}
