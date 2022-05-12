import { useRouter } from "next/router";
import { useEffect, useState } from "react";

//commands to kill couch db
// sudo lsof -i :5984
//kill "PID"

//@ts-ignore
export default function NewUser({email}) {
  const [success, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);

    //TODO-make env variables work
    var user = "admin";
    var pass = "couchhie8394";
    var url = "http://127.0.0.1:5984/users/" + email;
    var authorizationBasic = window.btoa(user + ":" + pass);
    var headers = new Headers();
    headers.append("Authorization", "Basic " + authorizationBasic);

    var document = {
      email: email,
      verified: true,
    };

    fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(document),
    })
      .then(res => res.json())
      .then((data) => {
        console.log("response", data);
        if (data.ok) {
          setSuccess(true)
        }
        setLoading(false)
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>New Patient</h1>
      <p>{success ? "User added!" : "Sorry, this user already exists. Try again with a different email."}</p>
      <a href="/"> home </a>
    </div>
  );


}

//@ts-ignore
NewUser.getInitialProps = async ({ query }) => {
  const {email} = query
  return {email}
}
