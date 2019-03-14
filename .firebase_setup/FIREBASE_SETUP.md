# Setting up a Firebase database for your project:

If you don't have a Firebase account already, then your first step overall would be to create one... But once you have an account set up, here is a step by step guide on how to create/add a Realtime Database to your project.

### 1. Add Project:

In your account dashboard, select 'Add project'
<img src="/.firebase_setup/fb_db_1.png" alt="Add project" />

### 2. Create Project:

Under 'Project name', create your personal name for the project, then select 'Create project'.
<img src="/.firebase_setup/fb_db_2.png" alt="Create project" />

### 3. Enable Authentication:

Once you have created a new project, select 'Authentication' under the dashboard menu options.
<img src="/.firebase_setup/fb_db_3.png" alt="Enable auth" />

### 4. Set up sign-in method:

After selecting the 'Authentication' menu item, select 'Set up sign-in method'.
<img src="/.firebase_setup/fb_db_4.png" alt="Sign-in method" />


### 5. Select Email/Password:

Once you are brought to the list of 'Sign-in providers' select 'Email/Password'.
<img src="/.firebase_setup/fb_db_5.png" alt="Email provider" />


### 6. Enable Email/Password:

Click the toggle to 'Enable' the Email/Password method and click 'Save'.
<img src="/.firebase_setup/fb_db_1.png" alt="Enable email" />

### 7. Choose Realtime Database:

After you've set up the sign-in method, scroll down in your project dashboard until you see 'Choose Realtime Database', and click 'Create database'.
<img src="/.firebase_setup/fb_db_7.png" alt="Create db" />

### 8. Select 'test mode':

To start, select 'Start in test mode' and then select 'Enable'.
<img src="/.firebase_setup/fb_db_8.png" alt="Select mode" />

### 9. Open 'Web setup':

Once you have created the Realtime Database, go back to the 'Authentication' page in your project dashboard, and select 'Web setup' in the top right of the page.
<img src="/.firebase_setup/fb_db_9.png" alt="Web setup" />

### 10. Copy config info:

The box that appears on your screen contains the API config information you need add into your project. Copy the information and add it to a file within your Forked repo.
<img src="/.firebase_setup/fb_db_10.png" alt="Config info" />

### 11. Adding config to project:

The final step to making your project work with firebase is adding the config information to your personal repo. Since you don't want your personal API to available for everyone to see, it is best to create a '.env' file within your root directory, and create your own environment variables containing the config info provided.


And that's it! Congrats on setting up your project with a Firebase Realtime Database!