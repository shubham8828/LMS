import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  certificateUrl: String,
  issuedAt: { type: Date, default: Date.now }
});

const Certificate = mongoose.model("Certificate", CertificateSchema);

export default Certificate;
  