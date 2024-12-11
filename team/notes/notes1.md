## Team 1 Notes

### October 10, 2024
- Web app was planned:  
  - We will use George’s idea of creating **"Cherish"** or **"Calendar Cherish"**, a calendar app for tracking moods/feelings throughout the month.  
  - Users will rate each day with **bad, neutral, good, or great** and can also describe their day.  
  - Discussed potentially adding an **AI summary feature** where ChatGPT provides a summary of the week, month, or year.  
  - The UI of the app will be relatively simple to avoid overwhelming the user, making it enjoyable and engaging to use.

---

### October 13, 2024
- **Lab Pairings**:  
  - Niko → approve for George  
  - Robert → approve for Niko  
  - Sam → approve for Robert  
  - Jesse → approve for Sam  
  - Wacil → approve for Jesse  
  - Liam → approve for Wacil  
  - George → approve for Liam  
- **Documents**:  
    - Team notice board: [[Team 1 TODO list & Notices - Google Docs](https://docs.google.com/document/d/1OOzf3dmmh_CVmCohx0te0ylGrFNqM_zKLauUp24dtrQ/edit)]  
    - Project design: [[Team 1 Project Design - Google Docs](https://docs.google.com/document/d/1ehHval44NSs77hF-Ac3HVSdoiXW1KCFrzNtsSv_lAJk/edit)]
- Everyone should make changes on the **main branch** for milestone 2 (for now).

---

### October 14, 2024
- **Milestone 2 Pairings**:  
  - Robbie & Sam → UI diagram  
  - Sam & Wacil → data.md  
  - George & Niko → features.md (and assist with data.md)  
- **Role Assignments**:  
  - Robbie → Project Lead  
  - George → Task Manager  
  - Wacil → Documentation Lead  
  - Liam → Timekeeper  
  - Jesse → Notekeeper  
  - Niko → Quality Assurance  
  - Sam → Communication Lead  
- **Meetings**:  
  - Team agreed to meet **every Sunday at 3 PM**.
   
---

### October 18, 2024
- **TA Suggestions**:  
  - Check out the pre-existing app **"How We Feel"** for examples of similar implementations for our app.  
  - Consider supporting **multiple languages** (though not essential).  
- **Team Reflection**:  
  - Team agreed communication has been mostly okay but could be improved somewhat.
  - Jesse and Sam will complete the Figma diagram for Rabbies sketch of app UI
 
---

### October 20, 2024
- **Journal Page Discussion**:  
  - Niko believes the journal page is redundant.  
  - Merge **stat page** with **summary page**.  
  - Merge **journal page** with **day page**.  
  - Add a button in the **check-in page** to create a journal entry.  

- **Work-Time Tasks**:  
  - **Robbie**: Finishing data.md  
  - **Niko**: Waiting for commit  
  - **Sam**: Fixing UI  
  - **George**: Editing user.md  
  - **Liam**: Adding to problem.md

---

### October 27, 2024
- **Milestone 3 Planning**:  
  - Roughly planned out **Milestone 3**.  
  - Features breakdown and assigned points per feature in the `md` file.  
  - Design the main **calendar view** as the starting point and build off from there.  
  - Start with **calendar dashboard** and **day logging**.  
  - Begin basic design with an HTML/CSS template, then gradually transition to JavaScript.

- **Niko’s Skeleton Code**:  
  - `events.(event)`

- **Goals for the Week (aim for Thursday)**:  
  - Make individual branches/copy the repo into each team member’s local system.  
  - Assign components to team members:
    - **Day page**: Robert and Jesse  
    - **Journal page**: Robert and Jesse  
    - **Check-in**: Wacil  
    - **Main page**: George  
    - **Summary**: Liam and Sam  
  - Discuss which files should be associated with each component (by Monday).  
  - Work on HTML and CSS; gradually publish to the main branch.
---

### October 30, 2024
- **File Structure Decision**:  
  - Team decided to go with Robert’s file structure for the project, based loosely on Tim’s example code.  

---

### November 1, 2024
- **Progress Update**:  
  - Team is making good progress.  
  - Hoping to have started **IndexedDB** work by the next standup meeting.  

---

### November 3, 2024
- **Work Tasks for the Week**:  
  - **Robby**: Fix formatting for the day page and remove duplicate code; work with Wacil on storing the emotion onto the day page.  
  - **Liam**: Implement the `.js` file and make any tweaks with HTML and CSS with Sam.  
  - **Niko**: Implement navigation feature for buttons/pages.  
  - **Wacil**: Implement the `.js` file and make tweaks to HTML and CSS.  

---

### November 10, 2024
- **Work Tasks for the Week**:  
  - **George**:  
    - Worked on CSS.  
    - Collaborated with Niko on backend.  
  - **Wacil**:  
    - Finished JS file for the check-in page.  
    - Made a pull request.  
  - **Robert**:  
    - Worked on CSS and JS of day and journal pages.  
    - Updated `featured.md` file during meetings.  
  - **Niko**:  
    - Implemented persistent buttons.  
    - Got backend code working for date objects.  
  - **Sam**:  
    - Worked on summary page with Liam.  

- **Jesse's Questions**:  
  - The “Journal” button on the day page leads to an empty page; we should remove that button.  
  - Clicking the cancel button from the Journal page leads to the day page, which DOES show the date. However, clicking a date on the calendar leads to the day page, which does NOT show the date.  

- **TODO**:  
  - Work on the Journal page to get the current date to show up; it seems to be invisible, possibly a CSS issue.  
  - Update your reports file.  
  - Change word count to character count.  
  - Work on getting the scroll container on the day page working properly; test by adding objects.  
  - Change the day page to a horizontal view and add a way to delete emotions from the log.  
  - Branch off main.  
  - Create logic for getting the day rating and showing it on the day page.  
  - Team members should delete unused branches and update their report files.  
  - Members should review their commits and log them for the report file.  
  - Think about your top 3 commits to update the `roles.md` file (replace top 3 commits from milestone 2).  

---

### November 16, 2024
- **Team Tasks**:  
  - Double-checked `features.md`, `problem.md`, `roles.md`, and `user.md` files.  
  - Individually updated top-3 commits in `roles.md` (IMPORTANT).  
  - Discussed sequence diagrams and planned who would handle each diagram or how to approach them.  

---

### November 17, 2024
- **Reflections**:  
  - **Robert**:  
    - Implemented IndexedDB, fixed CSS, reduced code duplication, and optimized code.  
    - Reflections: Could have relied more on teammates and better divided labor as some features proved harder to implement, but hard work paid off. Satisfied with the project so far.  
    - Going forward: Notify the team if a feature is harder than expected.  
  - **Sam**:  
    - Finished summary page design and updated Figma.  
    - Reflections: Enjoyed collaborating with team members.  
    - Going forward: Start tasks earlier to reduce stress as a team.  
  - **Niko**:  
    - Worked on the Day page—implemented editing and deleting entries, and revamped CSS.  
    - Reflections: Enjoyed implementing persistent navigation buttons and learning from teammates’ coding styles.  
    - Going forward: Assign someone to bug fixing/QA for backend testing.  
  - **Liam**:  
    - Finished summary page.  
    - Reflections: Enjoyed integrating components.  
    - Going forward: Start tasks earlier.  
  - **George**:  
    - Worked on general CSS and sequence diagram.  
    - Reflections: Very pleased with app functionality.  
  - **Jesse**:  
    - Implemented dayRating, simplified code (added global `Emotions` object and global CSS class for header and date), and worked on CSS revamp (to be replaced with Niko’s code).  
    - Reflections: Emphasized professionalism.  
    - Going forward: Start tasks earlier and ensure communication to avoid redundant work.

---

### November 20, 2024
- **Team Reflection**:  
  - Team is somewhat stressed about the tight deadline of Milestone 4: Only 2 weeks to complete this task.  
- **Milestone 4 Requirements**:  
  - **ExpressJS**, **SQLite**, **Sequelize**.  
  - Each team member must implement 1 large feature they design and implement independently.  
  - The feature must support the front-end in some way or form.  

---
