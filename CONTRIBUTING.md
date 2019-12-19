# Contributing


### Team norms

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* When there are unresolvable conflicts, vote and follow the majority
* Using Slack to communicate
* Members are expected to respond to messages directed to them within 24 hours
* Being honest and transparent
* Showing empathy and being helpful towards other team members
* When someone has trouble finishing his/her work
	* he/she should communicate with the team
	* the team would discuess what to do next
	* reassign tasks and help that person out
* Definition of done
	* all code for each User Story must be peer-reviewed and pass automated tests before merging into the trunk

### Standups schedule

* Monday, Wednesday and Friday everyweek at courant
* Take less than 15 minutes
* Inform other team members beforehand if cannot not meet in person
* Standups can be done remotely via phone calls, but this should not happen too often
* Agenda
	* What did you do since the last standup, and is it finished
	* What you are working on now
	* What problems/blockers do you have, if any

### Git workflow

* Complete the tasks assigned you
* When done, put the task to the peer reveiw section in the task board
* At least one team member should take a look at it before marking it as done
* Commiting changes to branches and then making pull request to merge to the master branch

### To run the app:
	* Create a .ENV file under Backend folder with the following information
		* ATLAS_URI=mongodb+srv://test:scheduleNYU@clusterone-d3dzh.mongodb.net/test?retryWrites=true&amp;w=majority
		* NODE_ENV=development
	* npm install in both the backend folder and the frontend folder
	* npm start in both the Backend folder and the frontend folder
	* The address for the app is localhost:3000
