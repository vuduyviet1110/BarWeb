import React from "react";
import "../assets/css/Qoute.css"; // Import your CSS file for styling

const Quote = ({ text, author }) => {
  return (
    <div className="quote-container">
      <blockquote className="quote-text">"{text}"</blockquote>
      <cite className="quote-author">- {author}</cite>
    </div>
  );
};

export default Quote;
