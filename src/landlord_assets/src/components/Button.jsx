import React from 'react'

const Button = (props) => {
  return (
      <span onClick={props.handleClick}>
        {props.text}
      </span>
  )
}

export default Button