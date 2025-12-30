import User from "../models/User.js";
import Course from "../models/Course.js";
import bcrypt from "bcryptjs";

export const dashboard = async (req, res) => {
  const interns = await User.countDocuments({ role: "intern" });
  const courses = await Course.countDocuments();

  res.json({ interns, courses });
};


export const addIntern = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check existing
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Intern already exists" });
    }

    // 🔢 Generate Intern ID
    const lastIntern = await User.findOne({ role: "intern" })
      .sort({ createdAt: -1 });

    let nextNumber = 1;
    if (lastIntern?.internId) {
      nextNumber = parseInt(lastIntern.internId.replace("SK", "")) + 1;
    }

    const internId = `SK${String(nextNumber).padStart(4, "0")}`;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const intern = new User({
      internId,
      name,
      email,
      password: hashedPassword,
      role: "intern"
    });

    await intern.save();

    res.status(201).json({
      message: "Intern added",
      intern: {
        internId,
        name,
        email,
        password
      } 
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getInterns= async (req, res) => {
  try {
    // fetch only interns, exclude password
    const interns = await User.find({ role: "intern" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: interns.length,
      interns
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteIntern = async (req, res) => {
  try {
    const { id } = req.params;

    // Check intern exists
    const intern = await User.findById(id);
    if (!intern) {
      return res.status(404).json({ message: "Intern not found" });
    }

    // Ensure only intern is deleted
    if (intern.role !== "intern") {
      return res.status(400).json({ message: "Not an intern account" });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "Intern deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// get internby id and returnt it 

export const getInternById = async (req, res) => {
  try {
    const { id } = req.params;

    const intern = await User.findById(id).select(
      "internId name email role"
    );

    if (!intern) {
      return res.status(404).json({ message: "Intern not found" });
    }

    if (intern.role !== "intern") {
      return res.status(400).json({ message: "Not an intern account" });
    }

    res.status(200).json(intern);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateIntern = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const intern = await User.findById(id);
    if (!intern) {
      return res.status(404).json({ message: "Intern not found" });
    }

    if (intern.role !== "intern") {
      return res.status(400).json({ message: "Not an intern account" });
    }

    intern.name = name || intern.name;
    intern.email = email || intern.email;

    await intern.save();

    res.status(200).json({
      message: "Intern updated successfully",
      intern: {
        _id: intern._id,
        internId: intern.internId,
        name: intern.name,
        email: intern.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};