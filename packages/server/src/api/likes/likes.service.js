const puppeteer = require("puppeteer");
const randomagent = require("random-useragent");
const proxyChain = require("proxy-chain");
const exec = require("child_process").exec;
const proxyModel = require("../proxy/proxy.model");

const wait = () => new Promise(r => setTimeout(r, 5000));

module.exports = async ({ creds, page_url }) => {
  console.log("browser active");

  const [oldProxyUrl] = await proxyModel.find();

  let newProxyUrl = oldProxyUrl.url;

  try {
    newProxyUrl = await proxyChain.anonymizeProxy(newProxyUrl);
  } catch (error) {}

  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
    defaultViewport: null,
    slowMo: 10,
    args: [`--proxy-server=${newProxyUrl}`, "--no-sandbox"]
  });
  const page = await browser.newPage();

  page.on("response", response => {
    if (response.ok() === false) {
      exec(
        "(echo authenticate '\"\"'; echo signal newnym; echo quit) | nc localhost 9051",
        () => console.log("Success: The IP Address has been changed.")
      );
    } else {
      console.log(
        "Success: The Page Response was successful (no need to change the IP Address)."
      );
    }
  });

  await page.setUserAgent(randomagent.getRandom());

  await page.goto("https://a.growthhackers.com/login", {
    waitUntil: "networkidle2",
    timeout: 3000000
  });
  await wait();

  await page.waitForSelector("#user_email");

  await page.type("#user_email", creds.email);
  await page.type("#user_password", creds.password);

  await page.click(".pull-right").catch(() => {});

  await page.goto(page_url, {
    waitUntil: "networkidle2",
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

  console.log(`Like added for ${creds.email}`);

  await page.screenshot();

  await browser.close();
};
