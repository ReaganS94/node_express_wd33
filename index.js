const express = require("express");

const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());

const flavors = [
  {
    id: 1,
    name: "chicken",
    country: "multiple",
  },
  {
    id: 2,
    name: "miso",
    country: "japan",
  },
  {
    id: 3,
    name: "kimchi",
    country: "korea",
  },
  {
    id: 4,
    name: "pho",
    country: "vietnam",
  },
  {
    id: 5,
    name: "spicy pho",
    country: "vietnam",
  },
];

app.get("/", (req, res) => {
  res.send("Welcome to the noodles API");
});

app.get("/api/noodles", (req, res) => {
  if (req.query.country) {
    const filteredFlavors = flavors.filter(
      (flavor) => flavor.country === req.query.country
    );
    res.send(filteredFlavors);
  } else {
    res.send(flavors);
  }
});

app.get("/api/noodles/:id", (req, res) => {
  console.log(req.params);
  const flavor = flavors.find((flavor) => flavor.id === Number(req.params.id));
  if (flavor) {
    res.send(flavor);
  } else {
    res.status(404).send("Sorry, we do not have this flavor in stock");
  }
});

app.post("/", (req, res) => {
  const newFlavor = {
    id: flavors.length + 1,
    name: req.body.name,
    country: req.body.country,
  };
  flavors.push(newFlavor);
  res.status(201).send("resource successfully created");
});

// check if flavor exists
// delete the flavor from the flavors array
// return deleted flavor

app.delete("/api/noodles/:id", (req, res) => {
  // find the resource
  const flavor = flavors.find((flavor) => flavor.id === Number(req.params.id));

  if (!flavor) return res.status(404).send("No such flavor");

  // Find the index of the element to delete
  const index = flavors.indexOf(flavor);

  // delete the element
  flavors.splice(index, 1);

  res.status(200).send(flavor);
});

app.put("/api/noodles/:id", (req, res) => {
  const flavor = flavors.find((flavor) => flavor.id === Number(req.params.id));

  if (!flavor) return res.status(404).send("No such flavor");

  flavor.name = req.body.name || flavor.name;
  flavor.country = req.body.country || flavor.country;

  res.status(200).send(flavor);
});

app.all("*", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// CRUD

// Create
// Read
// Update
// Delete
