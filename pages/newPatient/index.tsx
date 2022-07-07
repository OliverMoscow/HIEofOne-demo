import * as React from "react";
import { useState } from "react";
import Link from 'next/link'


//Landing Page
//@ts-ignore
const NewPatient = (props) => {
  const [email, setEmail] = useState("");
  const [accountCreated, setAccountCreated] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [error, setError] = useState("");


  const { children } = props;

  //@ts-ignore
  const createAccount = async (e) => {
    e.preventDefault();

    //user must accept privacy
    if (!privacy) {
      return;
    }

    //add user to db
    var user = process.env.NEXT_PUBLIC_COUCH_USERNAME;
    var pass = process.env.NEXT_PUBLIC_COUCH_PASSWORD;
    var url = "http://127.0.0.1:5984/patients/";

    var document = {
      email: email,
    };

    var authorizationBasic = window.btoa(user + ":" + pass);
    console.log(user);
    var headers = new Headers();
    headers.append("Authorization", "Basic " + authorizationBasic);

    fetch(url + email, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(document),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log("response", data);
        if (data.ok) {
          //account succesfully created
          //Send confirmation email
          //** Insecure -- email needs to be encripted to prevent middle man attacks 
          const domain = "http://" + window.location.host;
          const res = await fetch("/api/sendgrid", {
            body: JSON.stringify({
              email: email,
              subject: "HIE of One - Account Confirmation",
              html: `<div><h1>Your HIE of One Trustee Account has been created!</h1><h1><a href=${domain}/myTrustee>Your Account</a></h1></div>`,
            }),
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          });

          const { error } = await res.json();
          if (error) {
            console.log(error);
            return;
          }

          setAccountCreated(true);
        }
        if (data.error) {
            if (data.reason == "Document update conflict.") {
                setError("An account attached to this email already exists.")
            } else {
                setError(data.reason)
            }
        }
      });
  };

  return (
    <div className="div">
      <hr className="solid" />
      <h1>New Patient</h1>
      {!accountCreated ? (
        <div className="section">
          <p>
            Your email address is used to manage your Trustee and recieve
            notification of activity. We will not share this email address
            beyond our community support and billing activity and you can cancel
            anytime.
          </p>
          <form onSubmit={createAccount}>
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              checked={privacy}
              onChange={() => setPrivacy(!privacy)}
              style={{ marginBottom: "20px" }}
            ></input>
            <label htmlFor="privacy">
              I have read the Privacy Policy and agree.
            </label>
            <br></br>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-submit">
              Submit
            </button>
          </form>
          {error != "" && (
        <div>
            <hr className="solid" />
          <p style={{ color: "red" }}>Error: {error}</p>
          <Link href="/myTrustee"><button className="btn btn-simple">Sign-in to manage your records access policies</button></Link>
        </div>
      )}
        </div>
      ) : (
        <div>
            <p>Your Trustee Account is now Active!</p>
            <p>After 30 days, an email will ask you to provide payment information for your subscription.</p>
            <Link href="/myTrustee"><button className="btn btn-accented">Continue to review and modify the policies that controll your Trustee.</button></Link>
        </div>
      )}
    </div>
  );
};

export default NewPatient;
