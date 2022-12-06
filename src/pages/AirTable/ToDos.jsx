import React, { useEffect } from "react";
import Title from "../../components/Title";
import Error from "../../components/Error";
import Loader from "../../components/Loader"
import TodoCard from "../../components/TodoCard";

//Import eget hook - som laver request til API
import useGetData from "../../hooks/useGetData";

const ToDos = () => {

    //request-hook
    const { error, loading, data, getData } = useGetData()



    useEffect(() => {

        getData("https://api.airtable.com/v0/appdwjYcwMrD2a2pj/Todotable",
            { "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEAPIKEY }
        )


    }, [])


    return (
        <div className="Todos container">
            <div>
                <Title headline="Mine ToDos!" />

                {/*Error*/}
                {error && <Error />}

                {/*Loading*/}
                {loading && <Loader />}


                <div className="row row-cols-1 row-cols-md-3 g-2">

                    {/*Data - ToDos*/}

                    {data && data.records.map((t) =>

                        <div className="col" key={t.id}>

                            <TodoCard t={t}/>

                        </div>
                    ) }
                </div>



            </div>
        </div>
    )

}

export default ToDos