const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const request = require('request');
const fs = require('fs');
require('dotenv').config();

// mongoose.connect('mongodb://antoafarian:hello123@ds139198.mlab.com:39198/soloproject');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './../src/client')));



let headers = { 'X-Riot-Token': process.env.API_KEY }

setInterval(() => {
    let options = {
        url: `https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&tags=image&dataById=false`,
        headers: headers
    }

    request(options, function(error, response, body) {
        if (error) console.log(error);
        else {
            let info = JSON.parse(body).data;
            let newObj = Object.assign({}, info);
            for (key in newObj) {
                newObj[newObj[key].id] = newObj[key];
                delete newObj[key];
            }
            fs.writeFile(__dirname + '/../src/client/app/championDB.json', JSON.stringify(newObj, null, '\t'), function(){
                console.log('Updated champion DB');
            });
        }
    });
    
    
}, 1000 * 3600);


app.get('/getUser', (req, res) => {
    let options = {
        url: `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${req.query.id}`,
        headers: headers
    }

    request(options, function(error, response, body) {
        if (error) res.send(error);
        else res.send(body);
    });
});

app.get('/getChampions', (req, res) => {
    if (req.query.id == "undefined") {
        return res.send('no summoner id');
    }
    let options = {
        url: `https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/${req.query.id}`,
        headers: headers
    }

    request(options, function(error, response, body) {
        if (error) res.send(error);
        else {
            let info = JSON.parse(body).slice(0,3);
            res.send(info);
        }
    });
    
})

app.post('/getChampionInfo', (req, res) => {
    let champions = {};
    let results = {}
    fs.readFile(__dirname + '/../src/client/app/championDB.json', "utf8", function read(err, response) {
        if (err) {
            throw err;
        }
        champions = response;
        processFile();          
    });

    function processFile() {
        champions = JSON.parse(champions)
        let results = [];
        for (let i=0; i<req.body.length; i++) {
            let curr = champions[req.body[i]];
            
            results.push({'url': `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${curr.image.full}`,
                            'name': curr.name,
                            'id': curr.id,
                            'title': curr.title})
        }

        res.send(results);
    }
    
})

app.listen((process.env.PORT || 3333), function(){
  console.log('listening on *:3333');
});