
const adminOnly = (req, res, next) => {
  if (req.user?.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

export default adminOnly;
