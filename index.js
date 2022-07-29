const express = require("express");
const app = express();
const fs = require("fs"); // file system
const path = require("path"); // directory path
const bodyParser = require("body-parser"); // parse body
const PORT = process.env.PORT || 3001; // port
const itemsPath = path.join(__dirname, "./api/items.json"); // dynamically get the path

// Using middleware to serve static files
app.use(express.static(path.join(__dirname, "./dist")));
// Middleware to parse the body of the request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
// Gets static page html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

app.get("/api/items", (req, res) => {
  fs.readFile(itemsPath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// POST route for adding a new todo item to the json api
app.post("/api/items", (req, res) => {
  fs.readFile(itemsPath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json(err); // 500 is the status code for server error
    } else {
      const items = JSON.parse(data);
      req.body.id = Math.random().toString(36).slice(2);
      // Add the new item to the array
      items.push(req.body);
      // Write the new array to the json file
      fs.writeFile(itemsPath, JSON.stringify(items), (err) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.json(items);
        }
      });
    }
  });
});
// GET route for getting a single todo item from the json api by id
app.get("/api/items/:id", (req, res) => {
  fs.readFile(itemsPath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      const items = JSON.parse(data);
      const item = items.find((item) => item.id === req.params.id);
      res.json(item);
    }
  });
});
// PUT route for updating a todo item from the json api by id
app.put("/api/items/:id", (req, res) => {
  fs.readFile(itemsPath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      const items = JSON.parse(data);
      const item = items.find((item) => item.id === req.params.id);
      // If item does not exist return 404
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      // Updating item with new values
      item.title = req.body.title;
      item.task = req.body.task;
      // Write the new item with updated values to the array to the json file
      fs.writeFile(itemsPath, JSON.stringify(items), (err) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.json(items);
        }
      });
    }
  });
});
// DELETE route for deleting a todo item from the json api by id
app.delete("/api/items/:id", (req, res) => {
  fs.readFile(itemsPath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      const items = JSON.parse(data);
      const item = items.find((item) => item.id === req.params.id);
      // Finding the index of the item to be deleted
      items.splice(items.indexOf(item), 1);
      fs.writeFile(itemsPath, JSON.stringify(items), (err) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.json(items);
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
