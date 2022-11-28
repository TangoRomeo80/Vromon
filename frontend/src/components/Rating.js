import React from 'react'
import { FaStar, FaRegStar, FaStarHalf } from 'react-icons/fa'

const Rating = ({ value, text, color, num }) => {
  return (
    <>
      {num !== 0 ? (
        <div className='rating'>
          <span>
            {value >= 1 ? (
              <FaStar style={{ color }} />
            ) : value >= 0.5 ? (
              <FaStarHalf style={{ color }} />
            ) : (
              <FaRegStar style={{ color }} />
            )}
          </span>
          <span>
            {value >= 2 ? (
              <FaStar style={{ color }} />
            ) : value >= 1.5 ? (
              <FaStarHalf style={{ color }} />
            ) : (
              <FaRegStar style={{ color }} />
            )}
          </span>
          <span>
            {value >= 3 ? (
              <FaStar style={{ color }} />
            ) : value >= 2.5 ? (
              <FaStarHalf style={{ color }} />
            ) : (
              <FaRegStar style={{ color }} />
            )}
          </span>
          <span>
            {value >= 4 ? (
              <FaStar style={{ color }} />
            ) : value >= 3.5 ? (
              <FaStarHalf style={{ color }} />
            ) : (
              <FaRegStar style={{ color }} />
            )}
          </span>
          <span>
            {value >= 5 ? (
              <FaStar style={{ color }} />
            ) : value >= 4.5 ? (
              <FaStarHalf style={{ color }} />
            ) : (
              <FaRegStar style={{ color }} />
            )}
          </span>
          <span className='ms-2'>{text && text}</span>
        </div>
      ) : (
        <div className='rating'>
          <p>No reviews yet</p>
        </div>
      )}
    </>
  )
}

Rating.defaultProps = {
  color: '#f8e825',
}

export default Rating
