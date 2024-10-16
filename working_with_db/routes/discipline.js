var express = require("express");
var db = require("./database.js");
var router = express.Router();
var isAuth = require('./isAuth');


router.get("/listDisciplines", isAuth.isAuthenticated, (req, res) => {
  db.all(
    `SELECT discipline.* FROM discipline`,
    (err, rows) => {
      if (err) {
        throw err;
      }
      res.render("discipline/listDisciplines", {
        disciplines: rows,
        title: "Список дисциплины"
      });
    });
});

router.get("/discipline/:id", (req, res) => {
  db.get(
    `SELECT discipline.* FROM discipline WHERE discipline.id=?`,
    [req.params.id], (err, rows) => {
      if (err) {
        throw err;
      }
      var discipline = rows;

      res.render("discipline/discipline", {
        discipline: discipline,
        title: "Дисциплина"
      });
    });
});

router.post("/updateDiscipline/:id", (req, res) => {
  db.run(
    `UPDATE discipline SET name=? WHERE id=?`,
    [req.body.name, req.params.id],
    (err) => {
      if (err) {
        throw err;
      }
      res.redirect('/listDisciplines');
    }
  );
});

router.route("/addDiscipline")
  .get((req, res) => {
    res.render("discipline/addDiscipline", {
      title: "Добавление дисциплины"
    });
  })
  .post((req, res) => {
    db.run(
      `INSERT INTO discipline(name) VALUES (?)`,
      [req.body.name],
      (err) => {
        if (err) {
          throw err;
        }
        res.redirect('/listDisciplines');
      }
    );
  });

router.post("/deleteDiscipline/:id", (req, res) => {
  db.run('DELETE FROM discipline WHERE id=?', [req.params.id],
    (err) => {
      if (err) {
        throw err;
      }
      res.redirect('/listDisciplines');
    }
  );
});

module.exports = router;