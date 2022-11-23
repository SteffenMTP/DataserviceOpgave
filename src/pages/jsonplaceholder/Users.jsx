import React, {useEffect, useState} from "react";
import Title from "../../components/Title";
import Error from "../../components/Error";
import Loader from "../../components/Loader"

//Import eget hook - som laver request til API
import useGetData from "../../hooks/useGetData";

const Users = ()=>{

    //request-hook
    const {error, loading, data, getData} = useGetData()

    //state til users ID
    const [userID, setUserID] = useState(5)

    useEffect(() => {
        
        //Undgå kald til api hvis der ikke er en ID i state
        if (userID !== "") {
            
            getData("https://jsonplaceholder.typicode.com/users/" + userID )
        
        }

    
    
    }, [userID])
    





    return (
        <div className="Users container">
            <div>
                <Title headline="Users"/>

                {/*Error*/}
                {error && <Error errormessage="Måske er der ikke en bruger, som matcher den indtastede ID?">
                    <>
                        <h4>Her er en test</h4>
                        <p>Her er noget mere tekst</p>
                    </>

                    </Error>}
                {/* {error && <h2>Der er sket en fejl - måske er der ikke en bruger, som matcher den indtastede ID?</h2>} */}

                {/*Loading*/}
                {loading && <Loader/>}


                <form className="my-3">
                    <label htmlFor="inpUserID">Tast en brugers ID</label>
                    <input type="number" onInput={e => setUserID(e.target.value)} min="1" className="form-control" placeholder="Brugers ID" id="inpUserID"></input>
                </form>


                
                {/*Data - users*/}
                {
                    data && data.address &&
                    <div className="card">
                        <div className="card-body">
                        <h2>{data.name}</h2>
                        <p>Mail: <a href={"mailto:" + data.email}>{data.email}</a></p>
                        <p>City: {data.address.city}</p>

                        {
                            Object.entries(data.address).slice(0,4).map(([k, v])=>(
                                <p key={v}>{k}: {v}</p>
                            ))
                        }


                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default Users;