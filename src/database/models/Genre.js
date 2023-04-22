module.exports = (sequelize, dataTypes) => {
    let alias = 'Genre';

    let cols = {
        id:{
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncremente: true,
        },
        name : {
            type : dataTypes.STRING,
        },
        ranking : {
            type : dataTypes.INTEGER,
        }
    };

    let config = {
        tableName : 'genres',
        timestamps : false,
    };

    const Genre = sequelize.define(alias, cols, config);

    Genre.associate = (models) => {
        Genre.belongsToMany(models.Movie, {
            as: 'movies',
            through: 'movie_genre',
            foreignKey: 'genre_id',
            otherKey : 'movie_id',
            timestamps: false,
        });
    };

    return Genre;
}