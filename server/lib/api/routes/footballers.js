import express from 'express'
const router = express.Router()

import db from '../models'

router.delete('/:movieId', (req, res, next) => {
  if(!req.params.movieId) {
    const err = new Error('No movies found')
    err.status = 400
    next(err)
  }
  const MovieId = req.params.movieId
  const UserId = req.userData.userId
  db.Movie.destroy({
    where: {
      id: MovieId,
      UserId
    }
  }).then(data => {
    console.log(data)
    if(!data) {
      const err = new Error('No movies found')
      err.status = 400
      next(err)
    }
    res.status(200).json({
      msg: 'Deleted movie'
    })
  }).catch(err => {
    next(err)
  })
})

router.get('/', (req, res, next) => {
  const UserId = req.userData.userId
  db.Movie.findAll({
    where: {
      UserId
    }
  }).then(movies => {
    if(!movies) {
      const err = new Error('No movies found')
      err.status = 400
      next(err)
    }
    res.status(200).json({
      movies
    })
  }).catch(err => {
    next(err)
  })
})


router.post('/', (req, res, next) => {
  const movie = {
    movieId: req.body.movieId,
    title: req.body.title,
    imgUrl: req.body.imgUrl,
    releaseDate: req.body.releaseDate,
    UserId: req.userData.userId
  }
  db.Movie.create(movie)
    .then(movie => {
      console.log(movie)
      res.status(200).json({
        msg : 'Movie added',
        movie: movie.dataValues
      })
    }).catch(err => {
      next(err)
    })
})

export default router