# Cherish App
![image](https://github.com/user-attachments/assets/efb6252e-accd-41c4-a57a-1e2f4ba350a3)

In this README file, you will find a summary of what the Cherish App is all about and a brief explanation of all things we have acheived in each milestone. We will also list out all the requirements you will need in order to run this app in your local machines.

## Instructions to run the app

1. Clone the github repo into your VS code.
2. Once its cloned, make sure you are in the main branch. Open up a terminal and run `npm install`.
3. Once the node files have been installed, run `npm run start-server` to run the server. Then open a browser window and visit `localhost:3000`. The default username is `user` and the default password is `pass`. 

## Milestone 1

For M1, we formed our group of 7 members: Anugrah George, Nikolay Ostroukhov, Robert Thurston, Jesse Goldman, Samuel Hernandez, Wacil Voiltaire, Liam Campbell. We decided to use discord as our communication platform and we started off to brainstorm ideas of our project. Each member brought specifc skills to accomplish this project. We finally

## Milestone 2 - Web Application Concept and Design

For M2, we came up with the idea for our project - Cherish. The app is very similar to most of the journal / mood tracking apps you see today where the users can log in their emotions or journal and the app will give certain feedbacks that help their users for their mental health. During this milestone, all of our members collaborated on their team member reports and how they can contribute towards the development of this app. We also sketched our front end design through Figma and figured out all the interactive functions and pages users can utilize.

## Milestone 3 - Front End Design

For M3, we began bringing our app to life starting with the front end. We used the Figma design which was helpful in visualizing what the app should look like. We created our important components and made sure each page has its own components that could talk to other pages as well.

## Milestone 4 - Back End Design

For M4, we assigned a lot of features to ourselves to add functionality to our app but not limited to teamwork. Here you will find what each member mostly worked on:

1. Calendar Streak: **George** brought up this feature proposal where the calendar page shows you how many days in a row the user has been logging in their emotions/journal entries. Each day will be underlined if the user has at least 1 entry logged in. This will be useful as most users today love the idea of keeping a streak, encouraging them to track their feelings.

2. Daily motivational quote: **Samuel** This feature proposal allows the user to stay motivated through the longevity of use with our app. There has been a new function created called fetchquote which is the one in charge on making this feature possible. An API functionality has also been implemented which gets the motivational quotes and their proper author.

3. Gemini AI Summary & General Backend Implementation: **Nikolay** For milestone 4 I spent most of my time working on the back end implementation, where most of the code I wrote went to the Day Controller, Remote Service, and the SQLite model. While the backend implementation ultimately was not completed (saving emotions is borked), I was able to get the Gemini AI summary feature working. This feature reads the user's data and generates a summary of their mood and journal entries. At the time of implementation I was able to get the feature working with mock data and should theoretically work with real data once the backend is fully functional. The biggest hurdle for me on the backend was working with our original codebase and trying to get it to work with the new features, and lots of time was spent debugging niche issues.

4. EmotionTrendAnalysis in SummaryComponent.js & restoreUserData in RemoteService.js implementation: **Jesse** For this milestone, I came up with the idea to add a feature to the summary page which computes & displays emotion trend data for the user depending on a user-selected date range. Upon successful login, the username is stored in main.js and retrieved using the getUsername function which is imported into the RemoteService. The username is used in RemoteService.js to fetch all user data from the server via the restoreUserData method, which sends a request to the /v1/days/:username endpoint. This request is routed through DayRoutes.js and handled by the DayController,which retrieves the user's data from the database The SummaryComponent then calls DATABASE.restoreUserData to get and process this data for trend analysis based on the user-selected date range. 
