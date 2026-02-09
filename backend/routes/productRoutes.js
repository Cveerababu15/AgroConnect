const express=require("express")
const router=express.Router()

const auth=require("../middleware/authMiddleware.js")
const {isFarmer}=require("../middleware/roleMiddleware.js")

const {addproduct,getMyProducts,updateProduct,deleteProduct}=require("../controllers/productController.js")


router.post("/add",auth,isFarmer,addproduct)
router.get("/my",auth,isFarmer,getMyProducts)
router.put("/:id",auth,isFarmer,updateProduct)
router.delete("/:id",auth,isFarmer,deleteProduct)

module.exports=router;