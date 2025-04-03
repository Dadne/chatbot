const mongoose = require("mongoose");
const DB =process.env.DB

const dbConnect = () => {

  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connect DB"))
    .catch(() => console.log("Error Conect DB"));
};

module.exports = {dbConnect};
