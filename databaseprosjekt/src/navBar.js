// import logo from './images/logo.gif';
import logo from './images/dromtorp-videregaende-skole.svg';
import { Link } from 'react-router-dom';
import { IsLoggedInContext, FirstnameContext } from './context.js';
import { useContext, useState } from 'react';

function NavBar(){
    const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);
    const { Firstname, setFirstname } = useContext(FirstnameContext);


    function loginout(){
        if (isLoggedIn === false){
            setIsLoggedIn(true);
            setFirstname("Andreas");
        }
        else{
            setIsLoggedIn(false);
            setFirstname("");
        }
        console.log(isLoggedIn)
    }

    return (


        // <nav>
        //     <div className='navDiv' id='navLogoDiv'><Link to='/'><img id='logo' src={logo} alt="logo"/></Link></div>
        //     <div className='navDiv' ><a>WAA</a></div>
        //     <div className='navDiv' ><Link to='/login'><a>Login/Register</a></Link></div>
        // </nav>


        <header>

        <nav className='navBar'>
        <Link className='navlogoDiv' to={"/"}> 
        
            <img className='logo' src={logo}/>
        
          </Link> 
          <div className='navbuttonDiv'>
          <div className='navbuttonsubDiv'><button className='navButton' onClick={loginout}>Min konto</button></div>
          <div className='navbuttonsubDiv'><Link to={'/equipmentTable'}><button className='navButton'>Elev</button></Link></div>
          {isLoggedIn?<Link className='navbuttonsubDiv' to={'/'}><button className='navButton'>Logg ut</button></Link>:<Link className='navbuttonsubDiv' to={'/login'}><button className='navButton'>Logg inn/Registrer deg</button></Link>} 
          </div>
        </nav>
        </header>
    )

}

export default NavBar