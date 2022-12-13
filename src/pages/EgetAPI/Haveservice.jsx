import React, { useEffect } from 'react'
import Title from "../../components/Title";
import Error from "../../components/Error";
import Loader from "../../components/Loader";

//Import eget hook - som laver request til API
import useGetData from "../../hooks/useGetData";

const Haveservice = () => {

    //request-hook
    const { error, loading, data, getData } = useGetData()



    useEffect(() => {

        getData("http://localhost:5005/service/"
        )


    }, [])

    return (

        <div className='container-fluid Haveservice'>

            <Title headline="Vores ydelser" />
            <hr className='hr1 mx-auto'></hr>
            <p className='text-center mb-4'>Herunder en oversigt med alle vores services <br></br>
            Hvis du måtte have flere spørgsmål, er du velkommen til at kontakte os</p>

            {/*Error*/}
            {error && <Error />}

            {/*Loading*/}
            {loading && <Loader />}

            {/*Data*/}
            <div className="row row-cols-1 row-cols-md-4 g-2">
                    
                {data && data.services.map((s) =>

                    <div className="col" key={s._id}>
                        <div>

                            <div>
                                <img src={"http://localhost:5005/images/" + s.image} alt="Showcasing product" className='CurrentPic mb-4' />
                                <h4 className='text-center'>{s.title}</h4>
                                <p className='descriptionText text-center'>{s.description}</p>

                            </div>


                        </div>
                    </div>
                )}
            </div>

        </div>

    )
}

export default Haveservice