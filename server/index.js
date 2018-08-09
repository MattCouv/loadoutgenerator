const fetch = require('node-fetch');
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    fetch("http://battlelog.battlefield.com/bf4/loadout/get/CoRe_Castiel/351870834/1/")
      .then(res => res.json())
      .then(body => {
          res.set("Content-Type", "application/json");
          res.send(body)
        });
})

app.listen(8000, () => console.log('Example app listening on port 8000!'))