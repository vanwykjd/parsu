# Parsuit
a web application that enables users to create golf matches against other users, and provide real-time scores that have been calculate based on a variety of scoring formats and courses that can be selected.

## Installation

* `git clone https://github.com/vanwykjd/parsuit.git`
* `cd parsuit`
* `npm install`
* `npm start`
* visit http://localhost:3000

Here's an overview on how to add Firebase to your personal project [Firebase Setup](https://firebase.google.com/docs/database/web/start).

### Firebase Configuration

* After initializing your Firebase real-time database, copy/paste the configuration info from your Firebase project's dashboard into one of these files
  * *src/components/Firebase/firebase.js* file
  * *.env* file
  * *.env.development* and *.env.production* files

The *.env* or *.env.development* and *.env.production* files could look like the following then:

```
REACT_APP_API_KEY="your personal config:apiKey"
REACT_APP_AUTH_DOMAIN="your personal config:authDomain"
REACT_APP_DATABASE_URL="your personal config:databaseURL"
REACT_APP_PROJECT_ID="your personal config:projectId"
REACT_APP_STORAGE_BUCKET="your personal config:storageBucket"
REACT_APP_MESSAGING_SENDER_ID="your personal config:messgingSenderId"
```

### Firebase Database Structure
```
dbname-123dd
 |
  - matches
 |
  - rounds
 |
  - users
```