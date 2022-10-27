//dependendants
const router = require("express").Router();
const store = require("../db/save.js");

//api routes
//get
router.get("/notes", function (req, res) {
    store
      .getTheNotes()
      .then((notes) => res.json(notes))
      .catch((err) => res.status(500).json(err));
  });
//post
  router.post("/notes", (req, res) => {
    store
      .addTheNotes(req.body)
      .then((note) => res.json(note))
      .catch((err) => res.status(500).json(err));
  });
//delete
  router.delete("/notes/:id", function (req, res) {
    store
      .deleteNote(req.params.id)
      .then(() => res.json({ ok: true }))
      .catch((err) => res.status(500).json(err));
  });
module.exports = router;