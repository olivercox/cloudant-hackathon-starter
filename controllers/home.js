/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  if(!req.user){
  	res.redirect('/login')
  }
  else{
  	res.render('home', {
	    title: 'Home'
	  });
  }
};