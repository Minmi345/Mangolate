# MangoLate
An web app to manage scanlate team.
Nowadays people that have a hobby of translating manga do not have specific way of managing. Mostly they use Excel sheets, or Notion, or Jira for that. That's why this project was created: friendlier User Interface and specialized for translating manga!

# For Developers
## Prerequisites
- node.js
- npm
- no database (for now)

## installation

When you install repo, try to run a command in **root** folder:
> npm run install-all

Also add **dotenv** file to backend folder and write inside **PORT=3000** and **MONGODBURI=xxx** 

## Commands

To run everything at the same time (write from the route folder):

> npm run all

To run backend:

> npm run backend

To run frontend:

> npm run frontend

To run eslint (done from frontend or backend folder):

> npm run eslint

## PreCommit rules
Before commiting, do not forget to run eslint! 
