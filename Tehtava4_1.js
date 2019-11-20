const express = require("express");
const router = express.Router();

const db = require("./db");

const validatePoi = (req, res, next) => {
    const poi = req.body;
    if (poi && poi.name && poi.description && poi.city &&
        poi.coordinates && poi.coordinates.lat && poi.coordinates.lng) {
            next();
        } else {
            res.status(400).send({error: "Puutteelliset tiedot"});
        }
}

router.get("/", (req, res) => {
    res.status(200).send(db.getPoi());
});

router.get("/:id", (req, res) => {
    const poi = db.getPoi(req.params.id);
    if (poi) {
        res.status(200).send(poi);
    } else {
        res.status(404).send();
    }
});

router.post("/", validatePoi, (req, res) => {
    const poi = req.body;
    const created = db.createPoi(poi);
    res.status(201).send(created);
});

router.put("/:id", validatePoi, (req, res) => {
    const poi = req.body;
    const { id } = req.params;

    if(!db.getPoi(id)) {
        const created = db.setPoi(id, poi);
        res.status(201).send(created);
    } else {
        const updated = db.setPoi(id, poi);
        res.status(200).send(updated);
    }
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    if (db.deletePoi(id)) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

module.exports = router;