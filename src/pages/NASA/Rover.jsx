import React, { useEffect } from 'react'
import Title from "../../components/Title";
import Error from "../../components/Error";
import Loader from "../../components/Loader";

//Import eget hook - som laver request til API
import useGetData from "../../hooks/useGetData";

const Rover = () => {

    //Request Hook
    const { error, loading, data, getData } = useGetData()

    useEffect(() => {
        getData("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=" + process.env.REACT_APP_NASAAPIKEY)

    }, [])

    return (
        <div className='NASA container'>

            <div className='col'>

                <Title headline="NASA - Mars Rover Data" />

                {/* Error */}
                {error && <Error />}

                {/* Loading */}
                {loading && <Loader />}

                {/* Data */}

                <div className='row row-cols-1 row-cols-md-2 g-3'>
                    {data && data.photos.map((p, index) =>


                        <div className="card" key={"data" + index}>

                            <div className='card-body'>

                                <div className='card-text'>

                                    <h2>{p.camera.full_name}</h2>

                                    <img className='RoverImages' src={p.img_src} alt="Can't show image" />
                                    <p>Billede taget: {p.earth_date}</p>
                                    <p>Lancering: {p.rover.launch_date}</p>
                                    <p>Landet: {p.rover.landing_date}</p>

                                </div>


                            </div>
                        </div>


                    )

                    }

                </div>

            </div>
        </div>


    )
}

export default Rover