Disha (LevelUp Learning)

Making every child's learning level visible, so every child can climb.

Disha is a mobile-first, offline-capable web app for Indian primary schools (Class 1 to 5). It shows teachers each child's actual learning level, automatically groups children by level instead of grade, and shares progress with parents in a form that does not require literacy. It is built for the Hack2Skill "Learning Level Visibility" challenge and follows the Teaching at the Right Level (TaRL) approach used by J-PAL and Pratham.

Disha means "direction" in Hindi: the way from where a child is to where they can be.

The problem
Children are promoted every year, yet many cannot read a simple word like "TREE".
Class 1 to 5 often share one room and one teacher. Frontline reports this affects roughly 40 to 90 percent of state-run primary schools.
There are no multi-level classrooms, teachers are in short supply, many families cannot support learning at home, and many children have had no preschool.
Root cause: nobody can easily see the real level of each child.
What Disha does
Problem	Disha's answer
Promoted without learning	Tap-based level assessment (EGRA/EGMA-style) records each child's real level
Five grades, one classroom	Auto-groups by level so one teacher can run targeted groups
No multi-level teaching	TaRL session suggestions matched to each group
Teacher shortage	Live virtual classes and volunteer-friendly group plans
Families cannot support	Picture-based parent cards, shareable on WhatsApp
No preschool foundation	A starter level and play-based home activities
Levels stay invisible	Level cards, traffic-light dashboard, one-page reports
Features
Teacher view
Class roster: name, grade, section, optional photo.
Tap-based assessment: big buttons and icons, no typing in the core flow.
Auto-grouping: for example "Group A: Story readers", "Group B: Word level", "Group C: Letters only", refreshed after every new assessment.
Traffic-light dashboard: red (beginner), yellow (developing), green (grade-level).
Progress tracking: termly re-assessment with a before and after comparison.
One-page class summary: auto-generated, printable and shareable for the headmaster or district officer.
Live classroom: create a classroom with multiple students, start a live class, share work and assignments, and take questions.
Student and parent view
Growing-plant profile: seedling to tree, shown with icons and colours.
"What your child can do now": one plain-language line generated from the level.
Home practice cards: picture-based activities matched to the level.
WhatsApp-shareable image or summary.
Ask-a-question button and a class chat group during live sessions.
Subject-wise ability check: Maths, EVS, Science, Hindi and English, 20 questions each, with a problem-solving rank.
Learning levels
Literacy	Numeracy
1. Beginner (no letter recognition)	1. Number recognition
2. Letters	2. Single-digit addition and subtraction
3. Words	3. Double-digit operations
4. Simple sentences	4. Simple word problems
5. Story with comprehension	

Level design draws on the CBSE Foundational Literacy and Numeracy toolkit and question banks, ASER, EGRA and EGMA.

Platform
Offline-first: data saved on the device and synced when a connection is available.
Mobile-first, large tap targets, readable in bright outdoor light.
Languages: English, Hindi, Odia and Kannada (structure ready; translations in progress).
Sign-in: Google, Microsoft and Outlook accounts via Firebase Authentication, with persistent sessions.
Security: role-based access, encrypted data in transit and at rest, encrypted live video.
Tech stack
Frontend: React, Tailwind CSS
Storage: browser local storage (structured to move to a backend)
Backend services: Firebase (Authentication, database, storage)
Live classes: WebRTC-based video
Icons: Phosphor Icons or Lucide (rounded style)
Fonts: Baloo 2 for headings, Inter for body text
Design language

Warm, optimistic growth metaphor (sapling, sunrise, ladder). Palette: saffron 
#F4A340, teal 
#1F7A5C, cream 
#FFF8EE, coral accent 
#E8734A. Rounded corners, soft shadows, no dense tables in the teacher flow.

Data model
Entity	Fields
Students	id, name, grade, class/section
Assessments	student_id, date, literacy_level, numeracy_level, assessed_by
Groups	Auto-computed from each child's latest assessment
Aggregate stats	% of students per level, per class, per term
Getting started

These steps assume a standard Node.js and npm setup. Adjust the commands to match this repository's package.json.

bash
# clone
git clone https://github.com/ARIENPRANWIT/disha.git
cd disha

# install dependencies
npm install

# start the development server
npm run dev
Firebase setup
Create a project in the Firebase console.
Enable Authentication and turn on the Google and Microsoft providers.
Create a database and set security rules so each class is readable only by its own teacher and students.
Copy your web app config into a .env file (never commit it):
env
# variable names depend on your build tool; these assume Vite
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
Security and privacy
Sign-in through Firebase Authentication; sessions persist so users do not log in repeatedly.
Data is encrypted in transit (TLS) and at rest in Firebase.
Access is role-based (teacher, student, parent) and limited to a user's own classes.
Live video uses encrypted WebRTC media. For true end-to-end encryption, use WebRTC insertable streams; note that Firebase itself does not provide end-to-end encrypted video.
Child data is kept minimal and consent-based, in line with India's Digital Personal Data Protection Act, 2023.
Roadmap
 Teacher assessment and auto-grouping flow
 Dashboard and parent view
 Google, Microsoft and Outlook sign-in
 Hindi, Odia and Kannada translations
 Subject-wise quizzes and problem-solving rank
 Live classroom, assignments, ask-question and chat
 End-to-end encrypted live video
 District and state rollup dashboards

Update the checkboxes to match the current state of the code.

Ideas beyond the first version: voice-based reading check, WhatsApp progress bot, peer buddy reading, volunteer tutor mode, Anganwadi readiness module.

References
J-PAL and Pratham: Teaching at the Right Level
ASER (Annual Status of Education Report)
EGRA and EGMA toolkits (Early Grade Reading and Mathematics Assessments)
CBSE Foundational Literacy and Numeracy assessment toolkit and question banks
Contributing

Issues and pull requests are welcome. Please keep the core teacher flow tap-only, mobile-first and usable offline.

License

Add a license (for example MIT) before publishing, and update this section.

Acknowledgements

Built for the Hack2Skill "Learning Level Visibility" challenge.
