import React from 'react'
import "./Pagination.scss"

const Pagination = ({currentPage, setCurrentPage, itemPerPage, itemTotal}) => {

    //Beregn hvor mange "sider" der skal være
    let numberOfPage = Math.ceil(itemTotal / itemPerPage) //Beregn antal sider ud fra antal-items-ialt divideret med items-per-side og "rund op" (ceil)


  return (
    <div className='Pagination '>
        <button disabled={currentPage <= 0} onClick={()=> setCurrentPage(currentPage -1)} className='btn btn-success'>&lt;&lt; Prev</button>

        {/* Pagination side-buttons */}
        {
            [...Array(numberOfPage)].map((x, i) => 
            
                <button onClick={()=> setCurrentPage(i)} className={i === currentPage ? "btn btn-success" : "btn btn-primary"}>{i + 1}</button>

            )
        }

        <button disabled={ currentPage >= numberOfPage - 1 } onClick={() => setCurrentPage( currentPage + 1)} className='btn btn-success'>&gt;&gt; Next</button>
    </div>
  )
}

export default Pagination