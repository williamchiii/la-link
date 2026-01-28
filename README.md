# LaLink
LaLink is a deployed minimalist URL Shortener built using the MERN stack that converts long links into clean, shareable short links. Features URL validation and automatic normalizatiom, toast-driven feedback, one-click copy functionality, etc. Built using a react frontend. RESTful Express backend with full CRUD endpoints and integrated Upstash Redis for rate limiting to prevent abuse. 

## Install Instructions
0. Make sure to have all the dependencies (also check .env.example)
   
1. Clone the repo 
```bash
git clone https://github.com/williamchiii/la-link.git
```
2. Navigate to cloned folder

```bash
cd la-link
```
3. Backend setup

```bash
cd backend
npm install
npm run dev
```

4. Frontend setup
```bash
cd frontend
npm install
npm run dev

