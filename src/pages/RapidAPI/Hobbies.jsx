import React from 'react'
import Title from "../../components/Title";
import Error from "../../components/Error";
import Loader from "../../components/Loader"

//Import eget hook - som laver request til API
import useGetData from "../../hooks/useGetData";


// https://rapidapi.com/apininjas/api/hobbies-by-api-ninjas/
// REACT_APP_RAPIDAPIKEY



const Hobbies = () => {

  //Request Hook
  const { error, loading, data, getData } = useGetData();


  //Ved klik på fx knap
  const handleClick = () => {
    getData("https://hobbies-by-api-ninjas.p.rapidapi.com/v1/hobbies",
      {
        'X-RapidAPI-Key': 
        // '3dc94dc6a1msh5ebf23a6173aa3cp17bf80jsndd043db47af0',
        process.env.REACT_APP_RAPIDAPIKEY,
        'X-RapidAPI-Host': 'hobbies-by-api-ninjas.p.rapidapi.com'
      },
      { category: 'general' }
    )
  }

  return (
    <div className='Hobbies container'>

      <Title headline="Vælg din (tilfældige) hobby" />

      {loading && <Loader />}

      {error && <Error />}

      {data && <div className='card'>
        
        <div className='card-body'>
          
          <div className='card-title text-center'>
            
            <h2 className='display-2'>
              <a href={data.link} target="_blank">{data.hobby}</a>
            </h2>

          </div>

        </div>

      </div>
      }

      <button onClick={handleClick} className="btn btn-success mt-5">Gi' mig en hobby!</button>

    </div>
  )
}

export default Hobbies