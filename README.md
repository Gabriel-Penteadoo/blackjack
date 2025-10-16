# BootCamp Project

This project contains a Django backend with SQLite and a Vite-based frontend.  
All services are containerized using Docker, so you can run the entire stack without installing dependencies locally.

---

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## Project Structure

.
├── back/ # Django backend
│ ├── blackjack/ # Django settings
│ ├── manage.py
│ └── requirements.txt
├── front/ # Frontend (Vite)
│ ├── package.json
│ ├── vite.config.js
│ └── src/
└── docker-compose.yml

yaml
Copy code

---

## Getting Started with Docker

### 1. Build and start containers

From the root of the project:

```bash
docker compose up --build
This will:

Build the backend and frontend images

Start the containers

Map ports:

Backend: localhost:8000

Frontend: localhost:3000 (or localhost:5173 depending on Vite version)

2. Backend (Django)
The backend runs Django with SQLite (no external database required).

Access the API at: http://localhost:8000/api/

Run management commands inside the container:

bash
Copy code
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py createsuperuser
Static and media files are persisted using Docker volumes (static_volume and media_volume).

3. Frontend (Vite)
The frontend runs Vite and is exposed to your host machine.

Access the frontend at: http://localhost:3000

Any code changes in front/ will hot reload automatically.

4. Stop containers
bash
Copy code
docker compose down
Add -v to remove volumes if needed:

bash
Copy code
docker compose down -v
5. Notes
All dependencies are installed inside Docker; you don’t need Node.js, Python, or SQLite locally.

For development, volumes mount your local code, so changes are reflected live in containers.

If you modify package.json or requirements.txt, rebuild containers:

bash
Copy code
docker compose up --build
