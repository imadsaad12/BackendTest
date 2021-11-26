const mongoose = require("mongoose");
const studentSchema = mongoose.Schema(
  {
    information: {
      firstname: {
        type: String,
      },
      lastname: {
        type: String,
      },
      age: {
        type: Number,
      },
      major: {
        type: String,
      },
      skills: [
        {
          skill: {
            type: String,
          },
        },
      ],
    },
    address: {
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      postcode: {
        type: Number,
      },
      additionalInfo: {
        type: String,
      },
    },
    education: {
      diplomas: [
        {
         diploma:{
            type: String,
        }
        },
      ],
      yearOfGraduation: {
        type: Number,
      },
      school: {
        type: String,
      },
      country: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Students", studentSchema);
module.exports = Student;


