import { useState, useEffect } from 'react'
import Title from "../../components/Title";
import Error from "../../components/Error";
import Loader from "../../components/Loader"

//Import eget hooks - som laver Post/GET til API
import usePostData from '../../hooks/usePostData'
import useGetData from "../../hooks/useGetData";

const CarsCreate = () => {

    //hook til post/opret data
    const { error, loading, data, postData } = usePostData()
    const { error: errorCategories, loading: loadingCategories, data: dataCategories, getData } = useGetData()

    //state til at rumme ny todo (fra inputfelt)
    const [newcar, setCar] = useState() //Skal være "" hvis controlled
    //state til at rumme kategori (fra inputfelt)
    const [category, setCategory] = useState()
    const [img, setImg] = useState()

    useEffect(() => {

        getData("https://api.airtable.com/v0/app0Fd92p2heZj7j5/Category/",
            { "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEAPIKEY }
        )


    }, [])

    //Tøm inputfelt efterpost
    useEffect(() => {
        if (data) setCar("") //hvis controlled component - husk at state så skal være "" og ikke bare tom/undefined
        document.querySelector("form").reset()
    }, [data])


    //Send data til api
    const handleSubmit = (e) => {
        e.preventDefault()              //VIGTIG ved submit af form, da den forhindrer siden i at reloade siden

        let nyC = {
            "fields": {
                "Name": newcar,
                // "UdbyderURL":
                //     [{
                //         "url": img //SOMETHIN LIKE DIS     Go to imgbb maybe and send a url then get that
                //     }],
                "Category": [category]
            }
        }

        // Send til hook, som sender til API
        postData("https://api.airtable.com/v0/app0Fd92p2heZj7j5/Cars/", nyC,
            {
                "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEAPIKEY,
                "Content-Type": "application/json"
            }
        )

    }

    {/* // TODO tøm input efter post (hvis data - ellers ikke) */ }

    return (
        <div className='CarContainer container'>

            <Title headline="Opret ny Bil" />

            {/*Error*/}
            {(error || errorCategories) && <Error />}

            {/*Loading*/}
            {(loading || loadingCategories) && <Loader />}

            {data && <h2>Ny bil er oprettet med id: {data.id}</h2>}

            {/* Data Cars */}

            <div className="row">
                <div className="col">

                    <form onSubmit={handleSubmit}>

                        {/* Indtast Bil */}
                        <label className='form-label me-3'> Indtast bil:
                            <input type="text" onInput={e => setCar(e.target.value)} className='form-control' />
                        </label>

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

                        <div className='mb-3 mt-3'>
                            <label className='form-label me-3'> Indsæt billede:
                                <input type="text" onInput={e => setImg(e.target.value)} className='form-control' />
                            </label>
                        </div>

                        <button type="submit" className='btn btn-primary'>Opret ny ToDo</button>
                    </form>

                </div>
            </div>


        </div>
    )
}

export default CarsCreate