const express = require('express')
const config = require('./config/index')
const axios = require('axios')

const app = express()
const apiRoutes = express.Router()


app.get('/api/detaillist', (req, res) => {
  const url = 'https://movie.douban.com/j/search_tags'
  axios.get(url, {
    headers: {
      referer: 'https://movie.douban.com',
      host: 'movie.douban.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((err) => {
    console.log(err)
  })
})
app.get('/api/detailclassify', (req, res) => {
  const url = 'https://movie.douban.com/j/search_subjects'
  axios.get(url, {
    headers: {
      referer: 'https://movie.douban.com',
      host: 'movie.douban.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((err) => {
    console.log(err)
  })
})

app.use('/api', apiRoutes)
app.use(express.static('./dist'))

const port = process.env.PORT || config.build.port
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
