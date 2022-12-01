import React, {useEffect} from 'react'
import Title from "../../components/Title";
import Error from "../../components/Error";
import Loader from "../../components/Loader";

//Import eget hook - som laver request til API
import useGetData from "../../hooks/useGetData";

const MarsWeather = () => {

    //Request Hook
    const { error, loading, data, getData } = useGetData()

    useEffect(() => {
        getData("https: //api.nasa.gov/insight_weather/?api_key=" + process.env.REACT_APP_NASAAPIKEY + "&feedtype=json&ver=1.0")

    }, [])



    return (
        <div className='container'>

            <div className='col'>

                <Title headline="NASA - Mars Rover Data" />

                {/* Error */}
                {error && <Error />}

                {/* Loading */}
                {loading && <Loader />}



            </div>


        </div>
    )
}

export default MarsWeather