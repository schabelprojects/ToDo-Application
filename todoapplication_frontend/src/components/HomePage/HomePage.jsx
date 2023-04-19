import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <motion.div
      className="container text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3 }}
    >
      <div className="nav-link-container">
        <div className="nav-link">
          <Link className="link-home" to={"/todoapp"}>
            Enter your Todos
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default HomePage