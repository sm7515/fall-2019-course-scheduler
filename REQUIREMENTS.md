# Requirements  
---
## End User Observation  
---
### Mia Karnstein  
Age:18  
Address: 20 W 34th St, New York, NY 10001  
Background story: Grew up in NYC, doesn't like technologies. Firmly believes that she is a vampire  
School: NYU  
Occupation: Student  
Challenges: Wants to use a phone app to tap into buildings but she has unreliable internet connection, so she needs to be able to access her ID offline  
Solution: Provide an offline version of the app that allows Mia to tap into buildings offline  
  
### Eva Roux  
Age 21  
Address: 1600 Pennsylvania Ave NW, Washington, DC 20500  
Background story: Grew up in Washington DC, wants a career in business  
School: NYU Stern  
Occupation: Student  
Goal: Make sure no one that is not a stern student is still in Stern building past 10pm  
Solution: Integrate a warning system in the app so that if you are not a stern student and you are in the stern building you will receive a text message at 10pm  
  
### Emily Sue  
Age 19  
Address: 110 E 14th St, New York, NY 10003  
Background Story: Grew uo in new york,dormed at NYU and is forced to get a meal plan that she can not use up  
School: NYU  
Occupation: Student  
Goal: wants an easier alternative to the existing NYU campus cash, where she has to get her id card out of backpack and then put it back  
Solution: Integrate Campus Cash with phone app so students can tap their phones instead  
  

## Use cases
### Use case descriptions
1. Sign up/Register
   - Actor: NYU community members, NYU email
   - Scenario: The user needs to fill in the personal data required. If all data are accepted, the NYU email the person entered will receive the verification email. After the user clicked on the verification link, the new account will be set up. If the verification failed or the user entered invalid information, the page will display errors.


2. Tap into an NYU building
   - Actor: NYU Students and faculties, NYU buildings
   - Scenario: When the actor wants to enter an NYU building, he or she will take out his/her phone, unlock the screen, and tap the phone on the chip reader to enter the building. Tapping in will trigger the card reader and open the door to the building. If the students don’t have permission to enter a specific building, an error notification would appear on the actor’s screen.
   - Precondition: user is logged in to their mobile ID account


3. Log in
   - Actor: NYU community members
   - Scenario: The actor types in their net ID and their password. If the password is correct, he/she will be logged into his/her mobile ID account. If the password is incorrect, an error message will be displayed and he/she needs to log in again.


4. Pay with mobile ID
   - Actor: NYU community member, NYU internal transaction system
   - Scenario: When the actor is ready to checkout in the dining hall, he/she will take out his/her phone and tap on the card reader to pay. If there is sufficient amount to pay, the amount will be deducted. Otherwise an error will be displayed.
   - Precondition: user is logged in to their mobile ID account.
5. Log out
   - Actor: NYU community members
   - Scenarios: When the user is logged into their mobile NYU ID account, he/she can click on the logout button and there will be no valid NYU ID displayed on the app.
   - Precondition: user is logged in to their mobile ID account.

### Use case Diagram
![use case diagram](./requirement_pics/use_case.png)

## Domain Modeling
![domain modeling](./requirement_pics/domain_modeling.png)
