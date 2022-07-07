import * as React from "react";
import PolicySummary from "./PolicySummary";
import SignIn from "../../components/SignInWithEmail";

//Landing Page
const MyTrustee = () => {
  return (
    <div>
      <hr className="solid" />
      {/* @ts-ignore */}
      <SignIn>
        <PolicySummary />
      </SignIn>
    </div>
  );
};

export default MyTrustee;
