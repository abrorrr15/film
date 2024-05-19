import { useState } from "react";
import PropTypes from 'prop-types';

const starsContainer = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
};
Star.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.array,
};

export default function Star({
  maxRating = 5,
  color = '#fcc419',
  size = 48,
  messages = [],
  defaultRating = 0,
  }) {
  const [rating, setRating] = useState(defaultRating);
  const [hover, setHover] = useState(0);

  function handleRate(rating) {
    setRating(rating)
  }
  const textStyle = {
    lineHeight: '1',
    margin: '0',
    color,
    fontSize: `${size / 1.5}px`
  }
  return (
    <div>
      <div style={starsContainer}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Stars
            key={i}
            full={hover ? hover >= i + 1 : rating >= i + 1}
            onRate={() => handleRate(i + 1)}
            onHoverIn={() => setHover(i + 1)}
            onHoverOut={() => setHover(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>{messages.length === maxRating ? messages[ hover ? hover - 1 : rating - 1] : hover || rating || ''}</p>
    </div>
  )
}


function Stars({ full, onRate, onHoverIn, onHoverOut, color, size }) {
  const starsStyle = {
    cursor: 'pointer',
    display: 'block',
  };
  return (
    <span
      style={starsStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? <svg class="w-[40px] h-[40px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} viewBox="0 0 24 24">
        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
      </svg> : <svg class="w-[40px] h-[40px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path stroke={color} stroke-width="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z" />
      </svg>
      }
    </span>
  )
}