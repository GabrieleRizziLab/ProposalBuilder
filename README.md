# Gabrielerizzilab Proposal Builder

This is a plain HTML, CSS and JavaScript proposal builder. It has no build step and can be hosted on GitHub Pages or opened directly from `index.html`.

## What it does

- Editable proposal boxes.
- Add a box left, right, above or below the current box.
- Delete a box with the top-right X.
- Reorder boxes by dragging the top-left handle with a live card preview.
- Add bullet points with the small circular plus button.
- Remove bullet points with the X shown on hover.
- Edit all text directly on the page.
- Uses the local SIGNAL font files from `assets/font/signal`.
- Uses the provided G mark and logo text from `assets/logos`.
- Click the header logos to upload custom SVG, PNG, JPG, or WebP assets.
- Undo with Ctrl+Z or Cmd+Z.
- Auto-saves to browser local storage.
- Download PNG saves a high-resolution image with the proposal's natural aspect ratio.

## Local testing

Option 1: open directly

1. Unzip the folder.
2. Double-click `index.html`.

Option 2: run a local server

```bash
cd proposal-builder-starter
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## GitHub Pages hosting

1. Create a new GitHub repository.
2. Upload `index.html`, `styles.css`, `app.js`, and `README.md` to the repository root.
3. Go to Settings > Pages.
4. Set Source to `Deploy from a branch`.
5. Select the main branch and root folder.
6. Save.

GitHub will give you a public URL after deployment.

## Recommended next step

After the interaction model is approved, this can be converted into a small React app with:

- Proper data model.
- Saved proposal records.
- Client/project metadata.
- Optional Twenty CRM integration.
