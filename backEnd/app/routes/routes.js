const express         = require('express');
const router          = express.Router();
const controller      = require("../controllers/controller");

router.get("/stars", controller.getStars);

router.get("/planets", controller.getPlanets);

router.get("/exoPlanets", controller.getExoPlanets);

router.get("/dwarfPlanet", controller.getDwarfPlanets);

router.get("/planetSatelites", controller.getPlanetSatelites);

module.exports = router;