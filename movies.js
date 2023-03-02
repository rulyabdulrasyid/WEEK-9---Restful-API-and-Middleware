var express = require("express");
var router = express.Router();
var movies = [
  { id: 101, name: "Fight Club", year: 1999, rating: 8.1 },
  { id: 102, name: "Inception", year: 1999, rating: 8.7 },
  { id: 103, name: "The Dark Knight", year: 1999, rating: 9 },
  { id: 104, name: "12 Angry Man", year: 1999, rating: 8.9 },
];

// find all movies
router.get("/", (req, res) => {
  res.json(movies);
});

// GET Routes (Spesifik ID)
router.get("/:id([0-9]{3,})", (req, res) => {
  var currMovie = movies.filter(function (movie) {
    if (movie.id == req.params.id) {
      return true;
    }
  });
  if (currMovie.length == 1) {
    res.json(currMovie[0]);
  } else {
    res.status(404);
    res.json({ message: "Not Found" });
  }
});

// POST Routers
router.post("/", (req, res) => {
  // Check if all fields are provided and are valid
  if (!req.body.name || !req.body.year.toString().match(/^[0-9]{4}$/g) || !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)) {
    res.status(400).res.json({ message: "Bad Request" });
  } else {
    var newId = movies[movies.length - 1].id + 1;
    movies.push({
      id: newId,
      name: req.body.name,
      year: req.body.year,
      rating: req.body.rating,
    });
    res.json({ Massage: "New movie created.", location: "/movies/" + newId });
  }
});

// PUT Routers
router.put("/:id", function (req, res) {
  // Check if all fields are provided and are valid
  if (!req.body.name || !req.body.year.toString().match(/^[0-9]{4}$/g) || !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g) || !req.params.id.toString().match(/^[0-9]{3,}$/g)) {
    res.status(404).res.json({ message: "Bad Request" });
  } else {
    // gets us the index of movie with given id
    var updateIndex = movies
      .mapf(function (movie) {
        return movie.id;
      })
      .indexOf(parseInt(req.params.id));
    if (updateIndex === -1) {
      // Movie not found, create now
      movies.push({
        id: req.params.id,
        name: req.body.name,
        year: req.body.yera,
        rating: req.body.rating,
      });
      res.json({ message: "New movie created.", location: "/movies/" + req.params.id });
    } else {
      // Update exsisting movie
      movies[updateIndex] = {
        id: req.params.id,
        name: req.params.name,
        year: req.body.year,
        rating: req.body.rating,
      };
      res.json({ message: "Movie id" + req.params.id + "update.", location: "/movies/" + req.params.id });
    }
  }
});

module.exports = router;
