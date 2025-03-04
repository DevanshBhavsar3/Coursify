const { Router } = require("express");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const { Admin, Course } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");
const adminMiddleware = require("../middleware/admin");

const router = Router();

router.post("/register", async (req, res) => {
  const requiredBody = z.object({
    username: z
      .string()
      .min(3)
      .max(100)
      .refine((username) => !RegExp("[^a-zA-Z0-9_]").test(username), {
        message: "Username must not contain any special characters.",
      }),
    password: z
      .string()
      .min(5)
      .max(30)
      .refine((password) => /[A-Z]+/.test(password), {
        message: "Password must contain 1 capital character.",
      })
      .refine((password) => /[a-z]+/.test(password), {
        message: "Password must contain 1 lowercase character.",
      })
      .refine((password) => /[0-9]+/.test(password), {
        message: "Password must contain 1 number.",
      })
      .refine((password) => /[!#$^"&@_/]+/.test(password), {
        message: "Password must contain 1 special character.",
      }),
  });

  const parsedBody = requiredBody.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({ error: parsedBody.error.issues[0].message });
  }

  try {
    const { username, password } = parsedBody.data;

    const hashedPassword = await bcrypt.hash(password, 7);

    const admin = await Admin.create({ username, password: hashedPassword });

    const token = jwt.sign(
      {
        userId: admin._id,
      },
      JWT_ADMIN_SECRET
    );

    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });

    res.status(201).json({
      message: "Admin created successfully",
      token,
    });
  } catch (e) {
    res.status(400).json({ error: "Username already exists." });
  }
});

router.post("/login", async (req, res) => {
  const username = req.headers.username;
  const password = req.headers.password;

  if (!username || !password) {
    return res.status(400).json({ error: "Invalid Credentials." });
  }

  if (req.cookies["token"]) {
    return res.status(400).json({ error: "Please logout first." });
  }

  const admin = await Admin.findOne({ username });

  if (admin) {
    const isRightPassword = await bcrypt.compare(password, admin.password);

    if (!isRightPassword) {
      return res.status(400).json({ error: "Invalid Password." });
    }

    const token = jwt.sign(
      {
        userId: admin._id,
      },
      JWT_ADMIN_SECRET
    );

    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });

    res.status(200).json({
      message: "Logged in successfully",
      token,
    });
  } else {
    res.status(400).json({ error: "Admin not found." });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const requestedBody = z.object({
    title: z.string().min(3).max(30),
    description: z.string().min(3).max(100),
    price: z.number().min(100).max(10000),
    imageLink: z.string().url(),
    published: z.boolean(),
  });

  const parsedBody = requestedBody.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({ error: "Invalid course data." });
  }

  const adminId = req.userId;
  const { title, description, price, imageLink, published } = parsedBody.data;

  const course = await Course.create({
    title,
    description,
    price,
    imageLink,
    published,
    creatorId: adminId,
  });

  res.status(201).json({
    message: "Course created successfully",
    courseId: course._id,
  });
});

router.put("/courses/:courseId", adminMiddleware, async (req, res) => {
  const requestedBody = z.object({
    title: z.string().min(3).max(30),
    description: z.string().min(3).max(100),
    price: z.number().min(100).max(10000),
    imageLink: z.string().url(),
    published: z.boolean(),
  });

  const parsedBody = requestedBody.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({ error: "Invalid course data." });
  }

  const { title, description, price, imageLink, published } = parsedBody.data;
  const courseId = req.params.courseId;

  try {
    const course = await Course.updateOne(
      { _id: courseId, creatorId: req.userId },
      {
        title,
        description,
        price,
        imageLink,
        published,
      }
    );

    if (course.matchedCount === 0) {
      return res.status(400).json({ error: "Invalid course id." });
    }

    res.status(200).json({
      message: "Course updated successfully",
    });
  } catch (e) {
    res.status(400).json({ error: "Course not found." });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const adminId = req.userId;

  const courses = await Course.find({ creatorId: adminId })
    .populate("creatorId", "username")
    .exec();

  res.status(200).json({ courses });
});

module.exports = router;
