"use strict";
console.log('start');

let express = require('express');
let mustache = require('mustache-express');
let app = express();

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', './views');


let movies = require('./movies');
movies.load('movies.json');

app.get('/movie-details/:id', (req, res) => {
res.render('movie-details', movies.read(req.params.id));
});

/** Page d'acceuil */
app.get('/', (req, res) => {
    res.render('movie-list',{Movies: movies.list()});
})

/** Ajouter un film */

/*
app.get('/add-movie-form',(req,res) => {
    res.render('add-movie-form', {allMovies : movies.list()});
})

app.get('/add-movie', (req,res) => {
    let newMovie = movies.create(req.query.title, req.query.year, req.query.actors, req.query.description,
        req.query.posterUrl);

        movies.save('movies2.json');

        res.redirect("/");

});
*/

/**Supprimer un film */

app.get('/delete-movie-form/:id', (req,res) =>{
    res.render('delete-movie',movies.read(req.params.id));
});


app.get('/delete-movie/:id', (req, res)=> {

    movies.delete(req.params.id);
    movies.save('movies2.json');

    res.redirect('/');

})








app.listen(3000, () => console.log('movie server at http://localhost:3000'))


