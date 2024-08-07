const { createTransport } = require( 'nodemailer');
const ejs = require( "ejs");


exports.sendMail = async (email, subject, OTP,username) => {
    const transport = createTransport({
        service: 'gmail',
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,

        },
    });


    var html
   ejs.renderFile( './templates/verify.ejs', { OTP ,username}, async (err, data) => {
    html = data;
   })


    await transport.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject,
        html,
    });
}

// export const sendMailForResetPassword = async (email, subject, OTP,username) => {
//     const transport = createTransport({
//         service: 'gmail',
//         host: process.env.SMTP_HOST,
//         port: process.env.SMTP_PORT,
//         auth: {
//             user: process.env.SMTP_USER,
//             pass: process.env.SMTP_PASSWORD,

//         },
//     });


//     var html
//    ejs.renderFile( './templates/resetPassword.ejs', { OTP ,username }, async (err, data) => {
//     html = data;
//    })


//     await transport.sendMail({
//         from: process.env.SMTP_USER,
//         to: email,
//         subject,
//         html,
//     });
// }

// export const sendXlsx = async () => {
//     const transport = createTransport({
//         service: 'gmail',
//         host: process.env.SMTP_HOST,
//         port: process.env.SMTP_PORT,
//         auth: {
//             user: process.env.SMTP_USER,
//             pass: process.env.SMTP_PASSWORD,

//         },
//     });

//     const teacher = await Teacher.find();
//     var email = [];
//     const subject = `Subject: Monthly Student Data - ${new Date().toLocaleDateString()}`;

//     const filename = `${new Date().toLocaleDateString()}-sheet.xlsx`
//     teacher.forEach(item => {
//         email.push(item.email);
//     })

//     var html
//    ejs.renderFile( './templates/monthly.ejs', async (err, data) => {
//     html = data;
//    })


//     await transport.sendMail({
//         from: process.env.SMTP_USER,
//         to: email,
//         subject,
//         html,
//         attachments: [
//             {
//                 filename: filename,
//                 path: "./xlsx/sheet1.xlsx",
//                 cid: "unique-data.xlsx"
//             }
//         ]
//     });
// }




