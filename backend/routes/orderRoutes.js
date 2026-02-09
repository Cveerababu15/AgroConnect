const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware.js");
const { isRestaurant } = require("../middleware/roleMiddleware.js");
const { isFarmer } = require("../middleware/roleMiddleware.js");
const { isDriver } = require("../middleware/roleMiddleware.js");
const {
  getFarmerOrders,
  acceptOrder,
  rejectOrder,
  getAvailableDeliveries,
  acceptDelivery,
  markDelivered,
  getAvailableProducts,
  placeOrder,
  getDriverOrders,
  getRestaurantOrders
} = require("../controllers/orderController.js");

router.get("/products", auth, isRestaurant, getAvailableProducts);
router.post("/", auth, isRestaurant, placeOrder);
router.get("/restaurant", auth, isRestaurant, getRestaurantOrders);

// Farmer Accept or Reject Orders
router.get("/farmer", auth, isFarmer, getFarmerOrders);
router.put("/:id/accept", auth, isFarmer, acceptOrder);
router.put("/:id/reject", auth, isFarmer, rejectOrder);

// Driver
router.get("/driver", auth, isDriver, getAvailableDeliveries);
router.get("/driver/my-deliveries", auth, isDriver, getDriverOrders);
router.put("/:id/pick", auth, isDriver, acceptDelivery);
router.put("/:id/deliver", auth, isDriver, markDelivered);

module.exports = router;
