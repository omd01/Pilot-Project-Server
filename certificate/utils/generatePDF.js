const ejs = require("ejs");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const { sendMail } = require("./sendMail");

const generatePDF = async (data) => {
  try {
    const templatePath = path.join(__dirname, "..", "views", "ExperienceIndex.ejs");
    const template = await fs.promises.readFile(templatePath, "utf-8");
    data.date = getFormattedDate();
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

    const bodayPath = path.join(__dirname, "..", "views", "MailBody.ejs");

    var body;
    ejs.renderFile(bodayPath, async (err, data) => {
      body = data;
    });

    const mailStatus = await sendMail(data.studentEmail, `Certificate of Completion ${data.taskName}`, pdfPath, `${data.studentName}.pdf` ,body);

    await browser.close();
    fs.unlink(pdfPath, (err) => {
      if (err) {
        console.error("Error deleting PDF:", err);
      }
    });
    return mailStatus ;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return null;
  }
};

function getFormattedDate() {
  const date = new Date();

  // Array of month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const month = monthNames[date.getMonth()]; // Get the month name
  const day = date.getDate(); // Get the day of the month
  const year = date.getFullYear(); // Get the full year

  return `${month} ${day}, ${year}`;
}

// Print the formatted date


module.exports = generatePDF;
