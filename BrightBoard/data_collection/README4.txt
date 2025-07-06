README4.txt - Data Collection Scripts for BrightBoard
=====================================================

This directory contains scripts used to seed and extract data from the BrightBoard MongoDB database. These tools are intended for development and testing purposes only.

-----------------------------------------------------
📁 Folder Structure:
-----------------------------------------------------

data_collection/
├── seed/
│   ├── seedUsers.js         -> Inserts sample instructor and student accounts.
│   ├── seedCourses.js       -> Inserts sample courses.
│   ├── seedLessons.js       -> Adds lessons to existing courses.
│   ├── seedQuizzes.js       -> Adds quizzes linked to lessons.
│   └── seedAll.js           -> Runs all seed scripts in order.
│
├── scripts/
│   ├── exportUsers.js       -> Exports user data to a JSON file.
│   └── scrapeCourses.js     -> Scrapes public course data for testing.

-----------------------------------------------------
🔧 Setup Instructions:
-----------------------------------------------------

1. Ensure MongoDB is running or that your `.env` file is correctly configured with a working MONGO_URI.

2. Navigate to the root of the project or the `data_collection/` directory.

3. Install dependencies (if needed):
   > npm install dotenv mongoose axios

-----------------------------------------------------
▶️ Running Scripts:
-----------------------------------------------------

Seed Users:
> node data_collection/seed/seedUsers.js

Seed Courses:
> node data_collection/seed/seedCourses.js

Seed Lessons:
> node data_collection/seed/seedLessons.js

Seed Quizzes:
> node data_collection/seed/seedQuizzes.js

Run All Seeds:
> node data_collection/seed/seedAll.js

Export Users:
> node data_collection/scripts/exportUsers.js

Scrape Sample Courses:
> node data_collection/scripts/scrapeCourses.js

-----------------------------------------------------
⚠️ Notes:
-----------------------------------------------------

- These scripts are intended only for local development or staging environments.
- Seeding scripts may delete or overwrite existing records.
- Ensure backups or caution before running on production databases.

-----------------------------------------------------
📄 Author:
-----------------------------------------------------
BrightBoard Team – 2025