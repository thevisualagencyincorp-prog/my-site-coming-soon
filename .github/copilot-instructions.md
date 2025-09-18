# my-site-coming-soon

**ALWAYS follow these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

This is a minimal "coming soon" landing page repository for The Agency. Currently contains only a README.md file and requires development of the actual website.

## Current Repository State

**CRITICAL**: This repository currently contains NO build system, NO dependencies, NO tests, and NO runnable application code. It contains only:
- README.md with basic project description
- This copilot-instructions.md file

Do not attempt to run `npm install`, `npm run build`, or similar commands as they will fail - no package.json or build system exists.

## Working Effectively

### Initial Repository Validation
- Clone the repository: The repository is minimal and contains no dependencies
- Verify structure: `ls -la` should show only README.md and .github/ directory
- Check git status: `git status` to see current branch state

### Development Workflow for Coming Soon Site

Since this is intended as a "coming soon" landing page, typical development would involve:

1. **Create HTML Structure**:
   - Create `index.html` as the main landing page
   - Add CSS for styling (either inline or separate files)
   - Add any JavaScript for interactivity

2. **Static Site Development Commands** (when HTML/CSS/JS are added):
   - No build step required for static HTML/CSS/JS
   - **VALIDATED**: Use simple HTTP server for testing: `python3 -m http.server 8000`
   - **VALIDATED**: Python 3.12.3 is available in the environment
   - **TIMING**: HTTP server starts instantly, no timeout needed

3. **Typical File Structure for Coming Soon Site**:
   ```
   /
   ├── index.html          (main landing page)
   ├── css/
   │   └── styles.css      (stylesheet)
   ├── js/
   │   └── main.js         (optional JavaScript)
   ├── images/             (logo, background images)
   └── README.md           (project documentation)
   ```

### Validation Steps

**IMPORTANT**: Since there's no application to run currently, validation focuses on:
- Ensure any new HTML files are valid HTML5
- Check that CSS is valid and renders correctly
- Test responsive design on different screen sizes
- Verify all links and forms work as expected
- Test loading speed and performance

**Manual Testing Process** (VALIDATED WORKFLOW):
1. Start local server: `python3 -m http.server 8000` (starts instantly)
2. Open http://localhost:8000 in browser
3. **VALIDATED**: Test desktop view (1280x720) and mobile view (375x667)
4. **VALIDATED**: Check responsive CSS media queries work correctly
5. Verify all interactive elements work
6. Check browser console for JavaScript errors
7. Test different browsers if available
8. **VALIDATED**: Use curl to test server response: `curl -s http://localhost:8000/`

## Common Tasks

### Repository Root Structure
```
ls -la /home/runner/work/my-site-coming-soon/my-site-coming-soon/
total 16
drwxr-xr-x 3 runner runner 4096 Sep  9 01:14 .
drwxr-xr-x 3 runner runner 4096 Sep  9 01:13 ..
drwxrwxr-x 7 runner runner 4096 Sep  9 01:14 .git
-rw-rw-r-- 1 runner runner   45 Sep  9 01:14 README.md
```

### Current README.md Content
```
# my-site-coming-soon
The Agency Coming Soon
```

## Development Guidelines

### When Adding Static Site Content:
- Keep the site lightweight and fast-loading
- Ensure mobile responsiveness
- Use semantic HTML5 elements
- Optimize images for web delivery
- Include proper meta tags for SEO
- Add favicon and necessary app icons

### Deployment Considerations:
- This type of site is typically deployed to static hosting (GitHub Pages, Netlify, Vercel)
- No server-side processing required
- Focus on client-side performance optimization

### Testing Static Content:
- Use browser developer tools for debugging
- Test form submissions if contact forms are added
- Verify external links open correctly
- Check that email/phone links work on mobile devices
- Validate social media integrations

## Expected Timeline and Commands

**File Creation**: Instant - no build process
**HTTP Server Startup**: Instant (validated with `python3 -m http.server 8000`)
**Testing**: Manual browser testing - 2-5 minutes per change
**Deployment**: Depends on hosting platform (typically 1-5 minutes for static hosts)

**VALIDATION REQUIREMENT**: Always manually test any changes by starting the HTTP server and opening http://localhost:8000 in a browser. Exercise the complete user experience and take screenshots to verify visual appearance.

**VALIDATED COMMANDS**:
- `python3 -m http.server 8000` - Works instantly, serves static files
- `curl -s http://localhost:8000/` - Tests server response
- `ls -la` - Shows current minimal repository structure
- `git status` - Shows current branch and file status

## Important Notes

- **NO BUILD SYSTEM EXISTS**: Do not run npm, yarn, or other package manager commands (VALIDATED: npm install fails as expected)
- **NO TESTS EXIST**: Focus on manual browser testing
- **STATIC SITE ONLY**: No server-side code or database
- **MINIMAL CODEBASE**: Start development by creating index.html and basic styling
- **VALIDATED ENVIRONMENT**: Python 3.12.3 available for HTTP server testing
- **RESPONSIVE DESIGN**: Always test both desktop (1280x720) and mobile (375x667) viewports

Always verify that any new files you create are properly structured and functional before committing changes.