const express = require("express");
const user_controller = require("../controllers/user_controller");

const router = express.Router();

router.get("/users", user_controller.getuser);
router.get("/user/:id", user_controller.getuserbyid);
router.post("/user", user_controller.createuser);
router.put("/user/:id", user_controller.updateuser);
router.delete("/user/:id", user_controller.deleteuser);

module.exports = router;
