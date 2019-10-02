Product Backlog
=========================================================

**User Stories**
1. As an NYU student/faculty, I want to register into the system so that I can upload my physical NYU card onto my phone.

2. As an NYU student/faculty, I want to login into the system, so that I can access my virtual NYU card.

3. As an NYU student/faculty, I want to use my virtual NYU card so that I can swipe into the building.

**Spikes**

1. Learning about NFC chips and magnetic signals on phones. In order to simulate the chips on the physical NYU cards, we need to figure out how to emulate that process with magnetic signals. Based on cursory research, we would employ the use of similar technologies that google and apple pay have implemented. More research would have to be done on Magnetic Secure Transmission and Near Field Communication and any libraries that help with the translation.

2. Environment setup. Most likely we would use reactjs for the front-end and nodejs with express as the backend. The setup would be simple as there are tools to setup a develop environment.

3. Learning react and node. 

**Acceptance Criteria**

1. Register
    NYU student/faculty register with their NYU email and a password
    NYU student/faculty verify with their email to activate account
    Once verified, the student can upload their physical NYU card info and store it onto their local phone.
2. Login
    NYU student/faculty login with their NYU email and password
    NYU students can change information about account and pull up virtual NYU card
3. Swiping 
    NYU student/faculty takes phone out 
    NYU person goes on program
    NYU person can place phone on scanner and enter building

**Estimation of Work**

System of Rank: 1-100. 1 Easy and 100 Hard

1. Register Function 
    Difficulty: 60
    Reason: Setup database, backend server, register page. When an NYU student wants to register, we present a page and write their information to the database. Then, we would want to verify their email. Finally, take their physical card and upload it to their account.
2. Login Function
    Difficulty: 10
    Reason: When login, pull information from info from database
3. Swiping 
    Difficulty: 45
    Reason: When a NYU student/faculty taps into a building, the program converts the chip from the physical card into a magnetic waves that the building reader can read. When swiping we would have to convert their card information to magnetic waves.

    

    
