import axios from 'axios'

const baseUrl = "http://localhost:3000"

export default {
 getStars: (cb) => {
    axios.get(`${baseUrl}/stars`)
    .then(result => {
    cb(result.data.data)
        })
    .catch(console.log)
 },
 getPlanets: (cb) => {
    axios.get(`${baseUrl}/planets`)
    .then(result => {
    cb(result.data.data)
        })
    .catch(console.log)
 },
 getPlanetSatelites: (cb) => {
    axios.get(`${baseUrl}/planetSatelites`)
    .then(result => {
    cb(result.data.data)
        })
    .catch(console.log)
 },
}