// Master on/off switch for the whole public site. While true, every public
// page is replaced by a simple "paused" screen. Flip to false to restore.
export const SITE_PAUSED = true

// Self-contained HTML for the paused screen (no external assets needed).
export const PAUSED_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Website paused</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: #0a0a0a; color: #fff; text-align: center; padding: 24px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
  .box { max-width: 440px; }
  .dot { width: 10px; height: 10px; border-radius: 50%; background: #5eead4;
    display: inline-block; margin-bottom: 28px; box-shadow: 0 0 16px #5eead4; }
  h1 { font-size: 26px; font-weight: 600; margin-bottom: 14px; letter-spacing: -0.01em; }
  p { color: rgba(255,255,255,0.55); line-height: 1.65; font-size: 15px; }
</style>
</head>
<body>
  <div class="box">
    <span class="dot"></span>
    <h1>The website has been paused</h1>
    <p>This site is temporarily unavailable. Please check back soon.</p>
  </div>
</body>
</html>`
