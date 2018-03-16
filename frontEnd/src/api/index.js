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
 getExoplanets: (page, cb) => {
   axios.post(`${baseUrl}/exoplanets`, { page})
   .then(result => {
   cb(result.data.data.docs)
       })
   .catch(console.log)
 },
 getEthUsd: (cb) => {
   axios.get(`${baseUrl}/EthUsd`)
   .then(result => {
       console.log('result: ', result);
   cb(result.data.data)
       })
   .catch(console.log)
 }
}