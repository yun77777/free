import React, {useEffect, useState} from 'react'
import {API_KEY, API_URL} from '../../Config'
import Axios from 'axios'
import {Descriptions, Button} from 'antd'

function MovieDetailPage(props) {
    console.log(props.match)
    const id = props.match.params.id
    const [MovieDetail, setMovieDetail] = useState(null)
    
    useEffect(()=>{
        const URL = `${API_URL}movie/${id}?api_key=${API_KEY}&language=en-US`
        getMovieDetail(URL)
    },[])

    const getMovieDetail = (URL) => {
        Axios.get(URL)
        .then(response=>{
            console.log(response.data)
            setMovieDetail(response.data)
        })
    }

  return (
    <div>
        {/* Favorite */}
        <div style={{display:'flex', justifyContent:'flex-end'}}>
            <Button>Favorite</Button>
        </div>

        {/* Details about the movie*/}
        {MovieDetail &&
            <Descriptions title="Movie Info" layout="horizontal" bordered>
            <Descriptions.Item label="title">{MovieDetail.title}</Descriptions.Item>
            <Descriptions.Item label="release_date">{MovieDetail.release_date}</Descriptions.Item>
            <Descriptions.Item label="revenue">{MovieDetail.revenue}</Descriptions.Item>
            <Descriptions.Item label="runtime">{MovieDetail.runtime}</Descriptions.Item>
            <Descriptions.Item label="vote_average" span={2}>
                {MovieDetail.vote_average}
            </Descriptions.Item>
            <Descriptions.Item label="vote_count">{MovieDetail.vote_count}</Descriptions.Item>
            <Descriptions.Item label="status">{MovieDetail.status}</Descriptions.Item>
            <Descriptions.Item label="popularity">{MovieDetail.popularity}</Descriptions.Item>

            </Descriptions>
        }

        {/* People */}
        <Button>Toggle Actor View</Button>
    </div>
  )
}

export default MovieDetailPage