import React from 'react'
import {IMAGE_BASE_URL} from '../../../Config'

function MainImage(props) {
  const {MovieImage} = props
  const imgURL = MovieImage? `${IMAGE_BASE_URL}w1280${MovieImage.backdrop_path}` : null
  // https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
  console.log('MovieImage->',MovieImage)
  console.log('imgURL->',imgURL)

  return (
    <div style={{ 
      backgroundColor:'red',
      width:'100%',
      minHeight:'500px',
      backgroundImage:`url(${imgURL})`,
      backgroundSize: 'contain',
      // backgroundRepeat: 'no-repeat'
    }}>
      {MovieImage &&
            <div style={{
              width:'300px',
              position:'absolute', 
              padding:'5rem 1rem',
              color:'white'
              }}>
              <div>{MovieImage.title}</div>
              <div>{MovieImage.overview}</div>
            </div>
      }
    </div>
  )
}

export default MainImage