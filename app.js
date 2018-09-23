const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to my API"
  });
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      res.json({
        message: "post created",
        authData
      });
    }
  });
});

function verifyToken(req, res, next) {
  //console.log("Request", req);
  const bearerHeader = req.headers["authorization"];
  console.log("bearerHeader", bearerHeader);
  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(' ')[1];
    console.log("token", token);
    req.token = token;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    username: "Leo",
    email: "leo@gmail.com"
  };

  jwt.sign({ user }, "secretkey", {expiresIn:'30s'}, (err, token) => {
    res.json({
      token
    });
  });
});

app.listen(5000, console.log("Server listing at 5000"));
