import React, { useEffect } from 'react'
import Title from '../../components/Title';
import { useParams, useNavigate } from 'react-router-dom';
import Error from "../../components/Error";
import Loader from "../../components/Loader"

//Kald til API
import useGetData from '../../hooks/useGetData';
// Ret data
import usePutData from '../../hooks/usePutData'

const HaveserviceAdminEdit = () => {

  const { id } = useParams() //snup id fra url (tjek i App.jsx - hvor "id" er navngivet/sat)
  const navigate = useNavigate() //så brugeren kan redirectes retur til admin-siden efter rettelse

  //GET data (Produkt ud fra ID)
  const { error, loading, data, getData } = useGetData() // Hent Service der skal rettes

  // PUT data (Når produkt er rettet og skal gemmes)
  const { error: errorPut, loading: loadingPut, data: dataPut, putData } = usePutData()


  // 1) Hent det produkt der skal rette (når component loader)
  useEffect(() => {

    // Todo der skal rettes
    getData("http://localhost:5005/service/" + id)

  }, [])

  // 3) Lyt efter rettelser - og redirect til adminsiden når...
  useEffect(() => {

    //hvis der er data fra put-requestet = færdig med at rette
    if (dataPut) {
      navigate('/HaveServiceAdmin')
    }

  }, [dataPut])

  // 2) Send data til API
  const handleSubmit = (e) => {
    e.preventDefault()              //VIGTIG ved submit af form, da den forhindrer siden i at reloade siden

    let fd = new FormData(e.target)

    // Send til hook, som sender til API
    putData("http://localhost:5005/service/" + id, fd)

  }

  return (
    <div className='container'>
      <Title headline="ADMIN EDIT" />

      {/*Error*/}
      {(error || errorPut) && <Error />}

      {/*Loading*/}
      {(loading || loadingPut) && <Loader />}

      {/*Data*/}
      {data &&

        <div className="row">
          <div className="col">

            <form onSubmit={handleSubmit}>

              {/* Name */}
              <div className='mb-3 mt-3'>
                <label className='form-label me-3'> Produktets navn:
                  <input defaultValue={data.title} type="text" name='title' required className='form-control' />
                </label>
              </div>

              {/* description */}
              <div className='mb-3 mt-3'>
                <label className='form-label me-3'> Produktets beskrivelse:
                  <textarea defaultValue={data.description} name='description' required className='form-control' />
                </label>
                {/* <ReactQuill onChange={setQuillInput} theme="snow" placeholder='Beskriv produktet'  /> */}
              </div>

              {/* image */}
              <div className='mb-3 mt-3'>

                Nuværende image: <img src={"http://localhost:5005/images/" + data.image} alt="Billede" width="200" height="200" className='CurrentPicEdit' />

                <label className='form-label me-3'> Vælg evt. et nyt produktbillede (overskriver det eksisterende):
                  <input type="file" name='image' className='form-control' />
                </label>
              </div>

              <button type="submit" className='btn btn-primary'>Ret service</button>
            </form>

          </div>
        </div>
      }
    </div> //END CONTAINER
  ) //END RETURN
} //END

export default HaveserviceAdminEdit