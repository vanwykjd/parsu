# Welcome to Parsuit!

###Thank you for your interest in the project!  

If you are interested in making contributions or unsure of how to get started, here are some guidelines to help you through the process.


### But first — Help us, help you...help us?

Wait, what?... In other words, by following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.

### Ways to contribute:

If you are looking for an idea on a way to contribute, take a look at the [To-Do](https://github.com/vanwykjd/parsuit#to-do) section in the [README](https://github.com/vanwykjd/parsuit#parsuit) file, or checkout the [Open Issues](https://github.com/vanwykjd/parsuit/issues) for the project. 

If you have an idea for a new feature, submit it in the project's [Issues](https://github.com/vanwykjd/parsuit/issues) with a "Feature" label, along with a brief description, and any idea's on how it would be implemented.

**Not all contributions need to be code!** You can add some documentation, add a new golf course,  report a bug, or simply fix a typo! 


### How to contribute:

1. Fork the project.
1. Create/Config a new Firebase project.
1. Create a feature branch.
1. Make your changes.
1. Run the app locally
1. Run the tests.
1. Push your changes to your fork/branch.
1. Open a pull request.

### 1. Fork

1. Click the fork button up top.
1. Clone your fork locally (Notice that git's `origin` reference will point to your forked repository).
1. It is useful to have the upstream repository registered as well using: `git remote add upstream https://github.com/vanwykjd/parsuit.git` and periodically fetch it using `git fetch upstream`.

###2. Firebase Setup/Config

This project is set up to utilize a real-time Firebase database. To be able to view live version of your forked repo, you need to set up a personal Firebase database. Here's an overview on how to add Firebase to your personal project [Firebase Setup](https://firebase.google.com/docs/database/web/start)

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

Once you have a your forked repo configured with your personal Firebase project, you may need to run `npm install` to ensure all dependencies are up to date. 


### 3. Create a feature branch

Create and switch to a new feature branch: `git checkout -b {branch_name} upstream/master`  
(replace `{branch_name}` with a meaningful name that describes your feature or change).

### 4. Make your changes

Now that you have a new branch you can edit/create/delete files. Use touch-up commits using `git commit --amend`. (You may use git force push after that).

### 5. Run the app locally

- Install the dependencies: `npm install`.
- Start the local development server: `npm start`.

### 6. Run the tests  *(more to be added)*

- Run tests: `npm test`.

### 7. Push your changes to your fork/branch

After tests pass, push the changes to your fork/branch on GitHub: `git push origin {branch_name}`. For force push, which will destroy previous commits on the server, use `--force` (or `-f`) option.

### 8. Create a pull request

Create a pull request on GitHub for your feature branch.