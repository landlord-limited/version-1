import React from 'react'

const PriceLabel = (props) => {
  return (

        <div className="disButtonBase-root disChip-root makeStyles-price-23 disChip-outlined">
          <span className="disChip-label">{props.sellPrice} LND</span>
        </div>

  )
}
export default PriceLabel;