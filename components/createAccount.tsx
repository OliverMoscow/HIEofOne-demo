import React, { useState } from "react";

export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  //@ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();

    const domain = "http://" + window.location.host;

    const res = await fetch("/api/sendgrid", {
      body: JSON.stringify({
        email: email,
        callback: domain + "/addDocument/" + email,
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

    setSubmitted(true);
  };

  return (
    <div className="div">
      <div className="section">
        <hr className="solid" />
        <div className="section-num">
          <h2> 2. </h2>
        </div>
        <div className="section-content">
          <form onSubmit={handleSubmit}>
            <h2>Connect Email </h2>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">submit</button>
          </form>
        </div>
      </div>
      <div className="section">
      <hr className="solid" />
        {submitted && (
          <div>
            <div className="section-num">
              <h2> 3. </h2>
            </div>
            <div className="section-content">
              <h2>Awating Varification</h2>
              <p>
                An email has been sent to your email. Check your spam folders.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
