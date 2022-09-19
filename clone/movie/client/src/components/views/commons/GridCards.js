import React from 'react'
import {Col} from 'antd'
import {IMAGE_BASE_URL} from '../../Config'

function GridCards(props) {
  const {MovieImages} = props
  const imgURL = MovieImages? `${IMAGE_BASE_URL}w500${MovieImages.poster_path}` : null
  const API = `/detail/${MovieImages.id}`

  console.log('MovieImages->',MovieImages)
  return (
    
    <Col lg={6} md={8} xs={24}>
      <a href={API}>
        <img style={{
          width: '100%'
        }} src={imgURL} alt={MovieImages.original_title}/>
      </a>
    </Col>
  )
}

export default GridCards