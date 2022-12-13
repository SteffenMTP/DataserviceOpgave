import React, {useEffect} from 'react'
import Title from '../../components/Title'
import Error from "../../components/Error";
import Loader from "../../components/Loader"

// import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css';

//Import eget hook - som laver Post til API
import usePostData from '../../hooks/usePostData'

const ProductsAdminCreate = () => {

  //hook til post/opret data
  const { error, loading, data, postData } = usePostData()

  //Tekst fra Quill
  // const [quillInput, setQuillInput] = useState()

   //Tøm inputfelt efterpost
   useEffect(() => {
    if (data) {
        document.querySelector("form").reset()
    }
}, [data])


  const handleSubmit = (e) => {
    e.preventDefault()              //VIGTIG ved submit af form, da den forhindrer siden i at reloade siden
    
    // nyt produkt gøres klar - skal være multipart-formdata
    let fd = new FormData(e.target) // formularen øres til et formdata-objekt
    //fd.append("description", quillInput) //Produktet description hentes fra state fordi Quill ikke er et form-element

    // Send til hook, som sender til API
    postData("http://localhost:5000/product/", fd )
  }


  return (
    <div className='container Productsadmin'>

      <Title headline="ADMIN: Opret nyt produkt" />

      {/*Error*/}
      {error && <Error />}

      {/*Loading*/}
      {loading && <Loader />}

      {data && <h2>Produkt navn "{data.created.name}" er oprettet </h2>}
      {data && <p className='text-muted'>Med id: {data.created._id}</p>}

      <div className="row">
        <div className="col">

          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className='mb-3 mt-3'>
              <label className='form-label me-3'> Produktets navn:
                <input type="text" name='name' required className='form-control' />
              </label>
            </div>

            {/* description */}
            <div className='mb-3 mt-3'>
              <label className='form-label me-3'> Produktets beskrivelse:
                <textarea name='description' required className='form-control' />
              </label>
              {/* <ReactQuill onChange={setQuillInput} theme="snow" placeholder='Beskriv produktet'  /> */}
            </div>

            {/* price */}
            <div className='mb-3 mt-3'>
              <label className='form-label me-3'> Produktets pris:
                <input type="number" name='price' required className='form-control' />
              </label>
            </div>

            {/* image */}
            <div className='mb-3 mt-3'>
              <label className='form-label me-3'> Vælg et produktbillede:
                <input type="file" name='image' required className='form-control' />
              </label>
            </div>

            <button type="submit" className='btn btn-primary'>Opret nyt produkt</button>
          </form>

        </div>
      </div>



    </div>
  )
}

export default ProductsAdminCreate