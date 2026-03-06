import React, { useState, useEffect } from 'react';
import AnimatedLabel from './AnimatedLabel';
import './CustomFloatingLabel.css';

export default function CustomFloatingLabel({ label, value, ...props }) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Check initial value when component mounts or value prop changes
  useEffect(() => {
    if (value !== undefined && value !== null && value !== '') {
      setHasValue(true);
    }
  }, [value]);

  const handleFocus = () => {
    setIsFocused(true);
    setIsAnimating(true);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    setHasValue(e.target.value !== '');
  };

  const handleChange = (e) => {
    setHasValue(e.target.value !== '');
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const isLabelUp = isFocused || hasValue;

  return (
    <div className="custom-floating-label-wrapper">
      <input
        {...props}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        className={`custom-floating-input ${isLabelUp ? 'has-value' : ''}`}
      />
      <label className={`custom-floating-label ${isLabelUp ? 'active' : ''}`}>
        {isAnimating ? <AnimatedLabel text={label} /> : label}
      </label>
    </div>
  );
}

