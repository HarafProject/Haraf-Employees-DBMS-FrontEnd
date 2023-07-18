import React, { useEffect } from 'react';
import './modalscreen.css';

export default function Snackbar({ message, onClose }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [onClose]);

  return (
    <div className="snackbar-overlay">
      <div className="snackbar">
        <div className="snackbar-content">{message}</div>
      </div>
    </div>
  );
}
