const { Router } = require("express");
const ccmRatings = require("../controllers/ratings");

const router = Router({ strict: true });

router.get("/ratings", ccmRatings.getAllRatings);
// router.post("/ratings", ccmRatings.addRatings);
router.put("/ratings/:id", ccmRatings.updateRatingsById);
router.get("/results", ccmRatings.getResult);




module.exports = router;
