const mongoose=require("mongoose")
const mongooseURI="mongodb+srv://mubeenshahid232:bElbmCHtQ1PfTPxE@cluster0.lm5xgbe.mongodb.net/chatApp?retryWrites=true&w=majority&appName=Cluster0"
// mongodb+srv://mubeenshahid232:<password>@cluster0.lm5xgbe.mongodb.net/
const connectToMongoose = () => {
    mongoose
      .connect(mongooseURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("connection successfull to DB");
      })
      .catch((error) => {
        console.log("error in connection ", error);
      });
  };
// export default connectToMongoose


module.exports = connectToMongoose;
