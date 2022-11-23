import React, {useEffect, useState} from "react";
import Title from "../../components/Title";
import Loader from "../../components/Loader"

//Import eget hook - som laver request til API
import useGetData from "../../hooks/useGetData";

const Species = ()=>{
    
    //request-hook
    const {error, loading, data, getData} = useGetData()

    //state til users ID
    const [speciesID, setSpeciesID] = useState(4)

    useEffect(() => {
      
        getData("https://swapi.dev/api/species/" + speciesID )
    
      
    }, [speciesID])
    


    return(
        <div className="Species container">
            <div>
                <Title headline="Species"/>

                {/*Error*/}
                {error && <h2>Karabast! - måske er der ikke en species, som matcher det indtastede ID?</h2>}

                {/*Loading*/}
                {loading && <Loader/>}


                <form className="my-3">
                    <label htmlFor="inpSpeciID">Tast en spiecies ID</label>
                    <input type="number" onInput={e => setSpeciesID(e.target.value)} min="1" className="form-control" placeholder="Species ID" id="inpSpeciID"></input>
                </form>


                {/*Data - Species*/}
                {
                    data && 
                    <div className="card">
                        <div className="card-body">
                            <h2>{data.name}</h2>
                            <p>Classifacation: {data.classification}</p>
                            <p>Average-lifespan: {data.average_lifespan}</p>
                            <p>Language: {data.language}</p>
                        </div>
                    </div>
                }



            </div>
        </div>
    )



}

export default Species;