const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const User = require('../models/User')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            return done(null, false, req.flash('fail', 'email is not registered!'))
        }
        if (await bcrypt.compare(password, user.password)) {
            return done(null, user)
        } else {
            return done(null, false, req.flash('fail', 'password incorrect!'))
        }
    } catch (err) {
        return done(err)
    }
}))

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

module.exports = passport