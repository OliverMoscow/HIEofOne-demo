import sendgrid from "@sendgrid/mail";

//@ts-ignore
// sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
sendgrid.setApiKey("***REMOVED***")
//@ts-ignore
async function sendEmail(req, res) {
  try {
    console.log("REQ.BODY", req.body);
    await sendgrid.send({
      to: `${req.body.email}`, // Your email where you'll receive emails
      from: "support@hieofone.com", // your website email address here
      subject: "HIE of One - verify your email",
      //@ts-ignore
      html: `<div>
        <h3> Here is your verification link </h3>
        <a href="${req.body.callback}"> verify email </a>
        </div>`,
    });
  } catch (error) {
    // console.log(error);
    //@ts-ignore
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;