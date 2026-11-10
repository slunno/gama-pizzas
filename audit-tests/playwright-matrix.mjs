import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium, firefox, webkit } from 'playwright';

const root = process.cwd();
const auditDir = path.join(root, 'audit-tests');
const distDir = path.join(auditDir, 'dist');
const screenshotsDir = path.join(auditDir, 'screenshots');
const browserPath = path.join(auditDir, 'browsers');
const localUrl = 'http://127.0.0.1:4173/';
const publicUrl = 'https://gama-pizzas-work.vercel.app/';
const widths = [320, 360, 390, 414, 768, 820, 1024, 1280, 1440, 1920];
const engines = { chromium, firefox, webkit };

await fs.mkdir(screenshotsDir, { recursive: true });
const preview = spawn(process.execPath, [
  path.join(root, 'node_modules', 'vite', 'bin', 'vite.js'), 'preview',
  '--host', '127.0.0.1', '--port', '4173', '--strictPort', '--outDir', 'audit-tests/dist',
], { cwd: root, stdio: 'ignore', windowsHide: true });

async function waitForPreview() {
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      const response = await fetch(localUrl);
      if (response.ok) return;
    } catch {}
    await delay(250);
  }
  throw new Error('vite preview did not become available at 127.0.0.1:4173');
}

const matrix = [];
const interactions = [];
const consoleErrors = [];
const resourceSummary = [];
const screenshotFiles = [];

async function probeViewport(page, engine, environment, width, orientation) {
  const height = orientation === 'portrait'
    ? Math.max(620, Math.round(width * 1.45))
    : Math.max(200, Math.round(width * 0.62));
  await page.setViewportSize({ width, height });
  await delay(80);
  const result = await page.evaluate(() => {
    const rootWidth = document.documentElement.scrollWidth;
    const missingAnchors = [...document.querySelectorAll('a[href^="#"]')]
      .map((a) => a.getAttribute('href').slice(1))
      .filter((id) => id && !document.getElementById(id));
    const visibleButtons = [...document.querySelectorAll('button')].filter((button) => {
      const rect = button.getBoundingClientRect();
      const style = getComputedStyle(button);
      return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
    }).map((button) => {
      const rect = button.getBoundingClientRect();
      return { name: button.getAttribute('aria-label') || button.innerText.trim().slice(0, 36), width: Math.round(rect.width), height: Math.round(rect.height) };
    });
    const visibleImages = [...document.images].filter((image) => {
      const rect = image.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight;
    });
    const brokenImages = visibleImages.filter((image) => image.complete && image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.src);
    return {
      viewportWidth: innerWidth,
      viewportHeight: innerHeight,
      documentWidth: rootWidth,
      horizontalOverflowPx: Math.max(0, rootWidth - innerWidth),
      missingAnchors,
      brokenVisibleImages: brokenImages,
      undersizedVisibleButtons: visibleButtons.filter((button) => button.width < 44 || button.height < 44),
      visibleButtons,
    };
  });
  const row = { engine, environment, width, orientation, ...result };
  matrix.push(row);
  if (row.horizontalOverflowPx > 1 || row.missingAnchors.length || row.brokenVisibleImages.length) {
    const file = `${environment}-${engine}-${width}-${orientation}.png`;
    await page.screenshot({ path: path.join(screenshotsDir, file) });
    screenshotFiles.push(file);
  }
}

try {
  await waitForPreview();
  for (const [engine, launcher] of Object.entries(engines)) {
    let browser;
    try {
      browser = await launcher.launch({ headless: true });
      for (const [environment, url] of [['published', publicUrl], ['local-build', localUrl]]) {
        const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
        const page = await context.newPage();
        page.on('pageerror', (error) => consoleErrors.push({ engine, environment, message: error.message }));
        const response = await page.goto(url, { waitUntil: 'load', timeout: 45000 });
        await delay(250);

        for (const width of widths) {
          for (const orientation of ['portrait', 'landscape']) {
            await probeViewport(page, engine, environment, width, orientation);
          }
        }

        await page.setViewportSize({ width: 390, height: 844 });
        const beforeHash = await page.evaluate(() => location.hash);
        if (await page.locator('.navbar-toggle').isVisible()) {
          await page.locator('.navbar-toggle').click();
          const expanded = await page.locator('.navbar-toggle').getAttribute('aria-expanded');
          const menuVisible = await page.locator('#primary-navigation').isVisible();
          await page.locator('#primary-navigation a[href="#historia"]').click();
          await delay(150);
          interactions.push({ engine, environment, name: 'mobile-menu-and-anchor', expanded, menuVisibleAfterOpen: menuVisible, hashAfterClick: await page.evaluate(() => location.hash), menuClosedAfterLink: !(await page.locator('#primary-navigation').isVisible()), beforeHash, responseStatus: response?.status() ?? null });
        } else {
          interactions.push({ engine, environment, name: 'mobile-menu-and-anchor', result: 'toggle not visible at 390px' });
        }

        if (engine === 'chromium' && environment === 'published') {
          await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
          await delay(1200);
          resourceSummary.push(await page.evaluate(() => ({
            url: location.href,
            title: document.title,
            resources: performance.getEntriesByType('resource').map((entry) => ({
              name: entry.name,
              transferSize: entry.transferSize || null,
              decodedBodySize: entry.decodedBodySize || null,
              durationMs: Math.round(entry.duration),
            })),
          })));
          await page.evaluate(() => window.scrollTo(0, 0));
          await page.locator('#historia').scrollIntoViewIfNeeded();
          const shot = 'contrast-history-section.png';
          await page.screenshot({ path: path.join(screenshotsDir, shot) });
          screenshotFiles.push(shot);
        }
        await context.close();
      }
    } catch (error) {
      matrix.push({ engine, environment: 'all', error: error.message });
    } finally {
      await browser?.close();
    }
  }

  const output = {
    generatedAt: new Date().toISOString(),
    viewportsTested: widths,
    orientationDefinitions: { portrait: 'height=max(620,width*1.45)', landscape: 'height=max(200,width*0.62)' },
    matrix,
    interactions,
    consoleErrors,
    resourceSummary,
    screenshotFiles: [...new Set(screenshotFiles)],
  };
  await fs.writeFile(path.join(auditDir, 'playwright-matrix.json'), JSON.stringify(output, null, 2));
  console.log(JSON.stringify({
    rows: matrix.length,
    rowErrors: matrix.filter((r) => r.error).length,
    overflowCases: matrix.filter((r) => r.horizontalOverflowPx > 1).map(({ engine, environment, width, orientation, horizontalOverflowPx }) => ({ engine, environment, width, orientation, horizontalOverflowPx })),
    failedImages: matrix.filter((r) => r.brokenVisibleImages?.length).map(({ engine, environment, width, brokenVisibleImages }) => ({ engine, environment, width, brokenVisibleImages })),
    interactions,
    consoleErrors,
    screenshots: [...new Set(screenshotFiles)],
  }));
} finally {
  preview.kill();
}
