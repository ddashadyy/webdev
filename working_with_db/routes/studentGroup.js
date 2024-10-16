var express = require("express");
var db = require("./database.js");
var router = express.Router();
var isAuth = require("./isAuth")


router.get("/listStudentGroups", isAuth.isAuthenticated, (req, res) => {
    db.all('SELECT * FROM student_group', (err, rows) => {
        if (err) { // если произошла ошибка, то будет сгенерировано исключение (программа прекратит свою работу), можно предусмотреть другую обработку таких исключительных ситуаций
            throw err;
        }
        res.render("studentGroup/listStudentGroups", { // указываем, что шаблон listStudentGroups.pug находится в подкаталоге studentGroup, который располагается в каталоге views
            studentGroups: rows, // rows - результат запроса
            title: "Список студенческих групп"
        });
    });
});

router.get("/addStudentGroup", (req, res) => {
    res.render("studentGroup/addStudentGroup", {
        title: "Добавление студенческой группы"
    });
});

// добавление студенческой группы в базу данных
router.post("/addStudentGroup", (req, res) => {
    db.run(`INSERT INTO student_group(name) VALUES (?)`, [req.body.name],
        (err) => {
            if (err) {
                 throw err;
            }
            // переход к списку студенческих групп после добавления записи
            res.redirect("/listStudentGroups");
        }
    );
});

router.get("/studentGroup/:id", (req, res) =>  {
    db.get(`SELECT * FROM student_group WHERE id=?`, [req.params.id], (err, rows) => {
        if (err) {
            throw err;
        }
        res.render("studentGroup/studentGroup", {
            studentGroup: rows,
            title: "Студенческая группа"
        });
    });
});

router.post("/updateStudentGroup/:id", (req, res) => {
    db.run(`UPDATE student_group SET name=? WHERE id=?`, [req.body.name, req.params.id],
        (err) => {
            if (err) {
                throw err;
            }
            // возвращаемся к списку студенческих групп
            res.redirect('/listStudentGroups');
        }
    );
});

router.post("/deleteStudentGroup/:id", (req, res) => {
    db.run(`DELETE FROM student_group WHERE id=?`, [req.params.id],
        (err) => {
            if (err) {
                throw err;
            }
            // возвращаемся к списку студенческих групп
            res.redirect('/listStudentGroups');
        }
    );
});

module.exports = router