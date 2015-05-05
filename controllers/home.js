/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  if(!req.user){
  	res.redirect('/login');
  }
  else{
    var id = req.params.id;
    var fs = require('fs');
    var items = [];
    var obj = JSON.parse(fs.readFileSync('tweet_output_data.json', 'utf8'));
    console.log("Got json data");
    console.log(obj);
    obj.forEach(function(result) {
      result.items.forEach(function(item) {
        items.push(item);
      });
    });
  	res.render('home', {
      items: items
  	});
  }
};

exports.produceDetail = function(req, res){
	var id = req.params.id;
  var fs = require('fs');
  var items = [];
  var obj = JSON.parse(fs.readFileSync('../tweet_output_data.json', 'utf8'));
  console.log("Got json data");
  console.log(obj);
  obj.forEach(function(result) {
    result.items.forEach(function(item) {
      items.push(item);
    });
  });
	res.render('detail', {
    items: items
	});
}
