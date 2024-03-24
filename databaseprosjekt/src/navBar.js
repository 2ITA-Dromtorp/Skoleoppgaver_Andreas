// import logo from './images/logo.gif';
import logo from './images/dromtorp-videregaende-skole.svg';
import { Link } from 'react-router-dom';

export default function navBar(){
    let isLoggedIn = false
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
          <div className='navbuttonsubDiv'><button className='navButton'>Min profil</button></div>
          <div className='navbuttonsubDiv'><Link to={'/equipmentTable'}><button className='navButton'>Elev</button></Link></div>
          {isLoggedIn?<button>Logg ut</button>:<Link className='navbuttonsubDiv' to={'/login'}><button className='navButton'>Logg inn/Registrer deg</button></Link>} 
          </div>
        </nav>
        </header>
    )

}
