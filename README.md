# Digital Chat

## Description
merns stack chat app with mern stack i make this app using rest api (polling) cannot handle real time updates.
It is “request-response”, so the server can only respond to a request. If a user sends a message to another user,
a REST API cannot automatically
notify the recipient as the recipient will not have requested that data if you interested see updated updated version 
that i use websockets to handle real-time updates #[digtal chat updated version](chatting)    

## Table Of Contents
- [Usage](#Installation-and-Usage)
- [Used Techs](#used-Techs)

## Installation-and-Usage
To get the project up and running locally:
1. Install [Node.js](https://nodejs.org/en/)
2. clone this repository by running in your cmd `git clone https://github.com/ELIASyASSER/chatApp.git`
3. now you will find two directories `frontend` and `backend` split your terminal and run `cd frontend` and in  second terminal run `cd backend` now run `npm install` in both of `frontend and backend directories`
4. you will find .env.example rename it to .env and replace variables inside it becasue i use OAuth2 with clerck
5. [see full documentation here how to know how to get these variables](https://clerk.com/blog/oauth2-react-user-authorization#get-your-google-client-id-and-secret) 
6. [now you will enter here to get your variables and put them](https://console.cloud.google.com/cloud-resource-manager)
7. finally run `npm run dev` in both `frontend` and `backend` direcotries
8. [open your browser  type](http://localhost:5173)
**if you want to publish this app to  github make sure to ignore node_modules and .env file because of secret data**   
## Used Techs 
- React
- React-router-dom
- Node.js
- Express
- mongooose
- Tailwind.css
- react-icons
  
## Contribution
if there any issue or features leave an issue i will consider it [Issue Page](issues/)
