import React, { useEffect, useState } from 'react'
import Title from '../../components/Title';
import { useParams, useNavigate } from 'react-router-dom';
import Error from "../../components/Error";
import Loader from "../../components/Loader"
import usePatchData from '../../hooks/usePatchData'

//Kald til API
import useGetData from '../../hooks/useGetData';


//HVILKEN ID???? skal rette = indlæses i formular


const CarsEdit = () => {

    const { id } = useParams() //snup id fra url (tjek i App.jsx - hvor "id" er navngivet/sat)
    const navigate = useNavigate() //så brugeren kan redirectes retur til admin-siden efter rettelse

    //Use GET Data
    const { error, loading, data, getData } = useGetData() // Hent car der skal rettes
    const { error: errorCategories, loading: loadingCategories, data: dataCategories, getData: getDataCategories } = useGetData() // hent kategorier

    //Use PATCH Data
    const { error: errorPatch, loading: loadingPatch, data: dataPatch, patchData } = usePatchData()

    //state til at rumme den rettede todo
    const [updatedCar, setUpdatedCar] = useState()
    
    //state til at rumme den evt. rettede kategori
    const [updatedCategory, setUpdatedCategory] = useState()

    // 1) Hent den car der skal rette (når component loader)
    useEffect(() => {

        //Kategorier så man evt. kan vælge en anden kategori
        getDataCategories("https://api.airtable.com/v0/app0Fd92p2heZj7j5/Category/",
            { "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEAPIKEY }
        )

        // Car der skal rettes
        getData("https://api.airtable.com/v0/app0Fd92p2heZj7j5/Cars/" + id,
            {
                "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEAPIKEY,
                "Content-Type": "application/json"
            })

    }, [])

    // 3) Lyt efter rettelser - og redirect til adminsiden når...
    useEffect(() => {

        //hvis der er data fra patch-requestet = færdig med at rette
        if (dataPatch) {
            navigate('/CarsAdmin')
        }

    }, [dataPatch])


    const handleSubmit = (e) => {
        e.preventDefault()              //VIGTIG ved submit af form, da den forhindrer siden i at reloade siden

        //Hvis der er rettet så tag det rettede fra state - hvis der IKKE er rettet så hent det fra de data vi modtog med GET-metoden
        let car = updatedCar ? updatedCar : data.fields.Name
        let cate = updatedCategory ? updatedCategory : data.fields.Category[0]

        let cd = {
            "fields": {
                "Name": car,
                "UdbyderURL": "https://www.bilbasen.dk/", 
                "Category": [cate]
            }
        }

        // 2) Send til hook, som sender til API
        patchData("https://api.airtable.com/v0/app0Fd92p2heZj7j5/Cars/" + id, cd,
            {
                "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEAPIKEY,
                "Content-Type": "application/json"
            }
        )

    }

    return (
        <div className='container'>
            <Title headline="Ret udvalgt Car" />

            {(loading || loadingPatch || loadingCategories) && <Loader />}

            {(error || errorPatch || errorCategories) && <Error />}

            <div className='row'>
                <div className='col'>

                    {data &&

                        <form onSubmit={handleSubmit}>

                            {/* Todo tekst */}
                            <div className='mb-3 mt-3'>
                                <label className='form-label me-3'> Ret Car:
                                    <input type="text" defaultValue={data.fields.Name} onInput={e => setUpdatedCar(e.target.value)} className='form-control' />
                                </label>
                            </div>

                            {/* Kategorierne i dropdown */}
                            <div className='mb-3 mt-3'>
                                <label className='form-label me-3'>Ret kategori:
                                    <select defaultValue={data.fields.Category[0]} onChange={e => setUpdatedCategory(e.target.value)} className='form-select'>
                                        
                                        {
                                            dataCategories && dataCategories.records.map(c =>

                                                <option value={c.id} key={c.id}>
                                                    {c.fields.Name}
                                                </option>

                                            )
                                        }

                                    </select>
                                </label>

                            </div>


                            <button type="submit" className='btn btn-primary'>Ret ToDo</button>
                        </form>

                    }

                </div>
            </div>


        </div>
    )
}

export default CarsEdit