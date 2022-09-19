import React, {useEffect, useState} from 'react'
import {Row, Button} from 'antd'
import MainImage from './Sections/MainImage'
import GridCards from '../commons/GridCards'
import {API_KEY, API_URL, IMAGE_BASE_URL} from '../../Config'
import Axios from 'axios'

// https://api.themoviedb.org/3/movie/550?api_key=3ef991a6a2f5afd2f17f347ee603c482
// https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
function LandingPage() {
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [MovieImages, setMovieImages] = useState([])
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(()=>{
        // Axios.get(`${API_URL}movie/550?api_key=${API_KEY}`)
        // .then(response=>{
        //     console.log('API_URL->',response)
        // })

        // /movie/latest
        // https://api.themoviedb.org/3/movie/popular?api_key=3ef991a6a2f5afd2f17f347ee603c482&language=en-US&page=1
        // Axios.get(`${API_URL}movie/latest?api_key=${API_KEY}&language=en-US`)
        const URL = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        // Axios.get(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
        // .then(response=>{
        //     console.log('MainImage -> ',response.data.results[0])
        //     console.log('Images -> ',response.data.results)
        //     setCurrentPage(currentPage+1)
        //     setMainMovieImage(response.data.results[0])
        //     setMovieImages(response.data.results)
        // })
        getMovies(URL)
    },[])

    const getMovies = (URL) => {
        Axios.get(URL)
        .then(response=>{
            console.log('MainImage -> ',response.data.results[0])
            console.log('Images -> ',response.data.results)
            setCurrentPage(currentPage+1)
            setMainMovieImage(response.data.results[0])
            setMovieImages([...MovieImages,...response.data.results])
        })
    }

    const loadMoreMovies = () => {
        const URL = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage+1}`
        getMovies(URL)
    }

    return (
        <div>
            {/* Main Image */}
            <MainImage 
                MovieImage={MainMovieImage}
            />
            {/* content */}
            <Row gutter={[16,16]}>
            {MovieImages && MovieImages.map((image,index)=>(
                <GridCards 
                MovieImages={image}
                />
            ))}
            </Row>

            {/* Load More */}
            <Button onClick={loadMoreMovies}>Load More</Button>
            
        </div>
    )
}

export default LandingPage
