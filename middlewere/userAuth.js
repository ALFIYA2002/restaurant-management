
const jwt = require('jsonwebtoken');



const userAuthentication = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
 
    if (!authHeader) {
      return res.json({
        message: "No token found"
      });
    }
    
    const secretKey = process.env.SECRET_JWT;
    const decoded = jwt.verify(authHeader, secretKey);
    if (!decoded.userType) {
      return res.status(401).json({ message: "User type not found in token" });
    }


    req.userId = decoded._id;
    req.userType = decoded.userType
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token expired" });
    }

    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {

  userAuthentication
};