const axios = require('axios');
const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'html');

app.get('/getData', (req, res) => {
    let otherVars = require('./otherVars.json');

    axios({
        method: 'GET',
        url: 'https://www.patreon.com/api/oauth2/v2/identity?fields%5Buser%5D=about,full_name,image_url,thumb_url,vanity',
        headers: { Authorization: `Bearer ${otherVars.tokenCreator}` }
    }).then(function (response) {

        let data = [
            response.data.data.attributes.full_name,
            response.data.data.attributes.vanity,
            response.data.data.attributes.about,
            response.data.data.attributes.image_url,
            response.data.data.attributes.thumb_url,
        ];
    
        axios({
            method: 'GET',
            url: `https://www.patreon.com/api/oauth2/v2/campaigns/${otherVars.campaignId}?fields%5Bcampaign%5D=patron_count`,
            headers: { Authorization: `Bearer ${otherVars.tokenCreator}` }
        }).then(function (response) {
            let patronCount = response.data.data.attributes.patron_count;
            
            const randomNumber = Math.floor(Math.random() * 100);
            let maxPatronos = otherVars.maxPatronos;
            res.json({ data, patronCount, randomNumber, maxPatronos });
        });
    });
});

app.get('/', (req, res) => {
    res.render('index.html');
});

app.use(function (req, res) { res.redirect('/'); });
app.listen(3000, () => console.log(`> http://localhost:3000`));