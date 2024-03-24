import logo from './images/dromtorp-videregaende-skole.svg'
import { Route, Routes, Link } from 'react-router-dom';
import { useState, useContext } from 'react';   
import { IsLoggedInContext } from './context';


function Navbar() {

    const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);

    function logout() { 
        setIsLoggedIn(true);
    }

    return (
<header>

<nav className='navBar'>
<Link className='navlogoDiv' to={"/"}> 

    <img className='logo' src={logo}/>

  </Link> 
  <div className='navbuttonDiv'>
  <div className='navbuttonsubDiv'><button className='navButton'>Min profil</button></div>
  <div className='navbuttonsubDiv'><button className='navButton'>Om oss</button></div>
  {isLoggedIn?<button onClick={logout()}>Logg ut</button>:<Link className='navbuttonsubDiv' to={'/loginpage'}><button className='navButton'>Logg inn/Registrer deg</button></Link>} 
  </div>
</nav>
</header>
    )
}

export default Navbar;
