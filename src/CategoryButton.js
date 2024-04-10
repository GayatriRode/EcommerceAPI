import React from 'react';
import './style.css';

function CategoryButton({ value, onClick }) {
  return (
      <div className='buttons'>
        <button className="categoryButton" value={value} onClick={onClick}>{value}</button>
      </div>
  );
}

export default CategoryButton;
