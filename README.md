# Parsuit
A web application that provides a platform for golfers to create matches and keep track of scores in real time.

[![CircleCI](https://circleci.com/gh/vanwykjd/parsuit/tree/master.svg?style=svg)](https://circleci.com/gh/vanwykjd/parsuit/tree/master)

## Features
* Create a user account by providing an email, username and handicap
* Create a golf match by selecting a format, golf course, and players participating
* Select course tees that will be played
* Enter scores hole-by-hole and view adjusted scores based on personal course handicap, and handicap of each hole
* View scores being updated in real-time of all players participating in the match
* View points being updated in real-time based on the scoring format selected


## Tech
Parsuit was built with:
* [React](https://reactjs.org/) - frontend UI
* [Ant Design](https://ant.design/docs/react/introduce) - great React UI library with out of the box components
* [Firebase](https://firebase.google.com/docs/database/web/start) - backend with real-time database

## Installation

* `git clone https://github.com/vanwykjd/parsuit.git`
* `cd parsuit`
* `npm install`

After install, set up your Firebase db and import your Firebase project config information.

Then run `npm start` and go to http://localhost:3000 to see your running version.


## Firebase Configuration
Here's an overview on how to add Firebase to your personal project [Firebase Setup](https://firebase.google.com/docs/database/web/start)

* After initializing your Firebase real-time database, copy/paste the configuration info from your Firebase project's dashboard into one of these files
  * *src/components/Firebase/firebase.js* file
  * *.env* file
  * *.env.development* and *.env.production* files

The *.env* or *.env.development* and *.env.production* files could look like the following then:

```
REACT_APP_API_KEY="firebase_project_config_apiKey"
REACT_APP_AUTH_DOMAIN="firebase_project_config_authDomain"
REACT_APP_DATABASE_URL="firebase_project_config_databaseURL"
REACT_APP_PROJECT_ID="firebase_project_config_projectId"
REACT_APP_STORAGE_BUCKET="firebase_project_config_storageBucket"
REACT_APP_MESSAGING_SENDER_ID="firebase_project_config_messgingSenderId"
```

##### Firebase Database Structure
```
dbname-123dd
 |
  - matches
 |
  - rounds
 |
  - users
```

For further details on setting up a Firebase Databse with your project, here is a step-by-step [guide](https://github.com/vanwykjd/parsuit/blob/master/.firebase_setup/FIREBASE_SETUP.md)

## To-Do:
- [x] Enable user registration
- [x] Enable user sign-in/sign-out
- [x] Allow user to edit account
- [x] Create list of courses
- [x] Create list of scoring formats
- [x] Enable user to create a match
- [x] Enable user to add other users to participate in match
- [x] Enable user to select tees being played during match
- [x] Calculate course handicap for user
- [x] Calculate user strokes per hole
- [x] Enable user to enter hole-by-hole scores
- [x] Update user adjusted-scores in real-time
- [x] Enable user to view other player scores in real-time
- [x] Calculate points based on a scoring format (partially completed)
- [x] Enable user to view updated points in real-time
- [ ] Create Tests
- [ ] Add more courses
- [ ] Add more functions to calculate points for formats
- [ ] Enable users to create Tournaments/Events (Multiple related matches)
- [ ] Enable users create/join groups

## Code of Conduct
This project adheres to the [JS Foundation Code of Conduct](https://js.foundation/community/code-of-conduct). Please read the full text so that you can understand what actions will and will not be tolerated.

## How to Contribute
If your interested in contributing to this project, follow the guidelines given in the [CONTRIBUTING](https://github.com/vanwykjd/parsuit/blob/master/CONTRIBUTING.md) file.

