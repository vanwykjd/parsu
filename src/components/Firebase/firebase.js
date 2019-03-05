import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }
    
  // *** Auth Register User ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  // *** Auth User Sign In ***
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  // *** Auth User Sign Out ***
  doSignOut = () => this.auth.signOut();
  // *** Auth Password Reset ***
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  // *** Auth Password Update ***
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
  // *** User API ***

  // *** Merge Auth and DB User API *** //
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();
            const userMatches = Object.keys(dbUser.matches).map(key => ({
               ...dbUser.matches[key],
              uid: key,
            }));
   
            // *** merge auth and db user ***
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              providerData: authUser.providerData,
              matchList: userMatches,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');
  
  // *** Match API ***
  
  matches = () => this.db.ref('matches');

  match = uid => this.db.ref(`matches/${uid}`);
}

export default Firebase;