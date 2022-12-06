import { useState, useEffect } from 'react'
import Title from "../../components/Title";
import Error from "../../components/Error";
import Loader from "../../components/Loader"

//Import eget hook - som laver Post til API
import usePostData from '../../hooks/usePostData'
import useGetData from "../../hooks/useGetData";

const ToDoCreate = () => {

    //hook til post/opret data
    const { error, loading, data, postData } = usePostData()
    const { error: errorCategories, loading: loadingCategories, data: dataCategories, getData } = useGetData()

    //state til at rumme ny todo (fra inputfelt)
    const [newtodo, setNewtodo] = useState() //Skal være "" hvis controlled
    //state til at rumme kategori (fra inputfelt)
    const [category, setCategory] = useState()

    useEffect(() => {

        getData("https://api.airtable.com/v0/appdwjYcwMrD2a2pj/Category",
            { "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEAPIKEY }
        )

    }, [])



    //Tøm inputfelt efterpost
    useEffect(() => {
        if (data) {
            setNewtodo("") //hvis controlled component - husk at state så skal være "" og ikke bare tom/undefined
            document.querySelector("form").reset()
        }
    }, [data])




    //Send data til api
    const handleSubmit = (e) => {
        e.preventDefault()              //VIGTIG ved submit af form, da den forhindrer siden i at reloade siden

        let nyT = {
            "fields": {
                "Todos": newtodo,
                "Category": [category]
            }
        }

        // Send til hook, som sender til API
        postData("https://api.airtable.com/v0/appdwjYcwMrD2a2pj/Todotable", nyT,
            {
                "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEAPIKEY,
                "Content-Type": "application/json"
            }
        )

    }

    {/* // TODO tøm input efter post (hvis data - ellers ikke) */ }

    return (
        <div className='Todocreate container'>

            <Title headline="Opret ny ToDo" />

            {/*Error*/}
            {(error || errorCategories) && <Error />}

            {/*Loading*/}
            {(loading || loadingCategories) && <Loader />}

            {data && <h2>Ny todo er oprettet med id: {data.id}</h2>}

            {/* Data todos */}

            <div className="row">
                <div className="col">

                    <form onSubmit={handleSubmit}>

                        {/* Todo tekst */}
                        <div className='mb-3 mt-3'>

                            <label className='form-label me-3'> Indtast todo:
                                <input type="text" onInput={e => setNewtodo(e.target.value)} className='form-control' />
                            </label>

                        </div>

                        {/* Kategorierne i dropdown */}
                        <div className='mb-3 mt-3'>
                            <label className='form-label me-3'>Vælg en kategori:
                                <select defaultValue="DEFAULT" onChange={e => setCategory(e.target.value)} className='form-select'>
                                        <option value="DEFAULT" disabled>Vælg en kategori</option>
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

                        <button type="submit" className='btn btn-primary'>Opret ny ToDo</button>
                    
                    </form>

                </div>
            </div>


        </div >
    )
}

export default ToDoCreate