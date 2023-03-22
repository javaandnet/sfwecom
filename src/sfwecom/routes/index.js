import express from "express";

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
// router.get('/', function(req, res) {
//   res.sendFile(__dirname + "/dist/index.html");
// });
export default router;