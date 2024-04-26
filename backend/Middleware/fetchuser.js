const jwt = require("jsonwebtoken");
const MYSECRETKEY = "IAMMUBEENIAMA$OODBOY";

const fetchuser = (request, response, next) => {
  // when we use jwt verify it decode data .Try to remember those user object that conatin user id that you add in auth token when user login
  const token = request.header("auth-token");
  if (!token) {
    return response
      .status(401)
      .json({ error: "token is missing in headers" });
  }
  const decodedata = jwt.verify(token, MYSECRETKEY);

  // const data={
  //     user:{
  //       id:user.id
  //     }
  //   }this user object that contain id in request.user
  // Assigning decodedata.user to request.user is a common practice to make this user information easily
  // accessible throughout the handling of that specific HTTP request.
  request.user = decodedata.user;

  console.log("hello from middleware");
  next();
};
module.exports = fetchuser;
