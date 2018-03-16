import axios from 'axios'
import Vue from 'vue'

const baseUrl = "http://localhost:3000"

export default {
 getStars: (page, sort, sortPrice, cb) => {
    axios.post(`${baseUrl}/stars/`, { page, sort, sortPrice })
    .then(result => {
    cb(result.data.data.docs)
        })
    .catch(console.log)
 },
 getPlanets: (sort, sortPrice, cb) => {
    axios.post(`${baseUrl}/planets`, { sort, sortPrice })
    .then(result => {
    cb(result.data.data)
        })
    .catch(console.log)
 },
 getPlanetSatelites: (sort, sortPrice, cb) => {
    axios.post(`${baseUrl}/planetSatelites`, { sort, sortPrice })
    .then(result => {
    cb(result.data.data)
        })
    .catch(console.log)
 },
 getDwarfPlanet: (sort, sortPrice, cb) => {
    axios.post(`${baseUrl}/dwarfPlanet`, { sort, sortPrice })
    .then(result => {
    cb(result.data.data)
        })
    .catch(console.log)
 },
 getExoplanets: (page, image, sort, sortPrice, cb) => {
   axios.post(`${baseUrl}/exoplanets`, { page, image, sort, sortPrice })
   .then(result => {
   cb(result.data.data.docs)
       })
   .catch(console.log)
 },
 getEthUsd: (cb) => {
   axios.get(`${baseUrl}/EthUsd`)
   .then(result => {
   cb(result.data.data)
       })
   .catch(console.log)
 }
}