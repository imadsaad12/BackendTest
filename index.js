const express = require("express");
const mongoose = require("mongoose");
const Student = require("./Models/Student");
const basicAuth = require("express-basic-auth");
const app = express();

const dbURL =
  "mongodb+srv://mydb:93928@cluster0.g0he0.mongodb.net/Test?retryWrites=true&w=majority";

//connecting to Database
//const dbURL ="mongodb+srv://mydb:93928@cluster0.g0he0.mongodb.net/Test?retryWrites=true&w=majority";
mongoose
  .connect(dbURL)
  .then(() =>
    app.listen(4000, () => console.log("server is running on port 4000"))
  )
  .catch((err) => console.log(err));

// middleware to permit the json data exchange
app.use(express.json());

// middleware to check auth
// username : admin ; password:supersecret
app.use(
  basicAuth({
    users: { admin: "supersecret" },
    unauthorizedResponse: UnauthorizedResponse,
  })
);

function UnauthorizedResponse(req) {
  return req.auth ? "Credentials rejected" : "Not authorized ";
}

// Add student

app.post("/student", async (req, res) => {
  console.log(req.body);
  if (!req.body) return;
  const student = new Student(req.body);
  student
    .save()
    .then(() => {
      res.send("student saved !");
    })
    .catch((err) => {
      console.log(err);
      res.send("error");
    });
});

// Get all students

app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

//Get specific student

app.get("/students/:id", async (req, res) => {
  const { id } = req.params;
  const _id = mongoose.Types.ObjectId(id);
  const student = await Student.findById({ _id });
  if (student) {
    res.send(student);
  } else {
    res.send("No Student with this id");
  }
});

// Update specific student

app.put("/students/:id", async (req, res) => {
  const { id } = req.params;
  const _id = mongoose.Types.ObjectId(id);
  const student = await Student.findByIdAndUpdate({ _id }, req.body);
  res.send("Updated !");
});
