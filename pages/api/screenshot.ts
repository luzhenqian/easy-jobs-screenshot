// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import chrome from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Buffer>
) {
  const { code } = req.body;
  const options = {
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  };

  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.setContent(code);
  const binary: Buffer = await page.screenshot({
    encoding: "binary",
  });
  res.status(200).send(binary);
}
