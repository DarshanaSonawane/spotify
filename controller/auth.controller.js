const userModel = require('../model/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function registerUser(req, res) {
  try {
    const { username, email, password, role } = req.body; // ✅ take role

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const userexist = await userModel.findOne({
      $or: [{ username }, { email }]
    });

    if (userexist) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hash,
      role: role || "user"   // ✅ correct logic
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      message: "User registered successfully",
      token
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 🔥 ADD THIS PART
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax"
    });

    return res.status(200).json({
      message: "Login successful"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

module.exports = {
     registerUser,
     loginUser 
    
    };