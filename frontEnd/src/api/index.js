import axios from 'axios'

const baseUrl = "http://localhost:3000"

export default {
 getStars: (page, cb) => {
    axios.post(`${baseUrl}/stars/`, { page})
    .then(result => {
    cb(result.data.data.docs)
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
 getDwarfPlanet: (cb) => {
    axios.get(`${baseUrl}/dwarfPlanet`)
    .then(result => {
    cb(result.data.data)
        })
    .catch(console.log)
 },
 getExoplanets: (cb) => {
   axios.get(`${baseUrl}/exoplanets`)
   .then(result => {
   cb(result.data.data)
       })
   .catch(console.log)
}
}