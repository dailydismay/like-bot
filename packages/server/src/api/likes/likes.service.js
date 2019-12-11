const puppeteer = require("puppeteer");
const randomagent = require("random-useragent");
const wait = (t = 5) => new Promise(r => setTimeout(r, t * 1000));

const username = process.env.PROXY_USER;
const password = process.env.PROXY_PASSWORD;

module.exports = async ({ creds, page_url }) => {
  const proxyUrl = `https://${username}:${password}@x.botproxy.net:8443`;

  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
    args: [`--proxy-server=${proxyUrl}`, "--no-sandbox"]
  });
  const page = await browser.newPage();

  await page.authenticate({
    username,
    password
  });

  await page.setExtraHTTPHeaders({
    "X-BOTPROXY-COUNTRY": "US",
    "X-BOTPROXY-SESSION": "123"
  });

  await page.setUserAgent(randomagent.getRandom());

  await page.goto("https://a.growthhackers.com/login", {
    waitUntil: "networkidle0",
    timeout: 3000000
  });

  await page.waitForSelector("#user_email");

  await page.type("#user_email", creds.email);
  await page.type("#user_password", creds.password);

  await page.click(".pull-right").catch(() => {});

  await page.goto(page_url, {
    waitUntil: "networkidle0",
    timeout: 3000000
  });

  await page.waitForSelector(".vote-btn");

  await page.evaluate(() => {
    const btn = document.querySelector(".vote-btn");

    if (!btn || btn.classList.contains("voted")) {
      return;
    }

    btn.click();
  });

  await wait(3);

  await browser.close();
};
