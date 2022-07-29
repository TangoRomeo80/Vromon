/* This file contains the passport authentication setup*/

import { Strategy as GoogleStrategy } from 'passport-google-oauth20' //import google oAuth

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/users/signin/google/redirect',
    },
    (accessToken, refreshToken, profile, done) => {}
  )
)
