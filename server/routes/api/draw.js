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
router.get(
  '/getRandomTablesByRoomId/:roomId',
  DrawController.getRandomTablesByRoomId,
)
router.get('/getAllDays', DrawController.getAllDays)
router.post('/search', DrawController.searchData)
router.post('/getAllUsers', DrawController.getAllUsers)
router.post(
  '/getRandomTablesByDayIdAndRoomNumber',
  DrawController.getRandomTablesByDayIdAndRoomNumber,
)
/*======================================*/
router.post("/payment", DrawController.payment);
router.post("/create_event", DrawController.create_Event);
router.post("/create_sEvent", DrawController.create_sEvent);
router.post("/create_mEvent", DrawController.create_mEvent);

router.get("/get_tickets", DrawController.get_tickets);

module.exports = router
