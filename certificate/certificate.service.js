
const generatePDF = require("./utils/generatePDF");


const sendCertificate = async (certificate) => {
  if (certificate.status === 'approved') {
    const status = await generatePDF(certificate);
    return status;
  }
};

module.exports = sendCertificate;
