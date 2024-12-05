## Contribution Log for Nikolay Ostroukhov

October 13, 2024

- **Task**: Plan out the design of our app with the team on Zoom. Review everyone's contributions to ensure we are following spec.
- **Details**: Discussed the functionality and design of the app. Discussed logistics of the project.
- **Link to Commit**: Initial Commit

October 14, 2024

- **Task**: Add features to m2\features.md
- **Details**: Documented the features our app will support. Assignments are still TBD.
- **Link to Commit**: https://github.com/rthurston1/Team01-Web-Application-Concept-Design/commit/14880d53801500d05fee2482b344c43f35d312c8

October 20, 2024

- **Task**: Discuss current status of project with team.
- **Details**: Met with Team on Zoom to discuss the status of the project.
- **Link to Commit**: N/A

October 20, 2024

- **Task**: Review users.md
- **Details**: Proof read users.md
- **Link to Commit**: N/A

October 21, 2024

- **Task**: Review roles.md
- **Details**: Fixed a couple of typos in the roles.md, specifically the links to a few commits
- **Link to Commit**: https://github.com/rthurston1/Team01-Web-Application-Cherish/commit/d076fa77ce1eb273a130c33e251261a2bbe34be4

October 31, 2024

- **Task**: Refactor the HTML and CSS to match the new architecture.
- **Details**: Reviewed Robbie's code and ported our HTML and CSS to the new structure/architecture.
- **Link to Commit**: https://github.com/rthurston1/Team01-Web-Application-Cherish/commit/c3eff89d31779496d44bd88176c786f26891142d

November 1, 2024

- **Task**: Review Robbie and Jesse's pull request.
- **Details**: Reviewed Robbie and Jesse's pull request for the day and journal pages and provided feedback. I also merged the pull request.
- **Link to Commit**: https://github.com/rthurston1/Team01-Web-Application-Cherish/commit/49f59ea7a235ebc58a3843af238552af6522e530

November 3, 2024

- **Task**: Review Liam and Sam's pull request.
- **Details**: Reviewed Liam and Sam's pull request for the summary page and provided feedback. I also merged the pull request.
- **Link to Commit**: https://github.com/rthurston1/Team01-Web-Application-Cherish/commit/0e2de36874f9c024282495f460272a00c9257d7a

November 3, 2024

- **Task**: Review Robbie's pull request.
- **Details**: Reviewed Robbie's pull request for custom issue templates. I also merged the pull request.
- **Link to Commit**: https://github.com/rthurston1/Team01-Web-Application-Cherish/commit/73c4e3053f584b75159c9722cfb212e3a8d37883

November 3, 2024

- **Task**: Review Wacil's pull request.
- **Details**: Reviewed Wacil's pull request for the check in page. I also merged the pull request.
- **Link to Commit**: https://github.com/rthurston1/Team01-Web-Application-Cherish/commit/ee51850c68a966c66bffb3e0bbfff9f0f361f6e5

November 6, 2024

- **Task**: Start work on the global navigation feature.
- **Details**: Created a new branch for the global navigation feature issue called `feature-buttons-component-niko`. Refactored the HTML and CSS to include the global navigation bar. Added the global navigation bar to the journal, summary, and check in pages.

- **Links to Commits**:
  - [Commit 1](https://github.com/rthurston1/Team01-Web-Application-Cherish/commit/2fdd64e451c18812953543aa26c8d670850c697a)
  - [Commit 2](https://github.com/rthurston1/Team01-Web-Application-Cherish/commit/f0afe6238031d1e9e13c9e2f15cdfe1005537cc3)
  - [Commit 3](https://github.com/rthurston1/Team01-Web-Application-Cherish/commit/4a38e0c779491ea3250ee69b16b55e60f1baf657)
  - [Commit 4](https://github.com/rthurston1/Team01-Web-Application-Cherish/commit/d6e20fe49299e7b8b9edf6d944930387b9aa8d16)

November 8, 2024

- **Task**: Create a pull request for the global navigation feature.
- **Details**: Created a pull request for the global navigation feature. I also added screenshots of the global navigation bar to the pull request.
- **Link to Pull Request**:
  - [Pull Request](https://github.com/rthurston1/Team01-Web-Application-Cherish/pull/36)

November 10, 2024

- **Task**: Implement the click functionality for the days in the calendar.
- **Details**: New branch: `feature-main-page-clickable-calendar-niko`. Added click functionality to the days in the calendar. When a day is clicked, the user is redirected to the day page for that day. Also added a hover effect to the days in the calendar. Refactored the div creation code from direct html to javascript. Each click on a day passes the day's date to the day page.
- **Links to Commits**:

  - [general: remove old files in calendar directory](https://github.com/rthurston1/Team01-Web-Application-Cherish/commit/f02f666641eefa5a568e7211f542e011d2d94880)
  - [CalendarComponent.js: refactor div creation for the calendar days](https://github.com/rthurston1/Team01-Web-Application-Cherish/commit/da6ece0a68a491c7cc5f537b62edc839501dfb34)
  - [stylesCalendar: add some hovering css styles to the day divs](https://github.com/rthurston1/Team01-Web-Application-Cherish/commit/0a43318f0c1a1ee6b36b60c5f5e9bfc3e7c7f671)

November 10, 2024

**Task**: Review old branches and clean up the repository.
**Details**: Reviewed old branches and cleaned up the repository. Deleted branches that were no longer needed. The following branches were deleted: `feature-buttons-component-niko`, `georgeAndNiko-MainPageEdits`, `niko-front-end-starter`, `george-niko-mainpage`.
**Link to Commit**: N/A

November 10, 2024

**Task**: Review Wacil's pull request.
**Details**: Reviewed Wacil's pull request for the check in page. I left a comment regarding the merging of Robbie's branch which caused too many files to be changed at once. I requested that Wacil created a new branch from main and submitted his changes there.
**Link to Pull Request**: [Pull Request](https://github.com/rthurston1/Team01-Web-Application-Cherish/pull/39)

November 11, 2024

- **Task**: Refactor navigation component from a class to a script.
- **Details**: Created new branch `experimental-navigation-niko`. Refactored the navigation component from a class to a script to decouple it from the base component. The base component class is more suited for pages.
- **Link to Commit**: [Commit](https://github.com/rthurston1/Team01-Web-Application-Cherish/commit/fdf109f8186408fe81764324cbeed22c19f3052f)

November 12, 2024

- **Task**: Create pull request from experimental-navigation-niko branch.
- **Details**: Created a pull request for the experimental-navigation-niko branch.
- **Link to Commit**: [Commit](https://github.com/rthurston1/Team01-Web-Application-Cherish/commit/529be60ef997c2ac9de6ee2a1a7f9140d3ba559e)

November 14, 2024

- **Task**: Look into issue #60 and create a branch for it.
- **Details**: Created a new branch `bugfix-date-id-formatting-niko` to address issue #60. The issue is about changing the dataset id format from two year digits to four year digits.
- **Link to Commit**: [Commit](https://github.com/rthurston1/Team01-Web-Application-Cherish/commit/781a5234d71c42bc4956a5d6088e8d109208afc6)

November 14, 2024

- **Task**: Replace the stats button with a button to today's day page.
- **Details**: Swapped out the stats button with a button that redirects to today's day page. The button is located in the global navigation bar. Refactored a class name and button ids inside nav.js.
- **Link to Commit**: [Commit](https://github.com/rthurston1/Team01-Web-Application-Cherish/commit/479eea30b04ae69417a92307edf8feb8a77bf72e)

November 15, 2024

- **Task**: Create new branch for issue #67 and start working on the edit/delete buttons for the day page.
- **Details**: Created a new branch `feature-edit-emotion-log-niko` and `feature-edit-emotion-log-niko-2` to bring branch up to main without merging, potentially introducing css conflicts. Added edit and delete buttons to each emotion log entry on the day page.

November 16, 2024

- **Task**: Create a pull request for the edit/delete buttons on the day page.
- **Details**: Created a pull request for the edit/delete buttons on the day page.
- **Link to Pull Request**: [Pull Request](https://github.com/rthurston1/Team01-Web-Application-Cherish/pull/84)

November 16, 2024

- **Task**: Create sequence diagram of the global navigation menu.
- **Details**: Created a sequence diagram of the global navigation menu. The diagram shows the flow of events when a user interacts with the global navigation menu. The diagram is located in the `team/m3/nikolay-ostroukhov/feature-sequence-diagram.md` file.
- **Link to Commit**: [Commit](https://github.com/rthurston1/Team01-Web-Application-Cherish/pull/86/commits/7916f4c3b955b20473b777cf9b07c20c2c1a79ba)

November 17, 2024

- **Task**: Revamp css of the entire app for resizable windows and more consistent styling.
- **Details**: Created a new branch `css-niko` to revamp the css of the entire app. The goal is to make the app more responsive and consistent across different screen sizes.
- **Link to Commit**: [Commit]()

December 4, 2024

- **Task**: Implement the remote service.
- **Details**: Created a new branch `126-104-medium-task-implement-remote-service` to implement the remote service. The remote service is responsible for fetching and sending data to the server. The remote service is used by the front end to fetch and send data to the server.
- **Link to Commit**: [Commit]()
