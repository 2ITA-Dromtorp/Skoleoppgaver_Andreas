import { Link } from 'react-router-dom'
import placeHolderIMG from './images/melvin.jpg'
import { useEffect } from 'react'
import { FirstnameContext } from './context';
import { useContext } from 'react';
import norskIMG from './images/norsk.png'
import kroppsovingIMG from './images/kroppsoving.jpg'
import datakunnskapIMG from './images/datakunnskap.jpg'
import heimkunnskapIMG from './images/heimkunnskap.jpg'


function Home() {
    const { Firstname, setFirstname } = useContext(FirstnameContext);

    return (
        <main className="mainBox">
            <h1 className="homeHeader">Voksenoppærling</h1>
            <h2 className='homeH2'>Velkommen til oss {Firstname} !</h2>
            <div className="kursContainer">
                <div className='kursCardDiv'>
                    <Link className='kursCard' to={"kurs/Kroppsøving"}> 
                        <div className='kursIMGDiv'><img className='kursIMG' src={kroppsovingIMG}/></div>
                        <div className='kursH2Div'><h2>Kroppsøving</h2></div> 
                        <div className='kursPDiv'><p>Voksenopplæringskurs i kroppsøving</p></div>
                        <div className='kursButtonDiv'><button className='kursButton'>Mer info</button></div>
                    </Link>
                </div>
                <div className='kursCardDiv'>
                    <Link className='kursCard' to={"kurs/Heimkunnskap"}> 
                        <div className='kursIMGDiv'><img className='kursIMG' src={heimkunnskapIMG}/></div>
                        <div className='kursH2Div'><h2>Heimkunnskap</h2></div> 
                        <div className='kursPDiv'><p>Gir praktisk opplæring i matlaging</p></div>
                        <div className='kursButtonDiv'><button className='kursButton'>Mer info</button></div>
                    </Link>
                </div>
                <div className='kursCardDiv'>
                    <Link className='kursCard' to={"kurs/Norsk"}> 
                        <div className='kursIMGDiv'><img className='kursIMG' src={norskIMG}/></div>
                        <div className='kursH2Div'><h2>Norsk</h2></div> 
                        <div className='kursPDiv'><p>Norsk voksenopplæringskurs</p></div>
                        <div className='kursButtonDiv'><button className='kursButton'>Mer info</button></div>
                    </Link>
                </div>
                <div className='kursCardDiv'>
                    <Link className='kursCard' to={"kurs/Datakunnskap"}> 
                        <div className='kursIMGDiv'><img className='kursIMG' src={datakunnskapIMG}/></div>
                        <div className='kursH2Div'><h2>Datakunnskap</h2></div> 
                        <div className='kursPDiv'><p>Voksenopplæringskurs i datakunnskap</p></div>
                        <div className='kursButtonDiv'><button className='kursButton'>Mer info</button></div>
                    </Link>
                </div>
                
            </div>
        </main>
    )

}

export default Home