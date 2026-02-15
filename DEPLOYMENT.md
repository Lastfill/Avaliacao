# Deployment Guide

This project is configured for easy deployment to Netlify or Vercel.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher) or [Bun](https://bun.sh/)
- Git installed
- A GitHub account

## Deploy to Netlify

1.  Push your code to a GitHub repository.
2.  Log in to [Netlify](https://www.netlify.com/).
3.  Click "Add new site" > "Import an existing project".
4.  Select "GitHub" and authorize Netlify.
5.  Search for your repository and select it.
6.  Netlify will automatically detect the settings from `netlify.toml`.
7.  Click "Deploy site".

## Deploy to Vercel

1.  Push your code to a GitHub repository.
2.  Log in to [Vercel](https://vercel.com/).
3.  Click "Add New..." > "Project".
4.  Select "Continue with GitHub".
5.  Import your repository.
6.  Vercel will automatically detect the Vite framework and settings.
7.  Click "Deploy".

## Deploy to Hostinger

### Option A: Manual Upload (easiest for beginners)

1.  Run the build command locally:
    ```bash
    npm run build
    ```
2.  This will create a `dist` folder in your project.
3.  Log in to your Hostinger hPanel.
4.  Go to **File Manager**.
5.  Navigate to `public_html`.
6.  Delete the default `default.php` file if it exists.
7.  Upload the **contents** of the `dist` folder (not the folder itself, but the files inside it like `index.html`, `assets`, etc.) directly into `public_html`.

### Option B: Git Integration (Automatic)

1.  Push your code to GitHub (see previous section).
2.  In Hostinger hPanel, search for **Git**.
3.  Add your Repository URL and Branch (usually `main`).
4.  Set the **Install Dependencies** toggle to ON.
5.  Hostinger should detect the build, but you might need to specify the build command `npm run build` and publish directory `dist`.
6.  Click **Deploy**.

## Manual Build

To build the project locally:

```bash
npm run build
# The output will be in the `dist` folder.
```
