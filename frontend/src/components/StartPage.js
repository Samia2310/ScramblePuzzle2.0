import React from 'react';
import './StartPage.css';

function StartPage({ onSelectLevel }) {
  const handleClick = (level) => {
    onSelectLevel(level);
  };

  return (
    <div className="start-page-container">
      <h1 className="start-page-title">Scramble Puzzle</h1>
      <p className="start-page-description">Select your puzzle difficulty:</p>
      
      <div className="difficulty-buttons">
        <button
          className="difficulty-button very-easy"
          onClick={() => handleClick(2)}
        >
          Very Easy (2x2)
        </button>
        <button
          className="difficulty-button easy"
          onClick={() => handleClick(3)}
        >
          Easy (3x3)
        </button>
        <button
          className="difficulty-button medium"
          onClick={() => handleClick(4)}
        >
          Medium (4x4)
        </button>
        <button
          className="difficulty-button hard"
          onClick={() => handleClick(5)}
        >
          Hard (5x5)
        </button>
      </div>

      <div className="puzzle-credit">
        <div className="puzzle-border-top">
          {[...Array(8)].map((_, i) => (
            <div key={`top-${i}`} className={`puzzle-tab ${i % 2 ? 'inward' : 'outward'}`}></div>
          ))}
        </div>
        <div className="credit-content">
          <div className="credit-main">Crafted with passion by</div>
          <div className="credit-name">Samia Tabassum Chowdhury</div>
          <div className="credit-details">
            <span>Senior Executive, Event Management</span>
            <span className="puzzle-divider">•</span>
            <span>BRAC University Computer Club</span>
          </div>
        </div>
        <div className="puzzle-border-bottom">
          {[...Array(8)].map((_, i) => (
            <div key={`bottom-${i}`} className={`puzzle-tab ${i % 2 ? 'outward' : 'inward'}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StartPage;
