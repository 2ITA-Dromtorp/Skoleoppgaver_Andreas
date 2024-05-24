import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import logo from './images/dromtorp-videregaende-skole.svg';
import handlekurvKnapp from './images/handleKurv.svg';
import { IsLoggedInContext } from './context';

export default function NavBar() {

    const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);

    setIsLoggedIn(sessionStorage.getItem("isLoggedIn"));

    function logout(){
        setIsLoggedIn(false);
        sessionStorage.clear();
        console.log(isLoggedIn)
        console.log(sessionStorage)
    }

    return (

        <header>

        <nav className='navBar'>
        <Link className='navlogoDiv' to={"/"}> 
        
            <img className='logo' src={logo}/>
        
        </Link> 
          <div className='navbuttonDiv'>
          <Link className='navbuttonsubDiv' to={'/handlekurv'}><button className='navButton'><img src={handlekurvKnapp}/></button></Link>
          </div>
        </nav>
        </header>
    );
}