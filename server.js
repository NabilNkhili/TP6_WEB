var express = require('express');
var mustache = require('mustache-express');


var app = express();


app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', './views');

var movies = require('./movies');

movies.load('movies.json');

function updateMovies(){

	movies.save('movies.json');;
}


app.get('/movie-details/:id', (req, res) => {
	res.render('movie-details', 
		movies.read(req.params.id));
});


app.get('/movie-details/', (req, res) => {
	res.render('movie-details', 
		movies.read(0));
});





/**Page d'accueil*/

app.get('/', (req, res) => {
    res.render('movie-list', {Movies: movies.list()});
});




/**Ajouter un film*/

app.get('/add-movie-form', (req, res) => {
    res.render('add-movie-form', {Movies: movies.list()});
});


app.get('/add-movie', (req, res) => {
	

    movies.create(req.query.title, req.query.year, req.query.actors, req.query.description,req.query.posterUrl);
	updateMovies();
    res.redirect("/");
});






/**Supprimer un film*/

app.get('/delete-movie-form/:id', (req, res) => {
    res.render('delete-movie', movies.read(req.params.id));
});


app.get('/delete-movie/:id', (req, res) => {

    movies.delete(req.params.id);
    movies.save('movies.json');
    res.redirect('/');
});



/**Editer un film*/

app.get('/edit-movie-form/:id', (req, res) => {
    res.render('edit-movie-form', movies.read(req.params.id));
});


app.get('/edit-movie/:id', (req, res) => {

    console.log(req.params.id);
	console.log(	movies.update(req.params.id, req.query.title, req.query.year, req.query.actors, req.query.description,req.query.posterUrl));
	updateMovies();  
  res.redirect("/");  

});






app.listen(3000, () => console.log('http://localhost:3000'));
/** npm i  express express-mustache */

/** nodemon qui me facilite la tâche, accélère mon environnement de dev et redémarre automatiquement le serveur à chaque modification du code */
/**[nodemon] restarting due to changes...
[nodemon] starting `node TP6_WEB/server.js server.js` */