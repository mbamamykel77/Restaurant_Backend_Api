const isSuperAdmin = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized - User not found" });
    }
    console.log("User Role:", user.role);


    if (user.role !== "admin" && user.role !== "superadmin") {
      return res
        .status(403)
        .json({ error: "Forbidden - Admin access required" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default isSuperAdmin;
