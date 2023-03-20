const router = require("express").Router();
const { verifySeller, verifyUser } = require("../middlewares/verifyToken");
const registerSeller = require("../controllers/sellers/registerSeller");
const loginSeller = require("../controllers/sellers/loginSeller");
const registerUser = require("../controllers/users/registerUser");
const loginUser = require("../controllers/users/loginUser");
const {
    getProductsBySeller,
    getAllProducts,
    addNewProduct,
} = require("../controllers/products");
const {
    getSellerOrders,
    getUserOrders,
    createOrder,
} = require("../controllers/orders");

// =====================
/* Public Routes */
// =====================

// @route     POST /api/seller/register
// @desc      Register New Seller
// @access    Public
router.post("/seller/register", registerSeller);

// @route     POST /api/seller/login
// @desc      Seller Login
// @access    Public
router.post("/seller/login", loginSeller);

// @route     POST /api/user/register
// @desc      Register New Customers
// @access    Public
router.post("/user/register", registerUser);

// @route     POST /api/user/login
// @desc      Customer Login
// @access    Public
router.post("/user/login", loginUser);

// @route     GET /api/products/all
// @desc      Get all products
// @access    Public
router.get("/products/all", getAllProducts);

// =====================
/* Proctected Routes */
// =====================

// @route     GET /api/seller/products
// @desc      Get Products from a Seller with id
// @access    Private
router.get("/seller/products", verifySeller, getProductsBySeller);

// @route     POST /api/products/create
// @desc      Create New Products
// @access    Private
router.post("/products/create", verifySeller, addNewProduct);

// @route     GET /api/seller/orders
// @desc      Get all orders received by a seller
// @access    Private
router.get("/seller/orders", verifySeller, getSellerOrders);

// @route     GET /api/user/orders
// @desc      Get orders made by a user
// @access    Private
router.get("/user/orders", verifyUser, getUserOrders);

// @route     POST /api/orders/new
// @desc      Create New Order
// @access    Private
router.post("/orders/new", verifyUser, createOrder);

module.exports = router;
