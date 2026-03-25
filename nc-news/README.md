# The Digest — Frontend

A Reddit-style news and media aggregation platform built with React and Vite.

**Live site:** [https://the-digest.netlify.app](https://the-digest.netlify.app)
**Backend repo:** [NC News Backend](https://github.com/3llasious/nc-news-frontend.git)
**API base URL:** [https://nc-backend-solosprint.onrender.com/api](https://nc-backend-solosprint.onrender.com/api)

---

## Tech Stack

- [React](https://react.dev/) — UI library
- [Vite](https://vitejs.dev/) — build tool and dev server with HMR
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) — Fast Refresh via Babel

---

## System Requirements

- **Node.js** v25.2.1 or higher

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/3llasious/nc-news-frontend.git
cd nc-news-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

---

## Available Scripts

| Script            | Description                                 |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Start the local development server with HMR |
| `npm run build`   | Build the app for production                |
| `npm run preview` | Preview the production build locally        |
| `npm run lint`    | Run ESLint                                  |

---

## API Overview

This frontend consumes the NC News REST API. Key endpoints:

| Method | Endpoint                             | Description                                             |
| ------ | ------------------------------------ | ------------------------------------------------------- |
| GET    | `/api/articles`                      | All articles (supports `sort_by`, `order` query params) |
| GET    | `/api/articles/:article_id`          | Single article                                          |
| GET    | `/api/articles/:article_id/comments` | Comments on an article                                  |
| GET    | `/api/topics`                        | All topics                                              |
| GET    | `/api/users`                         | All users                                               |
| GET    | `/api/users/:username`               | Single user                                             |
| POST   | `/api/articles/:article_id/comments` | Post a comment                                          |
| POST   | `/api/users`                         | Add a new user                                          |
| PATCH  | `/api/articles/:article_id`          | Upvote or downvote an article                           |
| DELETE | `/api/articles/:comment_id`          | Delete a comment                                        |

**Default article sort:** `created_at`, descending. Queries can be chained: `?sort_by=votes&order=ASC`.

Full API documentation: [https://nc-backend-solosprint.onrender.com/api](https://nc-backend-solosprint.onrender.com/api)

---

## Deployment

The frontend is deployed via [Netlify](https://www.netlify.com/).

To deploy your own instance:

1. Connect your GitHub repo to Netlify.
2. Set the build command to `npm run build` and publish directory to `dist`.
3. The API base URL is hardcoded — if pointing to a different backend, update the base URL in the source before deploying.

> If hosting your own backend, see the [backend repo](https://github.com/3llasious/nc-news-frontend.git) for setup instructions including PostgreSQL configuration and environment files.

---

## Linting

ESLint is configured out of the box. For production applications, TypeScript with type-aware lint rules is recommended — see the [Vite TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) and [`typescript-eslint`](https://typescript-eslint.io).

---

## Known Limitations / Upcoming Features

- Upvote/downvote on comments — not yet implemented
- Update a comment — not yet implemented
- Get a single user by username — not yet implemented

---

## License

MIT
