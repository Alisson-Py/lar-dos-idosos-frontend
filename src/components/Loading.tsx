import React from 'react';

import '../global/components/loading-view.css';

export default function Loading() {
  return (
    <div className="loading-view">
      <div className="loading-bar bar-1"/>
      <div className="loading-bar bar-2"/>
      <div className="loading-bar bar-3"/>
      <div className="loading-bar bar-4"/>
      <div className="loading-bar bar-5"/>
    </div>
  );
}