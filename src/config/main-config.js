require("dotenv").config();
const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");
const logger = require('morgan');
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const flash = require("express-flash");
const passportConfig = require("./passport-config");
const Sequelize = require('sequelize')
const SequelizeStore = require('connect-session-sequelize')(session.Store);

var sequelize = new Sequelize(
    "database",
    "username",
    "password", {
        "dialect": "postgres",
        "storage": "./session.postgres"
    });

module.exports = {
    init(app, express){
        app.set("views", viewsFolder);
        app.set("view engine", "ejs");
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(logger('dev'));
        app.use(express.static(path.join(__dirname, "..", "assets")));
        app.use(expressValidator());
        app.use(session({
            store: new SequelizeStore({
                db: sequelize
            }),
            secret: process.env.cookieSecret,
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 1.21e+9 } //set cookie to expire in 14 days
        }));
        
        app.use(flash());
        passportConfig.init(app);

        app.use((req,res,next) => {
            res.locals.currentUser = req.user;
            next();
        })

    }
};