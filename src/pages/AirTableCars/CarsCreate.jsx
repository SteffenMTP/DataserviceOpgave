import { useState, useEffect } from 'react'
import Title from "../../components/Title";
import Error from "../../components/Error";
import Loader from "../../components/Loader"

//Import eget hook - som laver Post til API
import usePostData from '../../hooks/usePostData'


const CarsCreate = () => {

    //hook til post/opret data
    const { error, loading, data, postData } = usePostData()

    //state til at rumme ny todo (fra inputfelt)
    const [newcar, setCar] = useState() //Skal være "" hvis controlled

    //Tøm inputfelt efterpost
    useEffect(() => {
      if(data) setCar("") //hvis controlled component - husk at state så skal være "" og ikke bare tom/undefined
        document.querySelector("form").reset()
    }, [data])
    

    //Send data til api
    const handleSubmit = (e) => {
        e.preventDefault()              //VIGTIG ved submit af form, da den forhindrer siden i at reloade siden

        let nyC = {
            "fields": {
              "Name": newcar
            }
      }

      // Send til hook, som sender til API
      postData("https://api.airtable.com/v0/app0Fd92p2heZj7j5/Table%201?/", nyC,
            { 
                "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEAPIKEY,
                "Content-Type": "application/json" 
            }
        )

    }
    
    {/* // TODO tøm input efter post (hvis data - ellers ikke) */}

    return (
        <div className='CarContainer container'>

            <Title headline="Opret ny Bil" />

            {/*Error*/}
            {error && <Error />}

            {/*Loading*/}
            {loading && <Loader />}

            {data && <h2>Ny bil er oprettet med id: {data.id}</h2>}

            {/* Data Cars */}

            <div className="row">
                <div className="col">

                    <form onSubmit={handleSubmit}>

                        <label className='form-label me-3'> Indtast bil: 
                            <input type="text" onInput={e => setCar(e.target.value)} className='form-control' />
                        </label>

                        <button type="submit" className='btn btn-primary'>Opret ny ToDo</button>
                    </form>

                </div>
            </div>


        </div>
    )
}

export default CarsCreate