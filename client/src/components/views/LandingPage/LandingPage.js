import React,{useEffect} from 'react';
import axios from 'axios';

function LandingPage(props) {

    //LandingPage 에 들어오자마자 server 에 get request 보내기 
    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    }, [])

    return (
        <div>
            LandingPage 랜딩
        </div>
    );
}

export default LandingPage;
