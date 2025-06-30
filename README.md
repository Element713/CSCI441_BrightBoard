# CSCI441_BrightBoard

current deployment details
$ npm run build

> build
> react-scripts build

Creating an optimized production build...
Compiled successfully.

File sizes after gzip:

  76.49 kB  build\static\js\main.03ea4e6a.js
  2.61 kB   build\static\js\488.f0c78775.chunk.js
  1.25 kB   build\static\css\main.fb102c23.css

The project was built assuming it is hosted at /.
You can control this with the homepage field in your package.json.

The build folder is ready to be deployed.
You may serve it with a static server:

  npm install -g serve
  serve -s build

Find out more about deployment here:

  https://cra.link/deployment



This folder contains all source code for the BrightBoard system.

To run the system:
1. Open a terminal in the project root.
2. Run: npm install
3. Start the backend:
   cd server
   npm install
   npm start
4. Start the frontend:
   cd ../brightboard-frontend
   npm install
   npm start

Make sure MongoDB is running and .env file is configured.