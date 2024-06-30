// Make sure you have installed all the dependencies with "npm i".
// The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const thePassword = "ILoveProgramming";
let bandName = "";

app.use(bodyParser.urlencoded({ extended: true }));

function password(req, res, next) {
    console.log(req.body);
    if (req.body["password"] === thePassword) {
      next();
    } else {
      res.status(401).send(`
        <h1>Unauthorized</h1>
        <p>You will be redirected to the homepage in 3 seconds.</p>
        <script>
          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        </script>
      `);
    }
  }

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", password, (req, res) => {
    res.sendFile(__dirname + "/public/secret.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
