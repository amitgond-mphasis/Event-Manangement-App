const { Router } = require("express");
const ccmParticipants = require("../controllers/participants");

const router = Router({ strict: true });

router.get("/participants", ccmParticipants.getAllParticipants);
router.post("/participants", ccmParticipants.addParticipants);
router.put("/participants/:id", ccmParticipants.updateParticipantById);
router.delete("/participants/:id", ccmParticipants.deleteParticipantById);



module.exports = router;
