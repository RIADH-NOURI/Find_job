import prisma from "../../config/prisma";
import { recruiterSchema } from "../../validators/recruiterValidator";
import { userSchema } from "../../validators/userValidator";

const register = async (req, res) => {
  try {
    const { role } = req.body;

    let validationResult;
    if (role === "RECRUITER") {
      validationResult = recruiterSchema.validate(req.body);
    } else {
      validationResult = userSchema.validate(req.body);
    }

    const { error, value } = validationResult;

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { password } = req.body;

    // Hash the password
    const hashedPassword = await Bun.password.hash(password);

    if (role === "RECRUITER") {
      const recruiter = await prisma.recruiter.create({
        data: {
          ...value,
          password: hashedPassword,
        },
      });
      res.status(201).json(recruiter);
      return;
    }

    const user = await prisma.user.create({
      data: {
        ...value,
        password: hashedPassword,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export default register