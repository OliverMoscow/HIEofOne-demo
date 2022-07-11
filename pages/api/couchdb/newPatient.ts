import { NextApiRequest, NextApiResponse } from "next";


var user = process.env.NEXT_PUBLIC_COUCH_USERNAME;
var pass = process.env.NEXT_PUBLIC_COUCH_PASSWORD;
const nano = require("nano")(`http://${user}:${pass}@localhost:5984`);
const domain = process.env.DOMAIN


async function newPatient(req: NextApiRequest, res: NextApiResponse) {  
  console.log(0)
  const patients = nano.db.use("patients");
  console.log(0.5)
  try {
    const responce = await patients.insert(
      { email: req.body.email },
      req.body.email
    );
    console.log(1)
    if (responce.error) {
      res.status(500).send({error: responce.error, reason:responce.reason})
    }
    //account succesfully created
    //Send confirmation email
    //** Insecure -- email needs to be encripted to prevent middle man attacks
    const sendgrid = await fetch(domain + "/api/sendgrid", {
      body: JSON.stringify({
        email: req.body.email,
        subject: "HIE of One - Account Confirmation",
        html: `<div><h1>Your HIE of One Trustee Account has been created!</h1><h1><a href=${domain}/myTrustee>Your Account</a></h1></div>`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  
    console.log(2)
  
    const { error } = await sendgrid.json();
    if (error) {
      console.log(error);
      res.status(500).send(error.message)
    }
    res.status(200).json({success: true})
  } catch (error){
    res.status(500).send(error)
  }
  
}


export default newPatient;
