// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});




// your first API endpoint... 
app.get("/api/:date", (req, res) => {
  const date = new Date(req.params.date);

  if (isNaN(+req.params.date) && date == 'Invalid Date') {
    res.json({ error: "Invalid Date" });
  } else if (+req.params.date.length === 13) {
    const utc = new Date(+req.params.date).toUTCString();

    res.json({
      unix: +req.params.date,
      utc: utc
    })
  } else {
    const unix = new Date(req.params.date).getTime();
    const utc = new Date(req.params.date).toUTCString();

    res.json({ unix, utc });
  }
});

// 
app.get("/api", (req, res) => {
  const unixDate = new Date().getTime();
  const utcDate = new Date().toUTCString();
  
  const dateObject = {
    unix: unixDate,
    utc: utcDate
  }

  res.json(dateObject);
})

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
  console.log(`http://localhost:${listener.address().port}/`)
});
