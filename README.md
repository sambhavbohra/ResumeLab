# ResumeLab

ResumeLab is a full stack AI assisted resume builder. The client is a React + Vite single page application styled with a shared CSS variable palette. The backend is an Express API backed by MongoDB, with OpenAI powered endpoints for enhancing resume content and extracting data from uploaded resumes.

## Features
- Guided multi step resume builder with live preview templates (Classic, Minimal, Modern, Minimal with image)
- Authenticated dashboard to create, rename, delete, and manage public visibility of resumes
- Resume upload ingestion that extracts structured data using OpenAI
- AI helpers for professional summary and job description enhancements
- PDF upload support that converts PDFs to text on the client (react-pdftotext)
- Responsive marketing home page with navigation, testimonials, and CTA sections

## Tech Stack
- **Frontend:** React 19, Vite, React Router, Redux Toolkit, React Redux, Axios, Tailwind utilities, React Hot Toast, Lucide icons
- **Backend:** Node.js, Express, MongoDB (Mongoose), JSON Web Tokens, bcrypt, Multer, ImageKit, OpenAI SDK
- **Tooling:** ESLint, Nodemon, npm

## Project Structure

```
client/            # React app
	src/
		app/           # Redux store and slices
		components/    # Reusable components and templates
		pages/         # Route level pages
		configs/       # Axios instance and helpers
server/            # Express API
	configs/         # Database, OpenAI, ImageKit configs
	controllers/     # Route handlers
	middlewares/     # JWT auth middleware
	models/          # Mongoose schemas
	routes/          # Express routers
```

## Prerequisites
- Node.js 18+ (matches Vite and OpenAI SDK requirements)
- npm (ships with Node.js)
- MongoDB Atlas or self hosted MongoDB cluster URL
- OpenAI compatible API credentials (key, base URL, and model name)
- ImageKit account (optional: required only if profile image uploads are enabled)

## Environment Variables

Create two env files:

**client/.env**

```
VITE_BASE_URL=http://localhost:3000
```

**server/.env**

```
PORT=3000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster-url
JWT_SECRET=replace-with-secure-random-string
OPENAI_API_KEY=sk-...
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini
IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
```

Notes:
- `MONGODB_URI` should not include the database name; it is appended automatically as `resume-builder`.
- `IMAGEKIT_PRIVATE_KEY` is required when image uploads are enabled. Leave it unset if you have disabled that feature.

## Installation

```bash
git clone https://github.com/sambhavbohra/ResumeLab.git
cd ResumeLab

# install client dependencies
cd client
npm install

# install server dependencies
cd ../server
npm install
```

## Local Development

In two terminals run the API and client:

```bash
# Terminal 1
cd server
npm run server        # starts nodemon with live reload

# Terminal 2
cd client
npm run dev           # starts Vite dev server on http://localhost:5173
```

Login and register flows share the same route with `?state=login` or `?state=register`. The client expects a JWT token in local storage under the key `token`.

## Production Build

```bash
cd client
npm run build

cd ../server
npm start
```

Vite outputs static assets to `client/dist`. You can deploy the frontend separately (for example on Vercel or Netlify) and point it to the hosted API URL via `VITE_BASE_URL`.

## Deployment Notes
- **Backend (Render):** set the service root to the repository root and use `cd server && npm start` as the start command. The server listens on the port supplied by Render through `PORT`.
- Ensure all server environment variables are configured in Render. Missing `models/user.js` errors typically come from case sensitivity; the file name is lowercase on the server (`user.js`).

## API Overview
- `POST /api/users/register` – create account (name, email, password)
- `POST /api/users/login` – authenticate and receive JWT
- `GET /api/users/data` – fetch current user (protected)
- `GET /api/users/resumes` – list resumes for authenticated user
- `POST /api/resumes/create` – create a new resume entry
- `PUT /api/resumes/update` – update resume content and optional avatar upload
- `DELETE /api/resumes/:resumeId` – delete a resume
- `GET /api/resumes/public/:resumeId` – fetch a public resume by id
- `POST /api/ai/enhance-pro-sum` – improve professional summary text
- `POST /api/ai/enhance-job-desc` – improve job description entries
- `POST /api/ai/upload-resume` – parse uploaded resume text into structured data

All protected routes require an `Authorization` header with the JWT token value.

## Styling Notes
- Global colors are defined in `client/src/index.css` as CSS variables (`--textdark`, `--textlight`, `--gradientend`, etc.). Components should use these variables for consistent theming.

## Troubleshooting
- **`ERR_MODULE_NOT_FOUND ../models/user.js` on Linux/Render:** ensure the model file is named `user.js` (all lowercase).
- **`Missing required fields`:** Verify that the client passes all required form fields before calling the API.
- **MongoDB connection failures:** confirm `MONGODB_URI` excludes the database name and includes credentials.

## Contributing
1. Fork the repository and create a feature branch.
2. Make your changes and ensure linting passes (`npm run lint` in the client).
3. Submit a pull request with a clear description of the change.

