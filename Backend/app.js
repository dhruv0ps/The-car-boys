const express = require("express");

const bodyParser = require('body-parser');
const {sendSMS} = require("./services/twilioService");

const cors = require('cors');
require('dotenv').config();
var db = require("./config/db");
const init = require("./config/init");
const routes = require("./routes/index");

const app = express();

app.use(cors());


app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Welcome to the backend!');
  });

  app.use('/api',routes)

  // app.post('/send-sms', async (req, res) => {
  //   const { to, message } = req.body;
  
  //   try {
  //     // Call the sendSMS function from twilioService.js
  //     const sid = await sendSMS(to, message);
  //     res.status(200).json({ success: true, sid });
  //   } catch (error) {
  //     res.status(500).json({ success: false, error: error.message });
  //   }
  // });
const PORT = process.env.PORT || 5000;
init();

app.listen(PORT,() => {
    console.log(`Server running on the ${PORT}`)
})