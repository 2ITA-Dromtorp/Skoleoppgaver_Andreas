import { useState, useEffect } from 'react';
import arrowup from './images/arrowup.png'
import ConfettiExplosion from 'react-confetti-explosion';
function DeloppgaveA() {

    return (
        <div className="deloppgave">
            <h2> Deloppgave a</h2>
            <p> Hva skriver du i javascript dersom du vil gi variabelen test verdien 8? Hvilken datatype er dette? </p>
            <p> Svar: let test = 8 </p>
            <p> Svar: Se console loggen nå {console.log(typeof(8))} </p>
        </div>
    )
}

function DeloppgaveB() {

    // Vi skal lage funksjon som regner ut areal av en trekant og et rektangel.


}


function DeloppgaveC() {
    const [isButtonVisible, setButtonVisible] = useState(true);
  
    const handleClick = () => {
      // Toggle the visibility of the button when it's clicked
      setButtonVisible(!isButtonVisible);
    };
    const [bredde, setBredde] = useState(0)
    const [lengde, setLengde] = useState(0)
    
    function updateBredde(event) {
        console.log('update field')
        console.log(event.target.value)
        setBredde(event.target.value)
    }
    function updateLengde(event) {
        console.log('update field')
        console.log(event.target.value)
        setLengde(event.target.value)
    }
    
    return (
        <>
   <div>
      {isButtonVisible ? (
        <button onClick={handleClick}>Oppgave 2C</button>
      ) : (
        
        <div>
            <button onClick={handleClick}>Skjul</button>
           <h1> Deloppgave C. </h1>
            <h2> Areal av en trekant:  </h2>
            <input type="number" value={bredde} onChange={updateBredde}/>
            <input type="number" value={lengde} onChange={updateLengde}/>

            <h3>Arealet for rektangel: {bredde * lengde} </h3>
            <h3>Arealet for trekant: {(bredde * lengde)/2}</h3>
        
        </div>
      )}
    </div>

      


        </>
    )
}


function Pil() {

    const [count, setCount] = useState(0);

    function addOne() {
        setCount(count + 1)
    }
    function removeOne() {
        setCount(count - 1)
    }

    return (
        <div className='box'>
        <h1> En pil </h1>
<button count={count} onClick={addOne}>
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="1600.000000pt" height="1600.000000pt" viewBox="0 0 1600.000000 1600.000000" preserveAspectRatio="xMidYMid meet" className='arrow' alt='arrowup'> <g transform="translate(0.000000,1600.000000) scale(0.100000,-0.100000)" fill="" stroke="none"> <path d="M4996 11995 l-2996 -3995 2000 0 2000 0 0 -4000 0 -4000 2000 0 2000 0 0 4000 0 4000 2000 0 2000 0 -2996 3995 c-1648 2197 -3000 3995 -3004 3995 -4 0 -1356 -1798 -3004 -3995z"/> </g> </svg> 
</button>
        <p className='sirkel'>{count}</p>
<button onClick={removeOne}>
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="1600.000000pt" height="1600.000000pt" viewBox="0 0 1600.000000 1600.000000" preserveAspectRatio="xMidYMid meet" className='arrow arrowdown' alt='arrowdown'> <g transform="translate(0.000000,1600.000000) scale(0.100000,-0.100000)" fill="" stroke="none"> <path d="M4996 11995 l-2996 -3995 2000 0 2000 0 0 -4000 0 -4000 2000 0 2000 0 0 4000 0 4000 2000 0 2000 0 -2996 3995 c-1648 2197 -3000 3995 -3004 3995 -4 0 -1356 -1798 -3004 -3995z"/> </g> </svg> 
</button>
        </div>

    )

}

function Klokke () {
    



        let time = new Date();
        let timeString = time.toTimeString();

        const [currentTime, setCurrentTime] = useState(new Date);


        useEffect(() => {
           const myInterval = setInterval(() => {
                setCurrentTime(new Date);
                }, 1000);

            console.log("Utvikling er kult")
            
            return () => clearInterval(myInterval);
        });

        return (
            <>
            <h1> Digital klokke</h1>
            <h2> {currentTime.toTimeString()} </h2>
            </>
        )
    

    

}



function Conf() {
  const [isExploding, setIsExploding] = useState(false);
  return <>{isExploding &&     <ConfettiExplosion

    width={window.innerWidth}

    height={window.innerHeight}

    numberOfPieces={500}

    recycle={false}

      />}</>;
}

function Oppgave2() {


    return (
        <>
            <h1> Dette er oppgave 1 </h1>
            <DeloppgaveA />
            <DeloppgaveB />
            <DeloppgaveC />
            <Klokke/>
            <Pil/>
            <Conf/>
        </>
    )

}

export default Oppgave2;