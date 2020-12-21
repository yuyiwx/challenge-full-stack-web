const express = require(`express`);
const db = require("../db");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let results = await db.all();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    let results = await db.one(req.params.id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
router.post("/", async (req, res, next) => {
  try {
    let results = await db.insert(
      req.body.register,
      req.body.name,
      req.body.email,
      req.body.cpf
    );
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.patch("/", async (req, res, next) => {
  try {
    let results = await db.patch(
      req.body.name,
      req.body.email,
      req.body.cpf,
      req.body.id
    );
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    let results = await db.delete(req.body.id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
module.exports = router;
