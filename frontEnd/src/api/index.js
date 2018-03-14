import axios from 'axios'
import Vue from 'vue'

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
 },
 wikipediaIntro: (object, cb) => {
     const url ="https://en.wikipedia.org/w/api.php?action=opensearch&prop=pageimages&limit=1&format=json&callback=?&search="+object;
    Vue.http.jsonp(url).then(response => {
        cb(response.body[2])
      }, response => {
        console.log(response)
    });
 }
}