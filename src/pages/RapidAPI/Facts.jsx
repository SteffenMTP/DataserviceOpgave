import React, { useEffect, useState } from 'react'
import Title from "../../components/Title";
import Error from "../../components/Error";
import Loader from "../../components/Loader"

//Import eget hook - som laver request til API
import useGetData from "../../hooks/useGetData";
import Pagination from '../../components/pagination/Pagination';


// https://rapidapi.com/APILAB/api/random-facts2/
// REACT_APP_FACTSAPIKEY


const Facts = () => {

    //Request Hook
    const { error, loading, data, getData } = useGetData();

    //Pagination
    const [currentPage, setCurrentPage] = useState(0) //Hvilken side skal vises nu - side 1 = 0
    const [itemPerPage, setItemPerPage] = useState(5) //hvor mange/antal af et.eller.andet pr. side

    //Ved klik på fx knap
    // const handleClick = () => {
    //     getData("https://facts-by-api-ninjas.p.rapidapi.com/v1/facts", {
    //         'X-RapidAPI-Key': process.env.REACT_APP_FACTSAPIKEY,
    //         'X-RapidAPI-Host': 'facts-by-api-ninjas.p.rapidapi.com'
    //       })
    // } 

    useEffect(() => {
        getData("https://facts-by-api-ninjas.p.rapidapi.com/v1/facts", {
            'X-RapidAPI-Key': process.env.REACT_APP_FACTSAPIKEY,
            'X-RapidAPI-Host': 'facts-by-api-ninjas.p.rapidapi.com'
        },
            { limit: '30' }
        )


    }, [])



    return (
        <div className='Facts container'>

            <Title headline="Facts" />

            {loading && <Loader />}

            {error && <Error />}

            {/* ------ PAGINATION ------- */}

            {data &&
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} itemPerPage={itemPerPage} itemTotal={data.length} />
            }

            {data && data.slice(currentPage * itemPerPage, (itemPerPage * currentPage) + itemPerPage).map((f, i) =>
                <div className='card' key={"fact" + i}>
                    <div className='card-body'>
                        <small>{data.indexOf(f)}</small>
                        <p>{f.fact}</p>
                    </div>
                </div>

            )}




            {/* <button onClick={handleClick} className="btn btn-success mt-5">Gi' mig en fact!</button>   */}

        </div>



    )
}

export default Facts