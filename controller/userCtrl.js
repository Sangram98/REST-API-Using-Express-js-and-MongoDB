
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
  register: async (req, res) => {
    try {
      let { name, email, password, mobile } = req.body;
      const mob = await User.findOne({ mobile });
      if (mob) return res.status(400).json({ msg: "mobile number exists" });
      const nEmail = await User.findOne({ email });
      if (nEmail) return res.status(400).json({ msg: "email exists" });
      if (password.length < 6)
        return res.status(400).json({ msg: "password must be 6 charecters" });
      const passwordHash = await bcrypt.hash(password, 10);
       
      const newUser = User({name,email,password: passwordHash,mobile,});
      // res.json({"register":newUser})
      await newUser.save();
      res.status(200).json({ msg: "user register succesfully " });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  },

  login: async (req, res) => {
    try {
      let { email, password } = req.body;
      //   res.json({"login":req.body});
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "emal is doesnot exists" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "password doesnot exists" });
      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "./auth/refresh_token",   //router path
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  },

  logout: async (req, res) => {
    try {
      // res.json("logout works");
      res.clearCookie('refreshtoken',{path:`/auth/refresh_token`});
      return res.status(200).json({msg:"logout successfully  "})
    } catch (err) {
      return res.status(500).json(err.message);
    }
  },

  getUser: async (req, res) => {
    try {
      // res.json({"output":req.user});
      const user=await User.findById(req.user.id).select('-password');
         if(!user)
         return res.status(400).json({msg:"user data not exist"})
      res.json({"data":user})
    // res.json("get user works");
    } catch (err) {
      return res.status(500).json(err.message);
    }
  },



  
  

  refreshToken: async (req, res) => {
    try {
      // res.json("refresh Token  works");
      const ref_token = req.cookies.refreshtoken;
      if (!ref_token) return res.status(400).json({ msg: "Need to login" });
      jwt.verify( ref_token, process.env.REFRESH_TOKEN_SECRET ||  require("../config.json").config.refresh_token,(err, user) => {
          if (err) return res.status(400).json({ msg: "session expiresd ...need to login " });
       
          const accessToken = createAccessToken({ id: user.id });
          res.json({ accessToken });
        }
      );
    } catch (err) {
      return res.status(500).json(err.message);
    }
  },
};



const createAccessToken = (user) => {
  return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET ||require("../config.json").config.access_token,{ expiresIn: "1d" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET ||require("../config.json").config.refresh_token,{ expiresIn: "1d" });
};

module.exports = userCtrl;
