import prisma from "../../config/prisma";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    const recruiter = await prisma.recruiter.findUnique({ where: { email } });

    const account = user || recruiter;
    if (!account) return res.status(401).json({ error: "Invalid credentials" });

    const isPasswordValid = await Bun.password.verify(
      password,
      account.password
    );
    if (!isPasswordValid)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      {
        id: account.id,
        email: account.email,
        role: user ? "USER" : "RECRUITER",
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "10d" }
    );
    res.status(200).json({
      token,
      expiresAt: Date.now() +10 * 24 * 60 * 60 * 60 * 1000, // Expiration timestamp
      role: user ? "USER" : "RECRUITER",
      username: user ? user.name : recruiter.name,
      id: user ? user.id : recruiter.id,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
export default login;
