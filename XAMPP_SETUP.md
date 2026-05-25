# PESOLUTION — XAMPP Setup Guide

## Requirements

- XAMPP with **Apache** and **MySQL** running
- Node.js (for building the frontend once)

## Quick start

1. **Start XAMPP** — Apache + MySQL from the control panel.

2. **Create the database** — open in your browser:
   ```
   http://localhost/PESOL/setup.php
   ```
   This creates the `pesolution` database, tables, and demo accounts.

3. **Build the frontend** (first time, or after code changes):
   ```bash
   cd c:\xampp\htdocs\PESOL
   npm install
   npm run build
   ```

4. **Open the app:**
   ```
   http://localhost/PESOL/
   ```

## Demo logins (password: `password123`)

| Role      | Email               |
|-----------|---------------------|
| Applicant | applicant@demo.com  |
| Employer  | employer@demo.com   |
| Admin     | admin@demo.com      |

## Configuration

Copy `.env.example` to `.env` and adjust if needed:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=pesolution
```

## Troubleshooting

### Blank page

- Run `npm run build` so `dist/index.html` exists.
- Enable **mod_rewrite** in Apache (`httpd.conf`: `LoadModule rewrite_module` and `AllowOverride All` for htdocs).
- Use `http://localhost/PESOL/` (include the folder name).

### Database errors

- Run `setup.php` again.
- Confirm MySQL is running in XAMPP.

### API check

```
http://localhost/PESOL/api/health
```
Should return: `{"status":"ok","database":"mysql",...}`
