import { Link } from 'react-router-dom'
import placeHolderIMG from './images/melvin.jpg'
import { useEffect } from 'react'


function Home() {



    return (
        <main className="mainBox">
            <h1 className="homeHeader">Voksenoppærling</h1>
            <div className="kursContainer">
                <div className='kursCardDiv'>
                    <Link className='kursCard' to={"kurs/Kroppsøving"}> 
                        <div className='kursIMGDiv'><img className='kursIMG' src={placeHolderIMG}/></div>
                        <div className='kursH2Div'><h2>Kroppsøving</h2></div> 
                        <div className='kursPDiv'><p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p></div>
                        <div className='kursButtonDiv'><button className='kursButton'>Mer info</button></div>
                    </Link>
                </div>
                <div className='kursCardDiv'>
                    <Link className='kursCard' to={"kurs/Heimkunnskap"}> 
                        <div className='kursIMGDiv'><img className='kursIMG' src={placeHolderIMG}/></div>
                        <div className='kursH2Div'><h2>Heimkunnskap</h2></div> 
                        <div className='kursPDiv'><p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p></div>
                        <div className='kursButtonDiv'><button className='kursButton'>Mer info</button></div>
                    </Link>
                </div>
                <div className='kursCardDiv'>
                    <Link className='kursCard' to={"kurs/Norsk"}> 
                        <div className='kursIMGDiv'><img className='kursIMG' src={placeHolderIMG}/></div>
                        <div className='kursH2Div'><h2>Norsk</h2></div> 
                        <div className='kursPDiv'><p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p></div>
                        <div className='kursButtonDiv'><button className='kursButton'>Mer info</button></div>
                    </Link>
                </div>
                <div className='kursCardDiv'>
                    <Link className='kursCard' to={"kurs/Datakunnskap"}> 
                        <div className='kursIMGDiv'><img className='kursIMG' src={placeHolderIMG}/></div>
                        <div className='kursH2Div'><h2>Datakunnskap</h2></div> 
                        <div className='kursPDiv'><p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p></div>
                        <div className='kursButtonDiv'><button className='kursButton'>Mer info</button></div>
                    </Link>
                </div>
                
            </div>
        </main>
    )

}

export default Home