import React from 'react'
import Spinner from 'react-spinkit'

const loadingElement = (message) => {
  return (
    <div className="overlay-content">
      <div className="wrapper">
        <Spinner
          name='pacman'
          fadeIn='none'
          color='yellow'
        />
        <span className='message'>
          { message }
        </span>
      </div>
    </div>
  )
}

const Loading = ({ loading, message }) => {
  return loading ? loadingElement(message) : null
}

export default Loading