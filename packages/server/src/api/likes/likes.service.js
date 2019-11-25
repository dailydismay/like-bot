const puppeteer = require("puppeteer");

const wait = () => new Promise(r => setTimeout(r, 5000));

module.exports = async ({ creds, page_url }) => {
  console.log("browser active");

  const browser = await puppeteer.launch({
    headless: false,
    args: [
      // "--no-sandbox"
      // "--proxy-server=127.0.0.1:9876"
    ]
  });

  const page = await browser.newPage();

  await page.goto("https://a.growthhackers.com/login");

  await wait();

  await page.waitForSelector("#user_email");

  await page.type("#user_email", creds.email);
  await page.type("#user_password", creds.password);

  await page.click(".pull-right").catch(() => {});

  await page.goto(page_url);

  await page.waitForSelector(".vote-btn");

  await page.evaluate(() => {
    const btn = document.querySelector(".vote-btn");

    if (!btn || btn.classList.contains("voted")) {
      return;
    }

    btn.click();
  });

  console.log(`Like added for ${creds.email}`);

  await browser.close();
};
