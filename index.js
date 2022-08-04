const puppeteer = require("puppeteer")
;(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false, slowMo: 250 })
    const page = await browser.newPage()
    let truc = []
    for (let y = 1; y < 11; y++) {
      await page.goto(`https://www.dealabs.com/groupe/pc-portables?page=${y}`, {
        waitUntil: "domcontentloaded",
      })
      await page.waitForNavigation({ waitUntil: "networkidle0" })
      let deals = await page.evaluate(() =>
        Array.from(
          document.querySelectorAll(
            "article > .threadGrid >.threadGrid-title > strong > a, article > .threadGrid >.threadGrid-title > span > span >.thread-price"
          ),
          (element) => element.textContent
        )
      )

      deals.forEach((deal, i) => {
        if (i % 2 !== 0) {
          truc.push({ Deal: deals[i - 1], Prix: deal, Page: y })
        }
      })
    }
    await browser.close()
    const result = truc.filter((truc) => truc.Prix.split("€")[0] < 600)
    console.log(result)
  } catch (error) {
    console.log(error)
  }
})()

// await page.waitForResponse((response) => {
//   return response.request().resourceType() === "xhr"
// })
// await Promise.all([page.click(".linkPlain"), page.waitForNavigation()])
// const element = await page.$("a")
// const text = await await (
//   await element.getProperty("textContent")
// ).jsonValue()
// console.log(text)
// await page.screenshot({
//   path: `${Date.now().toString()}.png`,
//   fullPage: true,
// })
