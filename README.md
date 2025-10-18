# linkedinunfollower

# Auto-Clicker Script for LinkedIn (or similar)

Automates clicking through buttons that require confirmation dialogs.

## Quick Start

1. Navigate to the page with the buttons you want to click
2. Open Developer Console:
   - **Windows/Linux**: `F12` or `Ctrl + Shift + J`
   - **Mac**: `Cmd + Option + J`
3. Copy the entire script from `auto-clicker-script.js`
4. Paste into the console and press `Enter`
5. Watch the magic happen! ✨

## What It Does

- Finds all buttons matching the primary class pattern
- Clicks each button sequentially with a 2-second delay
- Waits for the confirmation modal to appear
- Automatically clicks the confirmation button
- Provides detailed console logging throughout

## Configuration

You can modify these variables at the top of the script:

```javascript
const DELAY = 2000; // Time between actions (milliseconds)
```

## Console Output

The script provides detailed logs:
- 📋 Total buttons found
- 🖱️ Each button click
- 🔍 Confirmation button search
- ✅ Successful confirmations
- ❌ Any errors encountered
- 📊 Final statistics

## Safety

- The script runs once and stops automatically
- Processes buttons one at a time
- Non-destructive (just clicks buttons)
- Can be stopped by refreshing the page

## Troubleshooting

**No buttons found?**
- Check if the button classes match exactly
- Ensure you're on the correct page

**Confirmation button not clicking?**
- The modal might take longer to load
- Increase the wait time in the `clickConfirmButton()` function (default: 500ms)

**Want to stop mid-execution?**
- Refresh the page or close the browser tab

## Warning

⚠️ Use responsibly! This script automates user actions. Make sure you understand what the buttons do before running the script.
