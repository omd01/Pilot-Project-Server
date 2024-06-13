const ejs = require("ejs");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const { sendMail } = require("./sendMail");

const generatePDF = async (data) => {
  try {
    const templatePath = path.join(__dirname, "..", "views", "ExperienceIndex.ejs");
    const template = await fs.promises.readFile(templatePath, "utf-8");

    const htmlContent = ejs.render(template, data);
    const browser = await puppeteer.launch({
      headless: true,
      timeout: 60000,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(60000);
    await page.setContent(htmlContent, { waitUntil: "networkidle0", timeout: 60000 });

    const outputDir = path.join(__dirname, "..", "pdf");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const pdfPath = path.join(outputDir, `${data.studentName}.pdf`);
    await page.pdf({ path: pdfPath, format: "A4" });

    const mailStatus = await sendMail(data.studentEmail, 'Certificate', pdfPath, `${data.studentName}.pdf`);

    await browser.close();
    return mailStatus ;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return null;
  }
};

module.exports = generatePDF;
