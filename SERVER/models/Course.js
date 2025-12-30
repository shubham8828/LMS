import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    duration: String,
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", CourseSchema);

export default Course;
