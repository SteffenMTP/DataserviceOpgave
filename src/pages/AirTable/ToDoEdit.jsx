import React, { useEffect, useState } from 'react'
import Title from '../../components/Title';
import { useParams, useNavigate } from 'react-router-dom';
import Error from "../../components/Error";
import Loader from "../../components/Loader"
import usePatchData from '../../hooks/usePatchData'

//Kald til API
import useGetData from '../../hooks/useGetData';


//HVILKEN ID???? skal rette = indlæses i formular


const ToDoEdit = () => {

    const { id } = useParams() //snup id fra url (tjek i App.jsx - hvor "id" er navngivet/sat)
    const navigate = useNavigate() //så brugeren kan redirectes retur til admin-siden efter rettelse

    const { error, loading, data, getData } = useGetData() // Hent todo der skal rettes
    const { error: errorCategories, loading: loadingCategories, data: dataCategories, getData: getDataCategories } = useGetData() // hent kategorier
    
    const { error: errorPatch, loading: loadingPatch, data: dataPatch, patchData } = usePatchData()

    //state til at rumme den rettede todo
    const [updatedTodo, setUpdatedTodo] = useState()
    //state til at rumme den evt. rettede kategori
    const [updatedCategory, setUpdatedCategory] = useState()

    // 1) Hent den todo der skal rette (når component loader)
    useEffect(() => {

        //Kategorier så man evt. kan vælge en anden kategori
        getDataCategories("https://api.airtable.com/v0/appdwjYcwMrD2a2pj/Category",
            { "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEAPIKEY }
        )

        // Todo der skal rettes
        getData("https://api.airtable.com/v0/appdwjYcwMrD2a2pj/Todotable/" + id,
            {
                "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEAPIKEY,
                "Content-Type": "application/json"
            })

    }, [])

    // 3) Lyt efter rettelser - og redirect til adminsiden når...
    useEffect(() => {

        //hvis der er data fra patch-requestet = færdig med at rette
        if (dataPatch) {
            navigate('/ToDosAdmin')
        }

    }, [dataPatch])


    const handleSubmit = (e) => {
        e.preventDefault()              //VIGTIG ved submit af form, da den forhindrer siden i at reloade siden

        let tododata = {
            "fields": {
                "Todos": updatedTodo,
                "Category": [updatedCategory]
            }
        }

        // 2) Send til hook, som sender til API
        patchData("https://api.airtable.com/v0/appdwjYcwMrD2a2pj/Todotable/" + id, tododata,
            {
                "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEAPIKEY,
                "Content-Type": "application/json"
            }
        )

    }

    return (
        <div className='container'>
            <Title headline="Ret udvalgt todo" />

            {(loading || loadingPatch || loadingCategories) && <Loader />}

            {(error || errorPatch || errorCategories) && <Error />}

            <div className='row'>
                <div className='col'>

                    {data &&

                        <form onSubmit={handleSubmit}>

                            {/* Todo tekst */}
                            <div className='mb-3 mt-3'>
                                <label className='form-label me-3'> Ret todo:
                                    <input type="text" defaultValue={data.fields.Todos} onInput={e => setUpdatedTodo(e.target.value)} className='form-control' />
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

export default ToDoEdit