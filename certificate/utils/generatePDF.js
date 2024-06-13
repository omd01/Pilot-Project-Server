const ejs = require("ejs");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const { sendMail } = require("./sendMail");

const generatePDF = async (data) => {
  var status
  const templatePath = path.join(__dirname, "..", "views", "ExperienceIndex.ejs");
  fs.readFile(templatePath, "utf-8", async (err, template) => {
    if (err) {
      console.error("Error reading the template file:", err);
      return;
    }

    const htmlContent = ejs.render(template,data);
    let browser;

    try {
      console.log("Launching browser...");
      browser = await puppeteer.launch({
        headless: true,
        timeout: 60000, // 60 seconds
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      console.log("Browser launched. Opening new page...");
      const page = await browser.newPage();

      await page.setDefaultNavigationTimeout(60000); // 60 seconds

      // Set the content of the da
      await page.setContent(htmlContent, {
        waitUntil: "networkidle0",
        timeout: 60000,
      });

      const outputDir = path.join(__dirname, "pdf");
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir); // Create the directory if it doesn't exist
      }

      const pdfPath = path.join(outputDir, `${data.studentName}.pdf`);
      await page.pdf({ path: pdfPath, format: "A4" });
      console.log("Sending mail...");
      status = await sendMail(
        data.studentEmail,
        'Certificate',
        pdfPath,
        data.studentName + ".pdf"
    );
    status = true;
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      if (browser) {
        console.log("Closing browser...");
        await browser.close();
        return true;
       
      }
    }
  });
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate PDF generation
      resolve(status); // Replace with actual file path
    }, 1000);
  });
}



module.exports = generatePDF;