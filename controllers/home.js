/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  if(!req.user){
  	res.redirect('/login');
  }
  else{
  	res.render('home', {
	    //products
	  });
  }
};

exports.produceDetail = function(req, res){
	var id = req.params.id;
	res.render('detail', {
		//product detail
	});
}