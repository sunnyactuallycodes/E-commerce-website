import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Google } from "../models/google.model.js";
import passport from "passport";

passport.use(
  new GoogleStrategy(
    {
      clientID: "259075562780-3tjrb7ebb26trcj60hclf52bkoi892d9.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4000/auth/google/callback",
      scope: ["profile", "email"],   // ← Add email too
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Better to use findOrCreate or check if exists first
        let user = await Google.findOne({ googleId: profile.id });

        if (!user) {
          user = await Google.create({
            googleId: profile.id,           // Important: store Google ID
            username: profile.name.givenName || profile.displayName,
            email: profile.emails?.[0]?.value,   // Correct way to get email
            // You can also save: displayName, photo, etc.
          });
        }

        return done(null, user);   // ← This is crucial
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialize user (what gets stored in session)
passport.serializeUser((user, done) => {
  console.log("Serializing user:", user);
  process.nextTick(() =>
    done(null, {
      id: user.id,
      googleId: user.googleId,
      username: user.username,
      email: user.email,
    })
  );
});

// Deserialize user
passport.deserializeUser(async (serializedUser, done) => {
  try {
    console.log("🔄 Deserializing user with data:", serializedUser);

    if (!serializedUser || !serializedUser.id) {
      return done(null, false);
    }

    const user = await Google.findById(serializedUser.id);
    
    if (!user) {
      console.log("User not found in DB during deserialize");
      return done(null, false);
    }

    done(null, user);        // ← This attaches user to req.user
  } catch (err) {
    console.error("Deserialize error:", err);
    done(err, null);
  }
});
export default passport;