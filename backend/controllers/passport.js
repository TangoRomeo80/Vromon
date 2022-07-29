/* This file contains the passport authentication setup*/

// import passport from 'passport' //import passport
import { Strategy as GoogleStrategy } from 'passport-google-oauth20' //import google oAuth
import { googleAuthCallback } from './authController.js' //import google auth handler

const passportSetup = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        // options for google strategy
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/users/signin/google/redirect',
      },
      (accessToken, refreshToken, profile, done) => {
        // passport callback function
        googleAuthCallback(profile, done)
      }
    )
  )
}

export default passportSetup
