import express from 'express'
const router = express.Router()

import db from '../models'

router.get('/:page', (req, res, next) => {
  if(!req.params.page) {
    const err = new Error('No footballers found')
    err.status = 400
    next(err)
  }
  db.Footballer.findAll({
    attributes: ['Name', 'Nationality'],
    offset: parseInt(req.params.page),
    limit: 12
    }).then(footballers => {
    if(!footballers) {
      const err = new Error('No footballers found')
      err.status = 400
      next(err)
    }
    res.status(200).json({
      footballers
    })
  }).catch(err => {
    next(err)
  })
})

router.get('/name/:name', (req, res, next) => {
  if(!req.params.name) {
    const err = new Error('No footballers found')
    err.status = 400
    next(err)
  }
  db.Footballer.findAll({
    where: {
      Name: req.params.name
    }
  }).then(footballers => {
    if(!footballers) {
      const err = new Error('No footballers found')
      err.status = 400
      next(err)
    }
    res.status(200).json({
      footballers
    })
  }).catch(err => {
    next(err)
  })
})

export default router