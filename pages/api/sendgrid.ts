import sendgrid from "@sendgrid/mail";

//@ts-ignore
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
//@ts-ignore
async function sendEmail(req, res) {
  console.log(process.env.SENDGRID_API_KEY)
  try {
    console.log("REQ.BODY", req.body);
    await sendgrid.send({
      to: `${req.body.email}`, // Your email where you'll receive emails
      from: "support@hieofone.com", // your website email address here
      subject: req.body.subject,
      //@ts-ignore
      html: req.body.html
    });
  } catch (error) {
    // console.log(error);
    //@ts-ignore
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;