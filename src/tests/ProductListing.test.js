// ProductCards.test.js
const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');
import { env } from 'node:process'
test('renders product list correctly', async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
  
    console.log('Navigating to http://localhost:3000/home...');
    await page.goto('http://localhost:3000/home', { waitUntil: 'load' });
    await page.waitForTimeout(5000);
    const searchResultsSpan = await page.$('.search-results');
    
    
    expect(searchResultsSpan).not.toBeNull();

    const resultsText = await searchResultsSpan.innerText();

    expect(resultsText).toContain('4 Results Found');
   
    const addToCartButton = await page.$('.btn-cart');
    expect(addToCartButton).not.toBeNull(); 
    console.log('Navigation complete.');

    const addToCartSpan = await page.waitForSelector('span:has-text("Add To Cart")');

    // Ensure that the span element is not null
    expect(addToCartSpan).not.toBeNull();

    // Click on the span element
    await addToCartSpan.click();

    const dropdownCartLi = await page.$('li.dropdown-cart');

    // Ensure that the li element is not null
    expect(dropdownCartLi).not.toBeNull();

    // Click on the li element
    await dropdownCartLi.click();
    
    // Add any further assertions or actions after clicking

    // Example: Check if a dropdown menu appears after clicking
    const dropdownMenu = await page.waitForSelector('.dropdown-menu-media');
    expect(dropdownMenu).not.toBeNull();
    // await browser.close();
    
  await page.getByLabel('Increase Value').click();
  await page.getByLabel('Decrease Value').click();
  await page.locator('a').filter({ hasText: '1' }).click();
  await page.locator('div').filter({ hasText: /^\$4Stone Ribbed Strappy Cut Out Detail Bodycon DressStoneAdd To Cart$/ }).getByRole('button').click();
  await page.locator('a').filter({ hasText: '2' }).click();
  await page.getByRole('link', { name: 'Checkout' }).click();
  await page.locator('#colorFilter').selectOption('Black');
  await page.locator('#colorFilter').selectOption('');
  await page.getByRole('link', { name: 'Home' }).click();
  await page.locator('div').filter({ hasText: /^\$10Black Sheet Strappy Textured Glitter Bodycon DressBlackAdd To Cart$/ }).getByRole('button').click();
  await page.locator('div').filter({ hasText: /^\$4Stone Ribbed Strappy Cut Out Detail Bodycon DressStoneAdd To Cart$/ }).getByRole('button').click();
  await page.locator('div').filter({ hasText: /^\$7\.99Black Frill Tie Shoulder Bodycon DressBlackAdd To Cart$/ }).getByRole('button').click();
  await page.locator('a').filter({ hasText: '3' }).click();
  await page.locator('div').filter({ hasText: /^\$17Red Pin Stripe Belt T Shirt DressRedAdd To Cart$/ }).getByRole('button').click();
  await page.locator('a').filter({ hasText: '4' }).click();
  await page.getByRole('link', { name: 'Checkout' }).click();
  await page.locator('#colorFilter').selectOption('Black');
  await page.locator('#colorFilter').selectOption('');
  await page.locator('#colorFilter').selectOption('Stone');
  await page.locator('#colorFilter').selectOption('Red');
  await page.locator('#colorFilter').selectOption('');
  await page.getByRole('button', { name: 'Remove' }).first().click();

  // ---------------------
  await context.close();
  await browser.close();
  
  });
  
  
