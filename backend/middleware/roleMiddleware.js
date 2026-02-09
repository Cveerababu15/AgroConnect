exports.isFarmer = (req, res, next) => {
    if (!req.role || req.role !== "farmer") {
        return res.status(403).json({ message: "Access Denied. Farmers Only." });
    }
    next();
};

exports.isRestaurant = (req, res, next) => {
    if(req.role !== "restaurant"){
        return res.status(403).json({message:"Access Denied. Restaurants Only."})
    }
    next();
}


exports.isDriver = (req, res, next) => {
    if (req.role !== "driver") {
      return res.status(403).json({
        message: "Access denied. Driver only."
      });
    }
    next();
  };
  