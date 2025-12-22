# Public Directory

This directory contains all frontend files that are served to the user's browser.

## Files

### index.html
The main HTML file that structures the entire application interface.

**Features:**
- Input textarea for source text
- Source and target language dropdowns (13 languages)
- Translation output area
- Action buttons (Speak, Copy, Clear)
- Swap languages button
- Character counter display

### styles.css
Complete styling and animations for the application.

**Features:**
- Gradient background
- Responsive design (mobile-friendly)
- Smooth animations (fade-in, slide-up, scale)
- Button hover effects
- Focus states for accessibility
- Error message styling
- Loading spinner animation

### app.js
Frontend JavaScript that handles user interactions and API communication.

**Features:**
- Event listeners for all buttons
- Input validation
- API requests to backend
- Text-to-speech functionality
- Copy to clipboard
- Character counter logic
- Error handling and display

## How It Works

1. User interacts with `index.html`
2. `app.js` handles the interaction
3. `app.js` sends API request to backend
4. Results are displayed with `styles.css` animations
5. User can use additional features (speak, copy)

## Modification Guide

- To change colors: Edit gradient values in `styles.css`
- To add languages: Update select options in `index.html`
- To modify validation: Edit validation rules in `app.js`
- To change animations: Modify keyframes in `styles.css`
