import React, { Component } from "react";
import Link from "next/link";

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <h1>HEI of One</h1>
        <h5>HIE of One Trustee Community</h5>
        <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">
          <a>Privacy Policy</a>
        </Link>
        <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">
          <a>Support</a>
        </Link>
      </div>
    );
  }
}
