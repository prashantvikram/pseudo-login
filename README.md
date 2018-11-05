# pseudo-login

This is a quick and simple registration/login system for applications where the user

* does not interact with other users
* does not store sensitive information.

For such apps, I do not want to put the user through the hassle of registering and verifying their email.

## What it does

The project uses the random-username-generator package to suggest usernames and allows the user to register with a username and a password. All actions/data are saved to the database against this username. The login system is setup using passport.js' Local Strategy.

The _UserSchema_ has a _lastActive_ field to rememeber the last time a user visted your app. All users who have been inactive for 2 weeks will be automatically deleted using mongoose's TTL feature.

### Additional details

* The _/api_ route exposes application's data to authenticated users. This route is rate limited using express-rate-limiter package.
* connect-mongo is used as the session store.

## Todo

* inlude jest for unit testing
* include an Error class for a streamlined handling of errors
* include default avatar images (perhaps from an API)

## License

MIT
