import fetch from "node-fetch";
import Movie from "../models/Movies";
import List from "../models/List";

export const getMovies = async (req, res) => {
  // console.log(req.body);
  try {
    const movies = await Movie.find({ userId: req.user.id });
    // const movieYear = await Movie.find(movies.movieYear)
    // console.log(movies)
    const moviesLeft = await Movie.countDocuments({
      userId: req.user.id,
    });
    const activeList = await List.findOne({
      userId: req.user.id,
      isActive: true,
    });
    res.render("movies.ejs", {
      movies: movies,
      moviesLeft: moviesLeft,
      user: req.user,
    });
  } catch (err) {
    console.log(err);
  }
};
export const addMovie = async (req, res) => {
  const url = `https://api.themoviedb.org/3/movie/${req.body.movieId}?api_key=${process.env.API_KEY}&language=en-US`;
  // console.log(req);
  const activeList = await List.findOne({
    userId: req.user.id,
    isActive: true,
  });
  try {
    if (
      !(await Movie.findOne({
        movieId: req.body.movieId,
        userId: req.user._id,
        listId: activeList.id,
      }))
    ) {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.title);
      await Movie.create({
        movieId: req.body.movieId,
        movieTitle: data.title,
        movieYear: data.release_date.split("-")[0] || -1,
        userId: req.user._id,
        listId: activeList.id,
      });
      console.log("Movie has been added!");
    } else {
      await Movie.findOneAndDelete({
        movieId: req.body.movieId,
        userId: req.user._id,
        listId: activeList.id,
      });
      console.log("Movie has been deleted!");
    }
    res.redirect(`/lists/${activeList.id}`);
  } catch (err) {
    console.log(err);
  }
};
export const deleteMovie = async (req, res) => {
  const activeList = await List.findOne({
    userId: req.user.id,
    isActive: true,
  });
  try {
    await Movie.deleteOne({ _id: req.params.id });
    console.log("Deleted Movie");
    res.redirect(`/lists/${activeList.id}`);
  } catch (err) {
    res.redirect(`/lists/${activeList.id}`);
  }
};
export const searchMovies = async (req, res) => {
  // console.log(req.query);
  const movieTitle = req.query.movieName;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${movieTitle}'`;
  const activeList = await List.findOne({
    userId: req.user.id,
    isActive: true,
  });
  // console.log(activeList);

  try {
    // Todo: Error handle empty query
    // if (movieTitle.length < 1) {
    //   res.redirect("back");
    // }

    if (!activeList) {
      res.redirect("/lists");
    } else {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(req.user);
      let userId = -1;
      if (req.user) {
        userId = req.user.id;
      }

      for (const movie of data.results) {
        if (req.user) {
          if (
            !(await Movie.findOne({
              movieId: movie.id,
              userId: req.user.id,
              listId: activeList.id,
            }))
          ) {
            movie.onList = false;
          } else {
            movie.onList = true;
          }
        }
      }
      console.log(req.query.movieName);
      if (req.query.movieName === undefined) {
        res.redirect("/lists");
      } else {
        res.render("movieSearch.ejs", {
          activeList: activeList.listTitle,
          activeId: activeList.id,
          movies: data.results,
          movieName: req.query.movieName,
          user: req.user,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
