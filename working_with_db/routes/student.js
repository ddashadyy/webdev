var express = require("express");
var db = require("./database.js");
var router = express.Router();
var isAuth = require('./isAuth');



router.get("/listStudents", isAuth.isAuthenticated, (req, res) => {
  db.all(
    `SELECT student.*, student_group.name as student_group_name FROM student
      INNER JOIN student_group ON student_group.id=student.student_group_id`,
    (err, rows) => {
      if (err) {
        throw err;
      }
      res.render("student/listStudents", {
        students: rows,
        title: "Список студентов"
      });
    });
});

router.get("/student/:id", (req, res) => {
  db.get(
    `SELECT student.*, student_group.name as student_group_name FROM student
      INNER JOIN student_group ON student_group.id=student.student_group_id 
      WHERE student.id=?`,
    [req.params.id], (err, rows) => {
      if (err) {
        throw err;
      }
      var student = rows;
      // получаем все группы для вывода в выпадающий список
      db.all(`SELECT * FROM student_group`, (err, rows) => {
        if (err) {
          throw err;
        }
        res.render("student/student", {
          student: student,
          studentGroups: rows,
          title: "Студент"
        });
      });
    });
});

router.post("/updateStudent/:id", (req, res) => {
  db.run(
    `UPDATE student SET name=?, student_group_id=? WHERE id=?`,
    [req.body.name, req.body.student_group_id, req.params.id],
    (err) => {
      if (err) {
        throw err;
      }
      res.redirect('/listStudents');
    }
  );
});

router.route("/addStudent")
  .get((req, res) => {
    // получаем все группы для вывода в выпадающий список
    db.all(`SELECT * FROM student_group`, (err, rows) => {
      if (err) {
        throw err;
      }
      res.render("student/addStudent", {
        studentGroups: rows,
        title: "Добавление студента"
      });
    });
  })
  .post((req, res) => {
    db.run(
      `INSERT INTO student(name, student_group_id) VALUES (?, ?)`,
      [req.body.name, req.body.student_group_id],
      (err) => {
        if (err) {
          throw err;
        }
        res.redirect('/listStudents');
      }
    );
  });

router.post("/deleteStudent/:id", (req, res) => {
  db.run('DELETE FROM student WHERE id=?', [req.params.id],
    (err) => {
      if (err) {
        throw err;
      }
      res.redirect('/listStudents');
    }
  );
});

module.exports = router;