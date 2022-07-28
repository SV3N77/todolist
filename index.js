const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "./dist")));

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

app.get("/api/items", (req, res) => {
  fs.readFile("./api/items.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.send(data);
    }
  });
});

app.post("/api/items", (req, res) => {
  fs.readFile("./api/items.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const items = JSON.parse(data);
      req.body.id = Math.random().toString(36).slice(2);
      items.push(req.body);
      fs.writeFile("./api/items.json", JSON.stringify(items), (err) => {
        if (err) {
          console.log(err);
        } else {
          res.send(items);
        }
      });
    }
  });
});

app.get("/api/items/:id", (req, res) => {
  fs.readFile("./api/items.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const items = JSON.parse(data);
      const item = items.find((item) => item.id === req.params.id);
      res.send(item);
    }
  });
});

app.put("/api/items/:id", (req, res) => {
  fs.readFile("./api/items.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const items = JSON.parse(data);
      const item = items.find((item) => item.id === req.params.id);

      item.title = req.body.title;
      item.task = req.body.task;
      fs.writeFile("./api/items.json", JSON.stringify(items), (err) => {
        if (err) {
          console.log(err);
        } else {
          res.send(items);
        }
      });
    }
  });
});

app.delete("/api/items/:id", (req, res) => {
  fs.readFile("./api/items.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const items = JSON.parse(data);
      const item = items.find((item) => item.id === req.params.id);
      items.splice(items.indexOf(item), 1);
      fs.writeFile("./api/items.json", JSON.stringify(items), (err) => {
        if (err) {
          console.log(err);
        } else {
          res.send(items);
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
