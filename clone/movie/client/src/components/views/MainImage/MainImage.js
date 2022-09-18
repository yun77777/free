import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {URL, KEY} from '../../../config'

function MainImage() {
    const [bgColor, setBgColor] = useState('red');
    const [mainImg, setMainImg] = useState(null);
    var test, mainImgURL;


    const onClickBtn = () => {
        if(bgColor === 'red')
            setBgColor('blue');
        else
            setBgColor('red')

        test.style.backgroundColor=bgColor;
        console.log(test)
    }

    const getImage = async () => {
        const response = await axios.get(`${URL}popular?api_key=${KEY}`)
        console.log('response.data -> ', response.data)
        console.log('img -> ', response.data.results[0])
        const poster_path = response.data.results[0].poster_path;
        const mainImgURL = "https://image.tmdb.org/t/p/w200" + poster_path;
        document.querySelector('.mainImg').src=mainImgURL;
        console.log('mainImgURL -> ', mainImgURL)

    }

  return (
    <div className="main-cover-img" ref={(c)=>{test=c}}>
        <button onClick={onClickBtn}>click</button>
        <button onClick={getImage}>Image</button>
        <img className="mainImg" src={mainImgURL} alt="img"/>
    </div>
  )
}

export default MainImage