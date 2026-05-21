# LaLink
LaLink is a deployed minimalist URL shortener that converts long links into clean, shareable short links. Built with a React + Vite frontend and a RESTful Express backend with MongoDB. Features URL validation and automatic normalization, Google OAuth authentication, toast-driven feedback, one-click copy functionality, and an animated background. Backend includes full CRUD endpoints, Upstash Redis for rate limiting and caching, and structured logging.

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

