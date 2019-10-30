const express = require("express");
const serverless = require("serverless-http");
require("dotenv").config();
const app = express();
const router = express.Router();

var firebase = require("firebase-admin");
const val = process.env.PRIVATE_KEY;
console.log(val);
const serviceAccount = {
  type: "service_account",
  project_id: "only-one-planet",
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email:
    "firebase-adminsdk-bgs28@only-one-planet.iam.gserviceaccount.com",
  client_id: "105516695166122801845",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-bgs28%40only-one-planet.iam.gserviceaccount.com"
};

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://only-one-planet.firebaseio.com"
});

var db = firebase.database();
var ref = db.ref("trash");

var usersRef = ref.child("garbage");

router.get("/", (req, res) => {
  usersRef.push().set("i am a can");
  res.json({
    trashing: "garbing"
  });
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
