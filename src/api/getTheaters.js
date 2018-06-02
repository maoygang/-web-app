import OriginJsonp from 'jsonp'
import axios from 'axios'

export function getTheaters () {
  const url = 'https://api.douban.com/v2/movie/in_theaters'
  return new Promise((resolve, reject) => {
    OriginJsonp(url, {}, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
export function getComingSoon () {
  const url = 'https://api.douban.com/v2/movie/coming_soon'
  return new Promise((resolve, reject) => {
    OriginJsonp(url, {}, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
export function getTop250 () {
  const url = 'https://api.douban.com/v2/movie/top250'
  return new Promise((resolve, reject) => {
    OriginJsonp(url, {}, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
export function getDetailData (id) {
  const url = `https://api.douban.com/v2/movie/subject/${id}`
  return new Promise((resolve, reject) => {
    OriginJsonp(url, {}, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
export function getDetailList () {
  const url = '/api/detaillist'
  return axios.get(url, {
    params: {
      type: 'movie'
    }
  }).then((response) => {
    return Promise.resolve(response.data)
  })
}
export function getDetailClassify (tag, page) {
  const url = '/api/detailclassify'
  return axios.get(url, {
    params: {
      type: 'movie',
      tag: tag,
      page_limit: page,
      page_start: 0
    }
  }).then((response) => {
    return Promise.resolve(response.data)
  })
}
