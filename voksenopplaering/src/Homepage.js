import placeHolderIMG from './images/catTank.jpg'


function Home() {

    return (
        <main className="mainBox">
            <h1 className="homeHeader">Voksenoppærling</h1>
            <div className="kursContainer">
                <div className="kursCard">
                   <div className='kursIMGDiv'><img className='kursIMG' src={placeHolderIMG}/></div>
                   <div className='kursH2Div'><h2>Kroppsøving</h2></div> 
                   <div className='kursPDiv'><p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p></div>
                   <div className='kursButtonDiv'><button className='kursButton'>Mer info</button></div> 

                </div>
            </div>
        </main>
    )

}

export default Home