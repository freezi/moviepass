import express from "express";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import methodOverride from "method-override";
import flash from "express-flash";
import logger from "morgan";
import "./config/database";
import mainRoutes from "./routes/main";
import movieRoutes from "./routes/movies";
import searchRoutes from "./routes/search";
import listRoutes from "./routes/lists";
import dotenv from "dotenv";
import path from "path";
// require("./config/passport")(passport);
// Passport config
import * as passportConfig from "./config/passport";
dotenv.config();

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));

// Use forms for put / delete
app.use(methodOverride("_method"));

// Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use("/", mainRoutes);
app.use("/movies", movieRoutes);
app.use("/search", searchRoutes);
app.use("/lists", listRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
