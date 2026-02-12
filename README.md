# MentorIA

Plataforma SaaS para gestión y seguimiento de mentorías y coaching profesional. Stack: React + Vite (frontend), Node/Express + MySQL (backend).

## Estructura
- `frontend`: Vite + React, proxy a `/api` para el backend.
- `backend`: Express + MySQL, rutas básicas (`/api/metrics`, `/api/clients`, `/api/sessions`, `/api/chat`).

## Cómo levantar localmente
1) Crear la base de datos MySQL:
```bash
mysql -u root -p < backend/schema.sql
```
2) Backend:
```bash
cd backend
cp .env.example .env   # ajusta credenciales
npm install
npm run dev            # puerto 4000
```
3) Frontend:
```bash
cd frontend
npm install
npm run dev            # puerto 5173, proxy a 4000
```

> Si el backend no está disponible, el frontend muestra datos de ejemplo para visualizar el flujo.
