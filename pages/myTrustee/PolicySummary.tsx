import * as React from "react";
import { useState } from "react";

const PolicySummary = () => {
  return (
    <div>
      <div>
        <h1>Privacy Policy Summary</h1>
        <hr className="solid" />
        <h4>Policies for everyone in the adriang.xyz community:</h4>
        <ul>
          <li>
            We collect emails to conact and identify you but we do not share
            them with anyone.
          </li>
          <li>
            We use Stripe. We do not have access to your credit card information
          </li>
          <li>
            We do not read or use your information except as directed by
            policies you can customize.
          </li>
          <li>
            adriang.xyz community issues access credentials based on active
            Doximity accounts.
          </li>
        </ul>
      </div>

      <div>
        <hr className="solid" />
        <h4>Default data use policies you can customize:</h4>
        <ul>
          <li>
            You currently have 1 policy form last modified: October 20, 2021
          </li>
        </ul>
      </div>
      <button className="btn btn-accented">Review and Edit My Policies</button>
      <br></br>
      <button className="btn">Restore Community Defaults</button>
      <button className="btn">Add a Policy for My Trustee</button>
    </div>
  );
};

export default PolicySummary;
