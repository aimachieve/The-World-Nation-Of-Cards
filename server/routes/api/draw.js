const express = require('express')
const router = express.Router()

const DrawController = require('../../controllers/DrawController')

// router.post("/register", DrawController.register);
// router.post("/login", DrawController.login);
// router.post("/verify-email", DrawController.verifyEmail);
router.get("/products", DrawController.getProducts);
router.get('/createMockData', DrawController.createMockData)
router.get('/getRandomTables', DrawController.getRandomTables)
router.get(
  '/getRandomTablesByUserId/:userId',
  DrawController.getRandomTablesByUserId,
)
router.post('/search', DrawController.searchData)
router.post('/getAllUsers', DrawController.getAllUsers)
router.post("/payment", DrawController.payment);

// admin
router.post("/create_event", DrawController.create_Event);
router.post("/create_sEvent", DrawController.create_sEvent);
router.post("/create_mEvent", DrawController.create_mEvent);
router.get("/getCurrentEvent", DrawController.getCurrentEvent);

module.exports = router
