import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();
const dist = path.join(root, 'audit-tests', 'dist');
const contentTypes = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

async function installLocalBuildRoute(page) {
  await page.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    const pathname = decodeURIComponent(url.pathname);
    const relativePath = pathname === '/' ? 'index.html' : pathname.slice(1);
    const filename = path.resolve(dist, relativePath);
    if (!filename.startsWith(`${dist}${path.sep}`)) return route.abort();
    try {
      const body = await fs.readFile(filename);
      return route.fulfill({
        status: 200,
        contentType: contentTypes[path.extname(filename)] ?? 'application/octet-stream',
        body,
      });
    } catch {
      return route.abort();
    }
  });
}

const results = [];
const lighthouseReport = JSON.parse(
  await fs.readFile(path.join(root, 'audit-tests', 'lighthouse-public-desktop.json'), 'utf8'),
);
const lighthouseContrastSelectors = lighthouseReport.audits['color-contrast'].details.items
  .map((item) => item.node.selector);
for (const [engine, launcher] of Object.entries({ chromium })) {
  const browser = await launcher.launch({ headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await installLocalBuildRoute(page);
    await page.goto('http://gama-local.test/');

    const comboCards = await page.locator('.menu-card').evaluateAll((cards) =>
      cards.slice(2, 4).map((card) => ({
        title: card.querySelector('.menu-titles h3')?.textContent.trim(),
        subtitle: card.querySelector('.menu-subtitle')?.textContent.trim(),
        tag: card.querySelector('.badge')?.textContent.trim(),
        price: card.querySelector('.price .amount')?.textContent.trim(),
        features: [...card.querySelectorAll('.feature-row span')].map((feature) => feature.textContent.trim()),
      })),
    );
    assert.equal(comboCards.length, 2);
    assert.equal(comboCards[0].title, 'Pizza + Mini Burguer');
    assert.equal(comboCards[1].title, 'Pizza + Mini Burguer');
    assert.equal(comboCards[0].tag, comboCards[1].tag);
    assert.match(comboCards[0].subtitle, /Cardápio 1/);
    assert.match(comboCards[1].subtitle, /Cardápio 2/);
    assert.deepEqual(comboCards[0].features.slice(1), comboCards[1].features.slice(1));
    assert.ok(comboCards.every(({ features }) => features.includes('Mini hambúrguer artesanal à vontade')));
    assert.ok(comboCards.every(({ features }) => features.includes('Equipe completa no local')));

    const menu = page.locator('#primary-navigation');
    await page.locator('.navbar-brand').focus();
    await page.keyboard.press('Tab');
    const closedMenuState = await page.evaluate(() => ({
      inert: document.querySelector('#primary-navigation').inert,
      focusedInsideMenu: document.querySelector('#primary-navigation').contains(document.activeElement),
      expanded: document.querySelector('.navbar-toggle').getAttribute('aria-expanded'),
    }));
    assert.equal(closedMenuState.inert, true);
    assert.equal(closedMenuState.focusedInsideMenu, false);
    assert.equal(closedMenuState.expanded, 'false');

    await page.locator('.navbar-toggle').click();
    assert.equal(await page.locator('.navbar-toggle').getAttribute('aria-expanded'), 'true');
    await menu.locator('a[href="#historia"]').click();
    assert.equal(await page.locator('.navbar-toggle').getAttribute('aria-expanded'), 'false');
    assert.equal(await menu.evaluate((element) => element.inert), true);

    const contrastAndTargets = await page.evaluate((selectors) => {
      const rootStyles = getComputedStyle(document.documentElement);
      const luminance = (color) => {
        const channels = color.match(/[\d.]+/g).slice(0, 3).map(Number).map((channel) => {
          const value = channel / 255;
          return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
      };
      const contrastPairs = [
        ['.flavors-section .rodizios-badge', '.flavors-section'],
        ['.gallery-badge', '.gallery'],
        ['.history-badge', '.history'],
        ['.faq-subtitle', '.faq-section'],
      ].map(([textSelector, surfaceSelector]) => {
        const text = document.querySelector(textSelector);
        const surface = document.querySelector(surfaceSelector);
        const foreground = getComputedStyle(text).color;
        const background = getComputedStyle(surface).backgroundColor;
        const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
        return { textSelector, ratio: +((lighter + 0.05) / (darker + 0.05)).toFixed(2) };
      });
      const lighthouseContrastResults = selectors.map((selector) => {
        const element = document.querySelector(selector);
        if (!element) return { selector, ratio: null };
        const foreground = getComputedStyle(element).color;
        let surface = element;
        let background = 'rgba(0, 0, 0, 0)';
        while (surface && background.endsWith(', 0)')) {
          background = getComputedStyle(surface).backgroundColor;
          surface = surface.parentElement;
        }
        const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
        return { selector, ratio: +((lighter + 0.05) / (darker + 0.05)).toFixed(2) };
      });
      const targetButtons = [
        ...document.querySelectorAll('.hero-pagination button, .hero-controls button'),
        ...document.querySelectorAll('.menu-carousel-controls button, .menu-tab, .pill-btn'),
      ].map((button) => {
        const rect = button.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
      });
      return {
        orangeDeep: rootStyles.getPropertyValue('--orange-deep').trim(),
        contrastPairs,
        lighthouseContrastResults,
        targetButtons,
      };
    }, lighthouseContrastSelectors);
    assert.ok(contrastAndTargets.contrastPairs.every(({ ratio }) => ratio >= 4.5));
    assert.ok(contrastAndTargets.lighthouseContrastResults.every(({ ratio }) => ratio !== null && ratio >= 4.5));
    assert.ok(contrastAndTargets.targetButtons.every(({ width, height }) => width >= 44 && height >= 44));

    const reducedContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion: 'reduce',
    });
    const reducedPage = await reducedContext.newPage();
    await installLocalBuildRoute(reducedPage);
    await reducedPage.goto('http://gama-local.test/');
    const initiallyPaused = await reducedPage.locator('.hero-controls button[aria-pressed="true"]').count();
    const initialFlavor = await reducedPage.locator('.hero-showcase-copy h2').innerText();
    await reducedPage.waitForTimeout(5700);
    const laterFlavor = await reducedPage.locator('.hero-showcase-copy h2').innerText();
    assert.equal(initiallyPaused, 1);
    assert.equal(laterFlavor, initialFlavor);

    results.push({ engine, comboCards, menu: closedMenuState, contrastAndTargets, reducedMotionFlavorStable: true });
    await reducedContext.close();
    await context.close();
  } finally {
    await browser.close();
  }
}

await fs.writeFile(
  path.join(root, 'audit-tests', 'fix-verification.json'),
  JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results.map(({ engine, comboCards, menu, contrastAndTargets }) => ({
  engine,
  comboCards,
  menu,
  minimumContrast: Math.min(...contrastAndTargets.lighthouseContrastResults.map(({ ratio }) => ratio)),
  minimumTargetSize: Math.min(...contrastAndTargets.targetButtons.flatMap(({ width, height }) => [width, height])),
  reducedMotionFlavorStable: true,
})), null, 2));
