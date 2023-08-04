const axios = require('axios');
const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.static('public'));
app.set('view engine', 'html');

app.get('/getData', (req, res) => {
    axios({
        method: 'GET',
        url: 'https://www.patreon.com/api/oauth2/v2/identity?fields%5Buser%5D=about,full_name,image_url,thumb_url,vanity',
        headers: { Authorization: `Bearer ${process.env.TOKEN_CREATOR}` }
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
            //url: `https://www.patreon.com/api/oauth2/v2/campaigns/${process.env.CAMPAIGN_ID}?fields%5Bcampaign%5D=patron_count`,
            url: `https://www.patreon.com/api/oauth2/v2/campaigns/${process.env.CAMPAIGN_ID}/members?${encodeURI('include=currently_entitled_tiers,address&fields[member]=full_name,is_follower,last_charge_date,last_charge_status,lifetime_support_cents,currently_entitled_amount_cents,patron_status&fields[tier]=amount_cents,created_at,description,discord_role_ids,edited_at,patron_count,published,published_at,requires_shipping,title,url&fields[address]=addressee,city,line_1,line_2,phone_number,postal_code,state')}`,
            headers: { Authorization: `Bearer ${process.env.TOKEN_CREATOR}` }
        }).then(function (response) {
            let patronCount = parseInt(response.data.meta.pagination.total) - parseInt(process.env.CANCELLED_ORDERS);
            
            const randomNumber = Math.floor(Math.random() * 100);
            let maxPatronos = process.env.MAX_PATRONOS;
            res.json({ data, patronCount, randomNumber, maxPatronos });
        });
    });
});

app.get('/', (req, res) => {
    res.render('index.html');
});

app.use(function (req, res) { res.redirect('/'); });
app.listen(3000, () => console.log(`> http://localhost:3000`));