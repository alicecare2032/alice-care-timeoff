# Alice Care Time Off HTML Download Guide

This repository hosts standalone HTML pages. If you only need the HTML files for local testing, use the GitHub "Raw" links so you can download the exact contents without cloning the whole repository. Make sure the raw URL ends with the **exact filename** (for example `.../main/Service_Report.html`).

## Quick download with your browser
1. Open the raw link for the file you want (replace `main` with your branch name if different on GitHub). The URL must end with the file name:
   - Service Report page: https://raw.githubusercontent.com/alicecare2032/alice-care-timeoff/main/Service_Report.html
   - Reporting dashboard page: https://raw.githubusercontent.com/alicecare2032/alice-care-timeoff/main/reporting.html
2. When the raw HTML opens in your browser, use **File → Save Page As…** (or right-click and **Save As…**) to save the file with the same name.
3. Open the saved file locally in your browser to test.

**If you see a 404:**
- Double-check the branch name (e.g., `main` vs. `work`). If you are testing before the PR is merged, use `work` in the URL.
- Ensure the URL ends with the file name (for example `.../main/reporting.html`) without any trailing slash.

## Download via terminal
You can also fetch the raw HTML directly with `curl` or `wget`:

```bash
curl -O https://raw.githubusercontent.com/alicecare2032/alice-care-timeoff/main/Service_Report.html
curl -O https://raw.githubusercontent.com/alicecare2032/alice-care-timeoff/main/reporting.html
```

```bash
wget https://raw.githubusercontent.com/alicecare2032/alice-care-timeoff/main/Service_Report.html
wget https://raw.githubusercontent.com/alicecare2032/alice-care-timeoff/main/reporting.html
```

After downloading, open the files locally (double-click or drag into a browser) or serve them with a lightweight server:

```bash
python -m http.server 8000
```

Then visit `http://127.0.0.1:8000/Service_Report.html` or `http://127.0.0.1:8000/reporting.html`.
