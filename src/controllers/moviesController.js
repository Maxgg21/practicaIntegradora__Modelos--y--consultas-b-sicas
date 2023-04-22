const { Movie, Sequelize } = require('../database/models');


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
        Movie.findAll({
            order : [
                ['release_date', 'DESC'],
            ],
            limit: 5,
        }, 
        {
            include : [{association: 'genre'}, {association: 'actors'}] 
        })
        .then(movies => {
            return res.render('newestMovies', {movies});
        })
    },
    recomended : (req, res) => {
        Movie.findAll({
            where: {
                rating : {[Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ],
        }, {
            include : [{association: 'genre'}] 
        })
        .then(movies => {
            return res.render('recommendedMovies', {movies})
        });
    },
};

module.exports = moviesController;