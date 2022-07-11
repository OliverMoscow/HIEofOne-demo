import Link from "next/link";
import * as React from "react";
import { useState } from "react";
import PolicySummary from "../pages/myTrustee/PolicySummary";

//Landing Page
//@ts-ignore
const SignIn = (props) => {
  const [sentEmail, setSentEmail] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [inputCode, setInputCode] = useState("");

  const { children } = props;

  //@ts-ignore
  const signIn = async (e) => {
    e.preventDefault();
    
    var body = {
      email: email,
    };

    fetch(`/api/couchdb/patientSignIn`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log("response", data);
        if (!data.error) {
          setCode(data.code)
          setSentEmail(true);
        } else {
          //no matching email not found in database
          setError(data.error);
        }
      });
  };

  

  const authorize = () => {
    if (code == inputCode) {
      setAuthorized(true);
    } else {
      setError("Incorect code submitted.");
      setSentEmail(true)
    }
  };

  if (authorized) {
    return <div>{children}</div>;
  }

  //Authorization
  //VERY INSECURE - For demo perposes only
  if (sentEmail) {
    return (
      <div>
        {sentEmail && (
          <div>
            <div style={{ verticalAlign: "top" }}>
              <h1
                style={{
                  verticalAlign: "top",
                  display: "inline-block",
                  margin: "0 20px 0 0",
                }}
              >
                Verification Code
              </h1>
              <button
                className="btn btn-simple"
                onClick={() => setSentEmail(false)}
                style={{ margin: "4px 0 0 0" }}
              >
                Change Email / Resend
              </button>
            </div>
            <p>
              A verification code has been sent to your email. Check your spam
              folders.
            </p>
            <form onSubmit={authorize}>
              <input
                name="code"
                value={inputCode}
                placeholder="Code"
                onChange={(e) => setInputCode(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-submit">
                Check
              </button>
            </form>
            {error != "" && (
              <div>
                <hr className="solid" />
                <p style={{ color: "red" }}>Error: {error}</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="div">
      {error != "" && (
        <div>
          <p style={{ color: "red" }}>Error: {error}</p>
          <Link href="/newPatient">
            <button className="btn btn-simple">
              Subscribe to your own trustee
            </button>
          </Link>
          <hr className="solid" />
        </div>
      )}
      <form onSubmit={signIn}>
        <h4>Sign in with email:</h4>
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
    </div>
  );
};

export default SignIn;
