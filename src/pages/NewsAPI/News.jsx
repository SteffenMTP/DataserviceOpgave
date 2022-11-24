import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import Error from "../../components/Error";
import Loader from "../../components/Loader"

//Import eget hook - som laver request til API
import useGetData from "../../hooks/useGetData";

const News = () => {
    //Request Hook
    const { error, loading, data, getData } = useGetData();

    //States
    const [search, setSearch] = useState("");          //Søgeord
    const [category, setCategory] = useState("")      //Kategori
    const [country, setCountry] = useState("")            //Land


    //Søgning - når Component loader
    // useEffect(() => {

    //     getData("https://newsapi.org/v2/top-headlines?country=se&category=sports&q=" + search + "&apiKey=028817360d294300ad184fc73e045041")


    // }, [])

    //Søg - kald API
    const handleSubmit = (e) => {
        e.preventDefault(); //forhindrer reload af siden (skal undgås fordi det tømmer state)
        callAPI();

    }

    //Gør det for bedre at kunne ændre URL én gang istedet for adskillige gange
    const callAPI = () => {
        getData("https://newsapi.org/v2/top-headlines?country="+ country +"&category=" + category + "&q=" + search + "&apiKey=028817360d294300ad184fc73e045041")
    }


    return (
        <div className='News container'>

            <Title headline="News - search" />

            {error && <Error />}

            {loading && <Loader />}

            <div className="row mb-5">

                {/*SØGNING - SØGEORD */}
                <form onSubmit={handleSubmit}>
                    <div className="col-6 mb-3 mt-3">
                        <label className="mx-2 form-label" htmlFor="SearchWord">Søgeord: </label>
                        <input type="text" id="SearchWord" defaultValue={search} onInput={e => setSearch(e.target.value)} className="form-control" placeholder="Søg noget" />
                    </div>

                    {/*KATEGORI - vælg kategori*/}
                    <div className="col-6 mb-3 mt-3" >
                        <label className="mx-2 form-label" htmlFor="SelectCate">Vælg kategori: </label>
                        <select id="SelectCate" defaultValue={category} onChange={e => setCategory(e.target.value)} className="form-select">
                            <option>Business</option>
                            <option>Entertainment</option>
                            <option>General</option>
                            <option>Health</option>
                            <option>Science</option>
                            <option>Sports</option>
                        </select>
                    </div>

                    {/*Country - Vælg et land*/}
                    <div className="col-6 mb-3 mt-3">
                        <label className="mx-2 form-label" htmlFor="countryList">Vælg Land</label>
                        <input list="countryList" defaultValue={country} onInput={e => setCountry(e.target.value)} className="form-control" />
                        <datalist id="countryList">
                            <option value="ae" />                            
                            <option value="ar" />                            
                            <option value="at" />                            
                            <option value="au" />                            
                            <option value="be" />                            
                            <option value="bg" />                            
                            <option value="br" />                            
                            <option value="ca" />                            
                            <option value="ch" />                            
                            <option value="cn" />                            
                            <option value="co" />                            
                            <option value="cu" />                            
                            <option value="cz" />                            
                            <option value="de" />                            
                            <option value="eg" />                            
                            <option value="fr" />                            
                            <option value="gb" />                            
                            <option value="gr" />                            
                            <option value="hk" />                            
                            <option value="hu" />                            
                            <option value="id" />                            
                            <option value="ie" />                            
                            <option value="il" />                            
                            <option value="in" />                            
                            <option value="it" />                            
                            <option value="jp" />                            
                            <option value="kr" />                            
                            <option value="lt" />                            
                            <option value="lv" />                            
                            <option value="ma" />                            
                            <option value="mx" />                            
                            <option value="my" />                            
                            <option value="ng" />                            
                            <option value="nl" />                            
                            <option value="no" />                            
                            <option value="nz" />                            
                            <option value="ph" />                            
                            <option value="pl" />                            
                            <option value="pt" />                            
                            <option value="ro" />                            
                            <option value="rs" />                            
                            <option value="ru" />                            
                            <option value="sa" />                            
                            <option value="se" />                            
                            <option value="sg" />                            
                            <option value="si" />                            
                            <option value="sk" />                            
                            <option value="th" />                            
                            <option value="tr" />                            
                            <option value="tw" />                            
                            <option value="ua" />                            
                            <option value="us" />                            
                            <option value="ve" />                            
                            <option value="za" />
                        </datalist>

                    </div>

                    <button className="btn btn-primary">Søg</button>

                </form>

            </div>


            <div className='row'>

                <div className="row row-cols-1 row-cols-md-3 g-3">

                    {
                        data ? 
                        (data.articles.lenght ? <p>Antal Match: {data.totalResults}</p> : <p>Desværre ingen matches</p> ) 
                        : null 
                    }

                    {
                        data && data.articles.map((a, i) =>

                            <div className="col" key={"news" + i}>

                                <div className="card h-100">

                                    <img src={a.urlToImage} alt={a.title} className="card-img-top" />

                                    <div className="card-body">

                                        <div className="title">
                                            <h4>{a.title}</h4>
                                        </div>

                                        <div className="card-text">
                                            <p>{a.description}</p>
                                            <p><a href={a.url} target="_blank">Læs Mere</a></p>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        )
                    }

                </div>

            </div>


        </div>
    )
}

export default News