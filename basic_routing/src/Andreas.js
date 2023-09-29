import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


export default function Andreas() {
    return(
        <>
        <div className="Elevinfo">        
        <Link to="/"> <p className='backbutton'>Tilbake </p> </Link>
        <div className='eleven'>
            <h1>Andreas Rovde</h1>
            <h2>2ITA</h2>
        </div>
        </div>

        </>
    )
}