const express = require("express")
const mongoose  =require("mongoose")
const cors=require("cors")
const userModel = require("./modules/collection")
const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/CRUD")

app.post("/newuser",(req,res)=>{
    userModel.create(req.body)
    .then(Collections => res.json(Collections))
    .catch(err => res.json(err))
})
app.get("/dashboard",(req,res)=>{
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
