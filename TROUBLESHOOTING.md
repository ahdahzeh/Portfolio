# Troubleshooting

## "Cannot find module './vendor-chunks/next.js'" (Runtime Error)

This error usually comes from a bad or out-of-sync **build cache** or from **Turbopack**. It is not caused by your code.

**Fix — use a clean cache and Webpack:**

1. **Stop the dev server** (Ctrl+C in the terminal where it’s running).
2. **Free port 3000** (if something is still using it):
   ```bash
   lsof -ti :3000 | xargs kill -9
   ```
3. **Clear cache and start:**
   ```bash
   rm -rf .next
   npm run dev -- --port 3000
   ```
   Or use the shortcut: **`npm run dev:fresh`** (clears `.next` and starts on port 3000).

**If it still happens — full clean reinstall:**

```bash
lsof -ti :3000 | xargs kill -9   # free the port
rm -rf .next node_modules
npm install
npm run dev -- --port 3000
```

Or run: **`npm run dev:clean`** (removes `.next` and `node_modules`, runs `npm install`, then starts dev on 3000). On first run you may need to free port 3000 yourself if another process is using it.

**Why use Webpack:** The project is set to use **Webpack** by default (`npm run dev`) because the vendor-chunks error often appears with Turbopack. If you want to try Turbopack again, use `npm run dev:turbo`; if the error returns, switch back to `npm run dev`.

---

## Port already in use (EADDRINUSE)

If you see "address already in use" for port 3000 (or another port):

**Option 1 — free the port (macOS/Linux):**
```bash
lsof -ti :3000 | xargs kill -9
```
Then run `npm run dev -- --port 3000` again.

**Option 2 — use another port:**
```bash
npm run dev -- --port 4000
```
Then open http://localhost:4000

To see what’s using a port: `lsof -i :3000` (replace 3000 with your port).

---

## Scripts summary

| Script | What it does |
|--------|----------------|
| `npm run dev` | Start dev server with **Webpack** (default; most reliable). |
| `npm run dev:fresh` | Delete `.next` then start on port 3000. Use when you see vendor-chunks or cache issues. |
| `npm run dev:clean` | Delete `.next` and `node_modules`, run `npm install`, then start on port 3000. Use when the issue persists. |
| `npm run dev:turbo` | Start dev server with **Turbopack**. Use only if you want to try it; switch back to `npm run dev` if errors appear. |
