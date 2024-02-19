const { Router } = require("express");
const ccmCompetition = require("../controllers/competitions");

const router = Router({ strict: true });

router.get("/competitions", ccmCompetition.getAllCompetitions);
router.get("/competitions/:id", ccmCompetition.getCompetitionById);
router.post("/competitions", ccmCompetition.addCompetition);
router.put("/competitions/:id", ccmCompetition.updateCompetitionById);
router.delete("/competitions/:id", ccmCompetition.deleteCompetitionById);



module.exports = router;
