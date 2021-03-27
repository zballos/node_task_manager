const express       = require('express'),
passport            = require('passport'),
FacebookStrategy    = require('passport-facebook').Strategy,
session             = require('express-session'),
restful             = require('node-restful');            

var facebookAuth = require('../config/facebook-auth')
//var HttpsProxyAgent = require('https-proxy-agent');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               const express = require('express')

var UserController = require('../controllers/UserController')
var TaskController = require('../controllers/TaskController')
var TaskListController = require('../controllers/TaskListController')

var User = require('../models/user')

if (process.env['https_proxy']) {
    httpsProxyAgent = new HttpsProxyAgent(process.env['https_proxy']);
}

// passport facebook strategy
passport.use(
    new FacebookStrategy(
        {
            "clientID"        : facebookAuth.clientID,
            "clientSecret"    : facebookAuth.clientSecret,
            "callbackURL"     : facebookAuth.callbackURL
        },
        function (token, refreshToken, profile, done) {
            console.log('token', token)
            console.log('profile', profile)

            var user = UserController.get_by_email({ email: profile.email });

            console.log(user)
            if (user) {
                user.avatar = "hello";
                user.name = profile.displayName;
                user.token = token;
            } else {
                var user = new User({
                    "avatar": "heloo",
                    "name":     profile.name.givenName + ' ' + profile.name.familyName,
                    "email":    profile.email,
                    "token":    token
                });    
            }

            UserController.save(user);
            // await user.save()
            //     .then(data => {
            //         res.json(data)
            //     })
            //     .catch(error => {
            //         res.status(500).json({ 'message': error.message })
            //     });

            return done(null, null);
        })
    );

module.exports = function(server) {
    const router = express.Router()
    server.get('/', function(req, res) {
        res.send('API Task Manager v1.0');
      });

    server.use('/api', router)

    //USER
    server.get('/users', UserController.index)
    server.post('/users', UserController.save)
    server.get('/users/:user_id', UserController.get)
    server.put('/users/:user_id', UserController.update)
    server.delete('/users/:user_id', UserController.delete)
    server.post('/users/forgot_password', UserController.forgot_password)
    server.post('/users/authenticate', UserController.authenticate)
    server.get('/users/email/:email', UserController.get_by_email)
    server.post('/users/save_facebook_user', UserController.save_facebook_user)

    //TaskList
    server.get('/task_list', TaskListController.index)
    server.post('/task_list', TaskListController.save)
    server.get('/task_list/:id', TaskListController.get)
    server.put('/task_list/:id', TaskListController.update)
    server.delete('/task_list/:id', TaskListController.delete)

    //Task
    server.get('/task_list/:task_list_id/task', TaskController.index)
    server.post('/task_list/:task_list_id/task', TaskController.save)
    server.get('/task_list/:task_list_id/task/:id', TaskController.get)
    server.put('/task_list/:task_list_id/task/:id', TaskController.update)
    server.delete('/task_list/:task_list_id/task/:id', TaskController.delete)

    server.get("/login", function (req, res) {
        res.send("<a href='/auth/facebook'>login through facebook</a>");
    });

    server.get("/auth/facebook", passport.authenticate("facebook", { scope : "email" }));
    server.get("/auth/facebook/callback",
        passport.authenticate("facebook", {
            successRedirect : "/content",
            failureRedirect : "/",
            failWithError: true
        }));
}
