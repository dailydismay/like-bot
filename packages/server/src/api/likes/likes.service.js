const puppeteer = require("puppeteer");

const wait = () => new Promise(r => setTimeout(r, 5000));

module.exports = async ({ creds, page_url }) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  await page.goto("https://a.growthhackers.com/login", {
    waitUntil: "networkidle0"
  });

  await wait();

  await page.waitForSelector("#user_email");

  await page.type("#user_email", creds.email);
  await page.type("#user_password", creds.password);

  await page.click(".pull-right").catch(() => {});

  await page.goto(page_url);

  // await page.waitForSelector(".vote-btn");

  await page.click(".vote-btn");

  // await page.evaluate(async () => {
  //   const btn = document.querySelector(".vote-btn");

  //   if (!btn || btn.classList.contains("voted")) {
  //     return;
  //   }

  //   await btn.click();
  // });

  await page.screenshot({ path: "example.png" });

  await browser.close();
};
