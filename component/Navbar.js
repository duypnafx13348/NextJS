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
        <Link href="/addtodo">
          <a>Add Todo</a>
        </Link>
        <Link href="/todo">
          <a>Todo</a>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
