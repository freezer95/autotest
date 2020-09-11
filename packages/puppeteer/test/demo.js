const assert = require('assert');
const puppeteer = require('puppeteer');

describe('puppeteer', function() {
  this.timeout(15000);
  it('search puppeteer', async function() {
    assert.equal([1, 2, 3].indexOf(4), -1);
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.baidu.com/');
    await page.waitFor('body');
    const title = await page.title();
    assert.equal(title.includes('百度一下1'), true);
    await page.$eval('input[name=wd]', e => {e.nodeValue = 'puppeteer'})
    await page.type('input[name=wd]', 'puppeteer');
    await page.click('input[type=submit]')
    await page.waitForSelector('#content_left', {timeout: 3000})
    const contentLeft = await page.$eval('#content_left', node => node.innerHTML);
    assert.equal(contentLeft.includes('puppeteer'), true);
    await page.screenshot({path: 'search_puppeteer.png'});
    debugger
    await browser.close();
  });
});
