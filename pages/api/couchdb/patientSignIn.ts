var user = process.env.NEXT_PUBLIC_COUCH_USERNAME;
var pass = process.env.NEXT_PUBLIC_COUCH_PASSWORD;
const nano = require("nano")(`http://${user}:${pass}@localhost:5984`);
const domain = process.env.DOMAIN

const generateCode = () => {
  const givenSet = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let code = "";
  for (let i = 0; i < 5; i++) {
    let pos = Math.floor(Math.random() * givenSet.length);
    code += givenSet[pos];
  }
  return code;
};

//@ts-ignore
async function patientSignIn(req, res) {
    const patients = nano.db.use("patients");
    const matches = await patients.fetch({ keys: [req.body.email] });
    if (matches.rows.length > 0) {
      //matching email found in database

      //Create a code to send to user
      const code = generateCode();

      //Send code
      const email = await fetch(`${domain}/api/sendgrid`, {
        body: JSON.stringify({
          email: req.body.email,
          subject: "HIE of One - Verification Code",
          html: `<div><h4>Below is your varification code. DO NOT SHARE WITH ANYONE</h4><h1>${code}</h1></div>`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await email.json();
      if (error) {
        console.log(error);
        return;
      }
      res.status(200).json({code:code})
    } else {
      res.status(500).json({error: "No matching email found in database."})
    }
}

export default patientSignIn;
