import express from "express";
import Users from "../modles/Users.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await Users.find();

  res.send({ data: users });
});

router.post("/signup", async (req, res) => {
  try {
    await Users.create(req.body);

    res.send({ message: "Registered Successfully!" });
  } catch (e) {
    res.send({ message: e.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //Step 1: Check if email exists in db

  const user = await Users.findOne({ email });
  if (!user) {
    res.send({ message: "Email doesn't exist" });
    return;
  }

  //Step 2: Compare Password
  const isCorrectPass = user.comparePassword(password);
  if (!isCorrectPass) {
    res.send({ message: "Invalid Password" });
    return;
  }

  //Step 3: GENRATE TOKEN
  const token = user.generateToken();

  const copy = { ...user._doc };

  const userCopy = await Users.findByIdAndUpdate(user._id, {
    copy,
    token: token,
  });

  console.log(token);
  res.send({ message: "logged", token });
});

export default router;
