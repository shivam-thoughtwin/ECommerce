const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();



router.route("/products").get(getAllProducts);

router.route("/admin/products/add").post(isAuthenticatedUser, authorizeRoles("admin"),createProduct);

router.route("/admin/updateProduct/:id").put(isAuthenticatedUser, authorizeRoles("admin"),updateProduct);

router.route("/admin/deleteProduct/:id").delete(isAuthenticatedUser, authorizeRoles("admin"),deleteProduct);

router.route("/productDetails/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReview)

module.exports = router