/**
 * Created by chang on 2017/12/3.
 */
var express  = require('express');
var config = require('./config');

var port = process.env.PORT || config.build.port;
var app = express();

var appData = require("./data.json")
var seller = appData.seller
var goods = appData.goods
var ratings =appData.ratings
var router = express.Router();

router.get('/', function (req, res, next) {
  req.url = 'index.html';
  next()
});
router.get('/seller',function(res, rep) {
  rep.send({
    errorNumber: 0,
    data: seller
  })
})
router.get('/goods',function(res, rep) {
  rep.send({
    errorNumber: 0,
    data: goods
  })
})
router.get('/ratings',function(req,res) {
  res.send({
    errorNumber: 0,
    data: ratings
  })
})
app.use("/api",router)
app.use(router);

app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
})
