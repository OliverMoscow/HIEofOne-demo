
import Router from 'next/router'
import React, { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  
  //@ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();
      const domain = "http://" + window.location.host 

      const res = await fetch("/api/sendgrid", {
        body: JSON.stringify({ "email": email, "callback": domain + '/siwe' }),
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
      Router.push(domain + "/emailVerification")
  };

  
  return (
    <div className="container">
        <form onSubmit={handleSubmit}>
          <h3> Patient </h3>
          <label htmlFor="email">sign in via email</label>
          <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <button type="submit">submit</button>
        </form>
    </div>
  );
}
