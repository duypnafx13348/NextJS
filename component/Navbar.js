import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

Navbar.propTypes = {};

function Navbar(props) {
  return (
    <nav>
      <div className="nav-link">
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
      <div className="nav-link">
        <Link href="/todo-v1">
          <a>Todo V1</a>
        </Link>
        <Link href="/todo-v2">
          <a>Todo V2</a>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
