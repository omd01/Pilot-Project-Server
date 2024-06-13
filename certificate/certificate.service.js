const generatePDF = require("./utils/generatePDF");
const Certificate = require('../models/CertificateModel');

const sendCertificate = async (certificate)  => {
    if (certificate.status === 'approved') {
        try {
          const pdfPath = await generatePDF(certificate);
          if (pdfPath) {
            // Update the status to 'sent'
            const updatedCertificate = await Certificate.findByIdAndUpdate(
              certificate._id,
              { status: 'sent' },
              { new: true }
            );
            console.log('Certificate status updated to sent');
          } else {
            console.log('Failed to generate PDF');
          }
        } catch (error) {
          console.log('Error:', error);
        }
      }
    }
  
  module.exports = sendCertificate;