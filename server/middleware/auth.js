import jwt from "jsonwebtoken";

// wants to likeapost
// click the like button=auth middleware (NEXT)=like controller...
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");

      req.userId = decodedData?.id;
      //   ? untuk optional changing
      next();
    } else {
      //untuk google login
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
      //sub digunakan untuk specific id yang digunakan pada single user google
    }
  } catch (error) {}
};

export default auth;
