import React from 'react'
import SnowboardCard from './SnowboardCard'

function SnowboardMerch({snowboardsList}) {
    const snowboardComponents = snowboardsList.map(snowboard => (<SnowboardCard key={snowboard.id} {...snowboard}/>))

  return (
    <div>SnowboardMerch</div>
  )
}

export default SnowboardMerch