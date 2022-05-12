import Router from "next/router";
import React, { useState } from "react";
import PouchDB from "pouchdb";

//commands to kill couch db
// sudo lsof -i :5984
//kill "PID"

export default function Home() {
  const [email, setEmail] = useState("");

  //@ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();
    var db = new PouchDB('http://localhost:5984/kittens');
    var doc = {
      "_id": "mittens",
      "name": "Mittens",
      "occupation": "kitten",
      "age": 3,
      "hobbies": [
        "playing with balls of yarn",
        "chasing laser pointers",
        "lookin' hella cute"
      ]
    };
    // db.put(doc);
    db.get('mittens').then(function (doc) {
      console.log(doc);
    });

    // const domain = "http://" + window.location.host;

    // const res = await fetch("/api/sendgrid", {
    //   body: JSON.stringify({ email: email, callback: domain + "/siwe" }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "POST",
    // });

    // const { error } = await res.json();
    // if (error) {
    //   console.log(error);
    //   return;
    // }

    // Router.push(domain + "/emailVerification");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h3> Patient </h3>
        <label htmlFor="email">sign in via email</label>
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
  );
}
