const puppeteer = require("puppeteer");
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

module.exports = async (req, res, next) => {
  if (req.method === "POST" || req.method == "PUT") {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(req.body.domainName);
    const path = `./views/${req.body.name}.png`;
    fs.writeFileSync(path,"");
    await page.screenshot({ path:path });
    await browser.close();

    req.body.screenshot = `/views/${req.body.name}.png`;

    const resp = await axios.get("https://jsonwhois.com/api/v1/whois", {
      headers: { Authorization: `Token token=dc8a134fe9c9ae58d6f329985e08f5ac`},
      params:{
        "domain":req.body.domainName
      }
    });
    req.body.renewalDate = new Date(resp.data.expires_on);
    next();
  }
  if (req.method == "GET") {
    var m = moment("2014-01-01"); // or whatever start date you have
    var today = moment().startOf("day");

    res.body.daysInRenewal = Math.round(moment.duration(today - m).asDays());
  }
};
