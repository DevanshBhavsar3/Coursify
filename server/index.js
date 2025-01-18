const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const adminRoute = require("./routes/admin");
const usersRoute = require("./routes/users");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(
  cookieParser({
    sameSite: "none",
    secure: true,
  })
);
app.use(
  cors({
    credentials: true,
    origin: [
      "https://coursify-sage.vercel.app",
      "https://coursify-git-main-devanshs-projects-42de0e47.vercel.app",
      "https://coursify-juvhiqgjv-devanshs-projects-42de0e47.vercel.app",
    ],
  })
);

async function main() {
  // Connect to MongoDB
  await mongoose.connect(process.env.MONGO_URL);
  // Admin routes
  app.use("/admin", adminRoute);

  // User routes
  app.use("/users", usersRoute);

  app.get("/logout", (req, res) => {
    if (req.cookies["token"]) {
      res.clearCookie("token");
      return res.json({ message: "Logged out." });
    }
    return res.json({ error: "Not logged in." });
  });

  app.listen(port, () => {
    console.log("Server is listening on port 3000");
  });
}

main();
