const Product=require("../models/Product.js")
// Add a Product
exports.addproduct=async(req,res)=>{
    try {
        const {name,pricePerKg,quantityAvailable}=req.body;
        if(!name || !pricePerKg || !quantityAvailable){
            return res.status(400).json({message:"All Fields are Required"})
        }
        const product=await Product.create({
            farmerId:req.userId,
            name,
            pricePerKg,
            quantityAvailable
        })
        res.status(201).json({message:"Product Added Successfully",product})
    } catch (error) {
        res.status(500).json({message:"Failed to add Product"})
        
    }
}
// GET MY PRODUCTS (FARMER)
exports.getMyProducts = async (req, res) => {
    try {
      const products = await Product.find({ farmerId: req.userId });
      res.json({ products });
    } catch (error) {
      console.error("Error in getMyProducts:", error);
      res.status(500).json({ message: "Failed to fetch products", error: error.message });
    }
  };

  // UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
    try {
      const product = await Product.findOneAndUpdate(
        { _id: req.params.id, farmerId: req.userId },
        req.body,
        { new: true }
      );
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.json({
        message: "Product updated",
        product
      });
    } catch {
      res.status(500).json({ message: "Update failed" });
    }
  };

  exports.deleteProduct = async (req, res) => {
    try {
      const product = await Product.findOneAndDelete({
        _id: req.params.id,
        farmerId: req.userId
      });
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.json({ message: "Product deleted" });
    } catch {
      res.status(500).json({ message: "Delete failed" });
    }
  };