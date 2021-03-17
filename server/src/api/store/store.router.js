const router = require("express").Router();
const { getData } = require("./store.controller");
router.post("/stores", getData);
module.exports = router;
