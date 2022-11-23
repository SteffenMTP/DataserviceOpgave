import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import Error from "../../components/Error";
import Loader from "../../components/Loader"

//Import eget hook - som laver request til API
import useGetData from "../../hooks/useGetData";

const Starships = () => {
    //request-hook
    const { error, loading, data, getData } = useGetData()

    const [PageNumber, setPageNumber] = useState(1)

    useEffect(() => {

        getData("https://swapi.dev/api/starships/?page=" + PageNumber)


    }, [PageNumber])



    return (
        <div className="starship container">
            <div>
                <Title headline="Starship" />

                {/*Error*/}
                {error && <Error />}

                {/*Loading*/}
                {loading && <Loader />}

                {/*Data - Starship*/}

                {data &&
                    <>

                        <div className="row row-cols-1 row-cols-md-4 g-2">

                                {data.results.map((s, i) =>

                                    <div className="card" key={"starship" + i}>
                                        <div className="card-body">
                                            <h2>{s.name}</h2>
                                            <div className="card-text">
                                                <p>Model: {s.model}</p>
                                                <p>Manufacturer: {s.manufacturer}</p>
                                                <p>Class: {s.starship_class}</p>
                                                <p>Cost: {s.cost_in_credits}</p>
                                                <p>Number of passengers: {s.passengers}</p>
                                                <p>Top atmosphering speed: {s.max_atmosphering_speed} km/h</p>
                                            </div>
                                        </div>
                                    </div>
                                ) 
                            }
                        </div>
                    
                        <button disabled={data.previous ? false : true} onClick={() => { setPageNumber(PageNumber - 1) }}>&lt;&lt; Previous  </button>
                        <button disabled={data.next ? false : true} onClick={() => { setPageNumber(PageNumber + 1) }}>Next &gt;&gt; </button>
                    </>
                }

            </div>
        </div>
    )
}

export default Starships