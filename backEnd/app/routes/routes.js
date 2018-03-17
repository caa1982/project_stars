const express         = require('express');
const router          = express.Router();
const controller      = require("../controllers/controller");

router.post("/stars", controller.getStars);

router.post("/planets", controller.getPlanets);

router.post("/exoPlanets", controller.getExoPlanets);

router.post("/dwarfPlanet", controller.getDwarfPlanets);

router.post("/planetSatelites", controller.getPlanetSatelites);

router.post("/search", controller.getSearch);

router.get("/EthUsd", controller.getEthUsd);

module.exports = router;