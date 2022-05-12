import Router from "next/router";
import React, { useState } from "react";

export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false)

  //@ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const domain = "http://" + window.location.host;

    const res = await fetch("/api/sendgrid", {
      body: JSON.stringify({ email: email, callback: domain + "/addDocument/" + email}),
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

    setSubmitted(true)
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h3>New Patient </h3>
        <p>Add your email to create an account</p>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">submit</button>
      </form>
      {submitted && 
        <div>
            <p>Awating Varification. An email has been sent to your email. Check your spam folders.</p>
        </div>
      }
    </div>
  );
}
