import React from 'react'
import { burgers, familydeal, wraps } from '../constants'
import OurFoodCard from './OurFoodCard'

function FoodItems() {
  return (
    <div>
      {[...burgers, ...wraps, ...familydeal].map((item) => (
        <OurFoodCard
        key={item.id + item.name}
        imgURL={item.imgURL}
        name={item.name}
        description={item.description}
        price={item.price}
        onClick={onAddToCart(item)}
        />
      ))}
    </div>
  )
}

export default FoodItems
