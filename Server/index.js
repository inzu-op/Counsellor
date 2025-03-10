const express = require("express")
const mongoose  =require("mongoose")
const cors=require("cors")
const { userModel, AdminModel } = require("./modules/collection");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const app = express()
app.use(cors({
  origin : "http://localhost:5173",
  credentials : true,
  method :["GET","POST"]
}))
app.use(express.json())
app.use(cookieParser())

mongoose.connect("mongodb://127.0.0.1:27017/CRUD")

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token available" });
  }
  jwt.verify(token, "secret-key22", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Error with token", error: err.message });
    }
    next();
  });
};

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => {
      AdminModel.create({ name, email, password: hash })
        .then(users => res.json(users))
        .catch(err => res.json(err))
    })
    .catch(err => res.json(err))
})

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  try {
    AdminModel.findOne({ email: email })
      .then(user => {
        if (user) {
          bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
              const token = jwt.sign({ email: user.email }, "secret-key22", { expiresIn: "1d" })
              res.cookie("token", token)
              res.json({message:"success"})
            }else {
              res.status(401).json({message :"incorrect password"})
            }
          })
        } else {
          res.json({message:"no user found"})
        }
      })
      .catch(err => res.json(err))
  } catch (err) {
    res.json(err)
  }
})
app.post("/newuser",(req,res)=>{
    userModel.create(req.body)
    .then(Collections => res.json(Collections))
    .catch(err => res.json(err))
})
app.get("/dashboard",verifyUser,(req,res)=>{
    userModel.find({})
    .then(Collections => res.json(Collections))
    .catch(err => res.json(err))
})
app.get("/getuser/:id",(req,res)=>{
    const id =req.params.id
    userModel.findById({_id:id})
    .then(Collections => res.json(Collections))
    .catch(err => res.json(err))
})
app.put("/edited/:id",(req,res)=>{
    const id =req.params.id
    userModel.findByIdAndUpdate({_id: id},{name:req.body.name,email:req.body.email,branch:req.body.branch})
    .then(Collections => res.json(Collections))
    .catch(err => res.json(err))
})
app.delete("/delete/:id",(req,res)=>{
    const id =req.params.id
    userModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})
app.post("/subjects/:id/:semester", async (req, res) => {
    const { id, semester } = req.params;
    const { subject, marks, Grade, category } = req.body;
  
    console.log("Received request to /subjects/:id/:semester");
    console.log("Params:", { id, semester });
    console.log("Body:", { subject, marks, Grade, category });
  
    // Validate semester
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
  
    if (category === "sem" && !Grade) {
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
        { $push: { [updateField]: { subject, marks, Grade } } }
      );
      console.log("Update result:", result);
      res.json(result);
    } catch (err) {
      console.error("Database error:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });
  
app.get("/data/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const collection = await userModel.findOne({ _id: id });

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }
    const validSemesters = ["sem1","sem2","sem3", "sem4", "sem5", "sem6", "sem7", "sem8"];
    validSemesters.forEach(semester => {
      if (!collection[semester]) {
        collection[semester] = { cat1: [], cat2: [], model: [], sem: [] };
      }
    });

    await collection.save();

    res.json([collection]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.listen(3000,()=>{
    console.log("server is running")
})
