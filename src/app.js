import express from "express";
import {create} from "express-handlebars";
import indexRoutes from "./routes/index.routes";
import path from "path";
import morgan from 'morgan'; //middleware

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));

app.engine(
  ".hbs",
  create({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaultLayout: "main",
    extname: ".hbs",
  }).engine
);

app.set("view engine", ".hbs");

// MIDDLEWARE

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))

// Routes
app.use(indexRoutes);

// static files
// configuracion para poder acceder a los archivos de public
app.use(express.static(path.join(__dirname, "public")))

export default app;
