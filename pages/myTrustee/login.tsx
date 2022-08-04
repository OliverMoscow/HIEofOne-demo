// pages/login.js
import { useRouter } from "next/router";
import { Magic } from "magic-sdk";

//@ts-ignore
export default function Login() {
  const router = useRouter();

  //@ts-ignore
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { elements } = event.target;

    //Check if user has an acount
    

    // the magic code
    const did = await new Magic(
      //@ts-ignore
      process.env.NEXT_PUBLIC_MAGIC_PUB_KEY
    ).auth.loginWithMagicLink({ email: elements.email.value });

    // Once we have the did from magic, login with our own API
    const authRequest = await fetch("/api/magicLink/login", {
      method: "POST",
      headers: { Authorization: `Bearer ${did}` },
    });

    if (authRequest.ok) {
      // Magic Link login successful!
      // Adding user to couchdb
      

      router.push("/myTrustee/dashboard");
    } else {
      /* handle errors */
    }
  };

  return (
    <div>
        <div>
            <hr className="solid"/>
            <h3>Login with Email</h3>
            <form onSubmit={handleSubmit}>
              <input name="email" type="email" />
              <button className="btn btn-submit">Log in</button>
            </form>
        </div>
    </div>
  );
}
