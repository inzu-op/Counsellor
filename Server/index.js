const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { userModel, AdminModel } = require("./modules/collection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

// ✅ CORS Setup (with 'methods' and cross-origin cookie support)
app.use(cors({
  origin: "https://counsellor-lovat.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ MongoDB Connection
mongoose.connect("mongodb+srv://inzuff:inzu664422@cluster0.cicya.mongodb.net/CRUD?retryWrites=true&w=majority&appName=Cluster0");

// ✅ Middleware to verify JWT Token
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(404).json("no token available");
  }
  jwt.verify(token, "jwt-secret-key", (err, decoded) => {
    if (err) {
      return res.status(403).json("error with Token");
    } else {
      if (decoded.role === "admin") {
        next();
      } else {
        return res.status(401).json("not admin");
      }
    }
  });
};

// ✅ Routes
app.post("/", (req, res) => {
  res.send("hello");
});

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => {
      AdminModel.create({ name, email, password: hash })
        .then(() => res.json("success"))
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  AdminModel.findOne({ email })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            const token = jwt.sign({ email: user.email, role: user.role }, "jwt-secret-key", { expiresIn: "1d" });
            res.cookie("token", token, {
              httpOnly: true,
              secure: true,
              sameSite: "None"
            });
            res.json({ Status: "success", role: user.role });
          } else {
            res.status(401).json("incorrect password");
          }
        });
      } else {
        res.status(404).json("no user found");
      }
    })
    .catch(err => res.json(err));
});

app.post("/newuser", async (req, res) => {
  userModel.create(req.body)
    .then(students => res.json(students))
    .catch(err => res.json(err));
});

app.get("/dashboard", verifyUser, (req, res) => {
  userModel.find({})
    .then(students => res.json(students))
    .catch(err => res.json(err));
});

app.get("/getuser/:id", (req, res) => {
  const id = req.params.id;
  userModel.findById({ _id: id })
    .then(student => res.json(student))
    .catch(err => res.json(err));
});

app.put("/edited/:id", (req, res) => {
  const id = req.params.id;
  userModel.findByIdAndUpdate(
    { _id: id },
    { name: req.body.name, branch: req.body.branch, rollno: req.body.rollno }
  )
    .then(updated => res.json(updated))
    .catch(err => res.json(err));
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  userModel.findByIdAndDelete({ _id: id })
    .then(deleted => res.json(deleted))
    .catch(err => res.json(err));
});

app.post("/subjects/:id/:semester", async (req, res) => {
  const { id, semester } = req.params;
  const { subject, marks, grade, category } = req.body;

  const validSemesters = ["sem1", "sem2", "sem3", "sem4", "sem5", "sem6", "sem7", "sem8"];
  if (!validSemesters.includes(semester)) {
    return res.status(400).json({ message: "Invalid semester" });
  }

  if (!subject) {
    return res.status(400).json({ message: "Subject is required" });
  }

  if (category !== "sem" && (marks === undefined || marks === null)) {
    return res.status(400).json({ message: "Marks is required" });
  }

  if (category === "sem" && !grade) {
    return res.status(400).json({ message: "Grade is required for 'sem' category" });
  }

  if (marks !== undefined && marks !== null && isNaN(marks)) {
    return res.status(400).json({ message: "Marks must be a number" });
  }

  let updateField;
  switch (category) {
    case "cat1":
      updateField = `${semester}.cat1`;
      break;
    case "cat2":
      updateField = `${semester}.cat2`;
      break;
    case "model":
      updateField = `${semester}.model`;
      break;
    case "sem":
      updateField = `${semester}.sem`;
      break;
    default:
      return res.status(400).json({ message: "Invalid category" });
  }

  try {
    const result = await userModel.updateOne(
      { _id: id },
      { $push: { [updateField]: { subject, marks, Grade: grade } } }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.get("/data/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const collection = await userModel.findOne({ _id: id });

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    const validSemesters = ["sem1", "sem2", "sem3", "sem4", "sem5", "sem6", "sem7", "sem8"];
    validSemesters.forEach(semester => {
      if (!collection[semester]) {
        collection[semester] = { cat1: [], cat2: [], model: [], sem: [] };
      }
    });

    res.json([collection]);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// ✅ Port for deployment (e.g. Render expects process.env.PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
