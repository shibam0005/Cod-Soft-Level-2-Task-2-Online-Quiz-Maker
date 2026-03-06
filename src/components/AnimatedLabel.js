import React from 'react';

export default function AnimatedLabel({ text }) {
  return (
    <span className="animated-label">
      {text.split('').map((letter, index) => (
        <span key={index} className="letter">
          {letter}
        </span>
      ))}
    </span>
  );
}
