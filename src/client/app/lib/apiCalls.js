var Promise = require('promise');
var axios = require('axios');

module.exports = {

    getUserId: (username) => {
        return new Promise((resolve, reject) => {
            axios.get(`/getUser?id=${username}`)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
        })
    },
    
    getChampionImage: (username) => {
        
    },

    getChampionInfo: (id) => {
        return new Promise((resolve, reject) => {
            axios.get(`/getChampions?id=${id}`)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
        })
    },

    getChampionNames: (ids) => {
        return new Promise((resolve, reject) => {
            axios.post(`/getChampionInfo`, ids)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
        })
    },

    getComments: () => {

    }
}