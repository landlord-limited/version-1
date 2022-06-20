import React from 'react'

const Button = (props) => {
  return (
      <span onClick={props.handleClick(props.id)}>
        {props.text}
      </span>
  )
}

export default Button