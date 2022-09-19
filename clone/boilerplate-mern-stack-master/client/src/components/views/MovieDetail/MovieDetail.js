import React, { useEffect, useState } from 'react'
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo'
import GridCards from '../commons/GridCards'
import Favorite from './Sections/Favorite'
import { Row, Button } from 'antd'

function MovieDetail(props) {
    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    // when DOM is loaded, run this
    useEffect(()=>{
        console.log('props.match -> ', props.match)

        const endpointCrew =`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        const endpointInfo =`${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo)
        .then(response=>response.json())
        .then(response=>{
            console.log(response)
            setMovie(response)
        })

        fetch(endpointCrew)
        .then(response=>response.json())
        .then(response=>{
            console.log(response)
            setCasts(response.cast)
        })
    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

  return (
      <div>
          {/* Header */}
          { Movie && 
                <MainImage 
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}
                />
            }

          {/* Body */}  
          <div style={{width: '85%', margin: '1rem auto'}}>
              <div style={{display:'flex', justifyContent:'flex-end'}}>
                <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
              </div>
            {/* Movie Info */}
            <MovieInfo 
                movie={Movie}
            />
            <br/>

            {/* Actors Grid */}
            <div style={{display:'flex', justifyContent:'center', margin:'2rem'}}>
                <Button onClick={toggleActorView}>Toggle Actor View</Button>
            </div>

            {ActorToggle && 
            <Row gutter={[16,16]}>
            {Casts && Casts.map((casts, index) => (
               <React.Fragment key={index}>
                   <GridCards 
                   image={casts.profile_path ?
                   `${IMAGE_BASE_URL}w500${casts.profile_path}`:null}
                   chracterName={casts.name}
                   />
               </React.Fragment>
            ))}
            </Row>
            }
            
          </div>
      </div>
  )
}

export default MovieDetail