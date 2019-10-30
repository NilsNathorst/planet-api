const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
var firebase = require("firebase-admin");

firebase.initializeApp({
  credential: firebase.credential.cert({
    type: "service_account",
    project_id: "only-one-planet",
    private_key_id: process.env.FB_PRIVATE_KEY_ID,
    private_key: process.env.FB_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email:
      "firebase-adminsdk-bgs28@only-one-planet.iam.gserviceaccount.com",
    client_id: "105516695166122801845",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-bgs28%40only-one-planet.iam.gserviceaccount.com"
  }),
  databaseURL: "https://only-one-planet.firebaseio.com"
});

var db = firebase.database();
var ref = db.ref("trash");

var usersRef = ref.child("garbage");

router.get("/", (req, res) => {
  usersRef.push().set("i am fun");
  res.json({
    trashing: "garbing"
  });
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
