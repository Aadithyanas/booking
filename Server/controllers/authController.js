import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js"

const generateToken = (id) => {
  return jwt.sign({ id }, "kochu", { expiresIn: '7d' });
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already used' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });

  res.status(201).json("user created suucess fully");
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ message: 'Invalid credentials' });

  res.json({ token: generateToken(user._id), user: { username: user.username } });
};
