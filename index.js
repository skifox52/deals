const puppeteer = require("puppeteer")
;(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      devtools: false,
      ignoreHTTPSErrors: true,
    })
    const page = await browser.newPage()
    let truc = []
    for (let y = 1; y < 11; y++) {
      //You can change the url here
      await page.goto(`https://www.dealabs.com/groupe/pc-portables?page=${y}`, {
        waitUntil: "networkidle2",
      })
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
    const result = truc.filter(
      (truc) => parseInt(truc.Prix.split("€")[0]) < 600 //  <--- You can change the max price here
    )
    console.log(result)
  } catch (error) {
    console.log(error)
  }
})()
