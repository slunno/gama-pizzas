import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium, firefox, webkit } from 'playwright';

const root = process.cwd();
const localUrl = 'http://127.0.0.1:4173/';
const preview = spawn(process.execPath, [path.join(root, 'node_modules/vite/bin/vite.js'), 'preview', '--host', '127.0.0.1', '--port', '4173', '--strictPort', '--outDir', 'audit-tests/dist'], { cwd: root, stdio: 'ignore', windowsHide: true });
async function waitForPreview() {
  for (let i = 0; i < 40; i++) {
    try { if ((await fetch(localUrl)).ok) return; } catch {}
    await delay(250);
  }
  throw new Error('vite preview did not start');
}

const output = { menu: [], reducedMotion: [] };
try {
  await waitForPreview();
  for (const [engine, launcher] of Object.entries({ chromium, firefox, webkit })) {
    const browser = await launcher.launch({ headless: true });
    for (const [environment, url] of [['published', 'https://gama-pizzas-work.vercel.app/'], ['local-build', localUrl]]) {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
      const page = await context.newPage();
      const response = await page.goto(url, { waitUntil: 'load', timeout: 45000 });
      await page.locator('.navbar-toggle').click();
      const expandedWhenOpen = await page.locator('.navbar-toggle').getAttribute('aria-expanded');
      await page.locator('#primary-navigation a[href="#historia"]').click();
      await delay(350);
      const state = await page.evaluate(() => {
        const nav = document.querySelector('#primary-navigation');
        const button = document.querySelector('.navbar-toggle');
        const rect = nav.getBoundingClientRect();
        return {
          expandedAfterLink: button.getAttribute('aria-expanded'),
          navClassAfterLink: nav.className,
          navTransformAfterLink: getComputedStyle(nav).transform,
          navLeftAfterLink: Math.round(rect.left),
          focusedElementInsideClosedNav: nav.contains(document.activeElement),
          focusedElement: document.activeElement?.outerHTML?.slice(0, 160) || null,
          firstLinkTabIndex: nav.querySelector('a')?.tabIndex ?? null,
          bodyOverflow: getComputedStyle(document.body).overflow,
          hash: location.hash,
        };
      });
      output.menu.push({ engine, environment, status: response?.status() ?? null, expandedWhenOpen, ...state });

      const keyboardContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
      const keyboardPage = await keyboardContext.newPage();
      await keyboardPage.goto(url, { waitUntil: 'load', timeout: 45000 });
      await keyboardPage.locator('.navbar-brand').focus();
      await keyboardPage.keyboard.press('Tab');
      const tabFocus = await keyboardPage.evaluate(() => {
        const nav = document.querySelector('#primary-navigation');
        const rect = document.activeElement.getBoundingClientRect();
        return {
          expanded: document.querySelector('.navbar-toggle').getAttribute('aria-expanded'),
          firstTabMovesIntoClosedNav: nav.contains(document.activeElement),
          focusedHref: document.activeElement.getAttribute('href'),
          focusedLeft: Math.round(rect.left),
          navHasOpenClass: nav.classList.contains('navbar-menu--open'),
        };
      });
      output.menu.push({ engine, environment, name: 'keyboard-tab-while-closed', ...tabFocus });
      await keyboardContext.close();
      await context.close();
      if (engine === 'chromium' && environment === 'local-build') {
        const reduced = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
        const reducePage = await reduced.newPage();
        await reducePage.goto(url, { waitUntil: 'load' });
        const initialFlavor = await reducePage.locator('.hero-showcase-copy h2').innerText();
        const initialAnimationDuration = await reducePage.locator('.hero-pizza-image').evaluate((image) => getComputedStyle(image).animationDuration);
        await delay(5700);
        const laterFlavor = await reducePage.locator('.hero-showcase-copy h2').innerText();
        output.reducedMotion.push({ engine, environment, preference: 'reduce', initialFlavor, laterFlavor, flavorChanged: initialFlavor !== laterFlavor, cssAnimationDuration: initialAnimationDuration });
        await reduced.close();
      }
    }
    await browser.close();
  }
  await fs.writeFile(path.join(root, 'audit-tests', 'interaction-checks.json'), JSON.stringify(output, null, 2));
  console.log(JSON.stringify(output));
} finally {
  preview.kill();
}
