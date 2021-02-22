import React from 'react';

import '../global/components/loading.css';

export default function Loading() {
  return (
    <div className="loading-icon">
      <div className="square-1"></div>
      <div className="square-2"></div>
      <div className="square-3"></div>
    </div>
  );
}