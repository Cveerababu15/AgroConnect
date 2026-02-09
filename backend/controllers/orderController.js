const Order=require("../models/Order.js")
const Product=require("../models/Product.js")

// View All Avaiable Products (RESTAURANT)
exports.getAvailableProducts=async(req,res)=>{
    try {
        const products=await Product.find({isAvailable:true,quantityAvailable:{$gt:0}}).populate("farmerId","name")
        res.json({products})
    } catch (error) {
        res.status(500).json({message:"Failed to fetch products"})
        
    }
}
// PLACE ORDER (RESTAURANT)
exports.placeOrder = async (req, res) => {
  try {
    const { productId, quantityKg } = req.body;

    if (!productId || !quantityKg) {
      return res.status(400).json({ message: "All fields required" });
    }

    const product = await Product.findById(productId);
    if (!product || !product.isAvailable) {
      return res.status(404).json({ message: "Product not available" });
    }

    if (quantityKg > product.quantityAvailable) {
      return res.status(400).json({ message: "Insufficient quantity" });
    }

    const order = await Order.create({
      restaurantId: req.userId,
      farmerId: product.farmerId,
      productId,
      quantityKg
    });

    res.status(201).json({
      message: "Order placed successfully",
      order
    });
  } catch {
    res.status(500).json({ message: "Order failed" });
  }
};


// FARMER: VIEW MY ORDERS
exports.getFarmerOrders = async (req, res) => {
    try {
      const orders = await Order.find({ farmerId: req.userId })
        .populate("productId", "name")
        .populate("restaurantId", "name email")
        .sort({ createdAt: -1 });
  
      res.json({ orders });
    } catch {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  };
  
  // FARMER: ACCEPT ORDER
  exports.acceptOrder = async (req, res) => {
    try {
      const order = await Order.findOne({
        _id: req.params.id,
        farmerId: req.userId,
        status: "Pending"
      });

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      const product = await Product.findById(order.productId);

      if (order.quantityKg > product.quantityAvailable) {
        return res.status(400).json({ message: "Not enough stock" });
      }

      // reduce stock
      product.quantityAvailable -= order.quantityKg;
      await product.save();

      order.status = "Accepted";
      await order.save();

      res.json({ message: "Order accepted", order });
    } catch {
      res.status(500).json({ message: "Failed to accept order" });
    }
  };
  
  // FARMER: REJECT ORDER
  exports.rejectOrder = async (req, res) => {
    try {
      const order = await Order.findOne({
        _id: req.params.id,
        farmerId: req.userId,
        status: "Pending"
      });

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      order.status = "Rejected";
      await order.save();
  
      res.json({ message: "Order rejected", order });
    } catch {
      res.status(500).json({ message: "Failed to reject order" });
    }
  };


// Driver View Available Deliveries
  exports.getAvailableDeliveries = async (req, res) => {
    try {
      const orders = await Order.find({
        status: "Accepted",
        driverId: null
      })
        .populate("productId", "name")
        .populate("farmerId", "name")
        .populate("restaurantId", "name");
  
      res.json({ orders });
    } catch {
      res.status(500).json({ message: "Failed to fetch deliveries" });
    }
  };

  exports.acceptDelivery = async (req, res) => {
    try {
      const order = await Order.findOne({
        _id: req.params.id,
        status: "Accepted",
        driverId: null
      });
  
      if (!order) {
        return res.status(404).json({ message: "Order not available" });
      }
  
      order.driverId = req.userId;
      order.status = "Picked";
      await order.save();

      res.json({ message: "Delivery accepted", order });
    } catch {
      res.status(500).json({ message: "Failed to accept delivery" });
    }
  };
  
  // DRIVER: MARK DELIVERED
  exports.markDelivered = async (req, res) => {
    try {
      const order = await Order.findOne({
        _id: req.params.id,
        driverId: req.userId,
        status: "Picked"
      });
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      order.status = "Delivered";
      await order.save();
  
      res.json({ message: "Order delivered successfully", order });
    } catch {
      res.status(500).json({ message: "Failed to complete delivery" });
    }
  };

  // DRIVER: VIEW MY DELIVERIES
  exports.getDriverOrders = async (req, res) => {
    try {
      const orders = await Order.find({ driverId: req.userId })
        .populate("productId", "name")
        .populate("farmerId", "name")
        .populate("restaurantId", "name");
  
      res.json({ orders });
    } catch {
      res.status(500).json({ message: "Failed to fetch driver orders" });
    }
  };
  
  // RESTAURANT: VIEW MY ORDERS
  exports.getRestaurantOrders = async (req, res) => {
    try {
      const orders = await Order.find({ restaurantId: req.userId })
        .populate("productId", "name")
        .populate("farmerId", "name")
        .sort({ createdAt: -1 });
  
      res.json({ orders });
    } catch {
      res.status(500).json({ message: "Failed to fetch restaurant orders" });
    }
  };