import React from 'react'
import CardSetCard from './CardSet'

function CardSetGrid() {
   return (
      <div className="container grid md:grid-cols-3 gap-4 pt-8 mx-8">
         <CardSetCard name="Computer Science Java" count={2} />
         <CardSetCard name="Computer Science Java" count={2} />
         <CardSetCard name="Computer Science Java" count={2} />
         <CardSetCard name="Computer Science Java" count={2} />
         <CardSetCard name="Computer Science Java" count={2} />
         <CardSetCard name="Computer Science Java" count={2} />
         <CardSetCard name="Computer Science Java" count={2} />
         <CardSetCard name="Computer Science Java" count={2} />
      </div>
   )
}

export default CardSetGrid
