const {Movie } = require('../database/models');


const moviesController = {
    list : (req, res) => {
        Movie.findAll()
        .then(movies => {
            //return res.send(movies)
            return res.render('moviesList', {movies})
        })
    },
    detail : (req, res) => {
        Movie.findByPk(req.params.id, {
            include: [{association: 'actors'}, {association: 'genre'}]
        }).then(movie => {
            //return res.send(movie)
            return res.render('moviesDetail', {movie})
        })
    },
    new : (req, res) => {

    },
    recomended : (req, res) => {

    },
};

module.exports = moviesController;