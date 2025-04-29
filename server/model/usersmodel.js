const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const userschema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "user",
  },
});

const model = mongoose.model("user", userschema);

/// register :
exports.registermodel = async (name, email, password) => {
  try {
    const user = await model.findOne({ email: email });
    if (user) {
      throw new Error("User already exist !!!");
    } else {
      const hashedpassword = await bcrypt.hash(password, 10);
      const newuser = model.insertMany({
        name: name,
        email: email,
        password: hashedpassword,
      });
      return newuser;
    }
  } catch (err) {
    throw new Error(err);
  }
};

/// login :

const privatekey = "this my secret key hahahahahahahahahahahaha";

exports.loginmodel = async (email, password) => {
  try {
    const user = await model.findOne({ email: email });
    if (user) {
      const verif = await bcrypt.compare(password, user.password);
      if (verif) {
        const token = await jsonwebtoken.sign(
          { id: user._id, email: user.email, role: user.role },
          privatekey,
          { expiresIn: "1d" }
        );
        return {token:token,user:user};
      } else {
        throw new Error("wrong password !!!");
      }
    } else {
      throw new Error("indifined User !!!");
    }
  } catch (err) {
    throw new Error(err);
  }
};
