import React, { useEffect, useState } from 'react'
import Title from "../../components/Title";
import Error from "../../components/Error";
import Loader from "../../components/Loader"

//Import eget hook - som laver request til API
import useGetData from "../../hooks/useGetData";

//Med opslag på 

const Weather2 = () => {

    //request-hook - openweather
    const { error, loading, data, getData } = useGetData()
    //request-hook - DAWA
    const { error: errorDAWA, loading: loadingDAWA, data: dataDAWA, getData: getDataDAWA } = useGetData()

    //state til users ID
    const [zip, setZip] = useState("8000")

    useEffect(() => {

        // REACT_APP_OPENWEATHERAPIKEY7
        
        // Overvej regex - regular expression
        if(zip.length === 4 && !isNaN(zip)) {
            getData("https://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",dk&units=metric&lang=da&appid=" + process.env.REACT_APP_OPENWEATHERAPIKEY)
        } else{
            //Søg i DAWA og send brugerens input med (state)
            getDataDAWA("https://api.dataforsyningen.dk/postnumre/autocomplete?q=" + zip)
        }


    }, [zip])


    return (
        <div className='Weather1 container'>

            <Title headline="Vejret - adresseopslag hos DAWA" />

            {/* Error */}
            {error && <Error />}

            {/* Loading */}
            {loading && <Loader />}



            <div className='row'>

                <div className='col-12 mb-5 text-center'>

                    <input list='adresseforslag' type="text" placeholder="Indtast et postnummer" autoComplete='off' onInput={e => setZip(e.target.value.substring(0,4))} defaultValue={zip}></input>
                    <datalist id='adresseforslag'>
                        {
                            dataDAWA && dataDAWA.map(a => <option value={a.tekst} key={a.postnummer.nr} />)
                        }
                    </datalist>

                </div>

                <div className='col-12 col-md-6 offset-md-3'>
                    {
                        data && <div className='card'>
                            <div className='card-body'>
                                <div className='card-title'>
                                    <h2>Vejret i {data.name}</h2>
                                </div>
                                <div className='card-body'>
                                    <p className='display-4 cap-first'>{data.weather[0].description}</p>
                                    <p>Temperatur: {Math.round(data.main.temp)}&#8451;</p>
                                    <p>Luftfugtighed: {data.main.humidity}%</p>
                                    <img src={"http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"} />
                                </div>
                            </div>

                        </div>
                    }

                </div>
            </div>


        </div>
    )
}

export default Weather2