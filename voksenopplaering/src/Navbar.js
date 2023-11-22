import logo from './images/dromtorp-videregaende-skole.svg'
import { Route, Routes, Link } from 'react-router-dom';

function Navbar() {
    return (
<header>
<nav className='navBar'>
  <div className='navlogoDiv'>
    <img className='logo' src={logo}/>
  </div>
  <div className='navbuttonDiv'>
  <div className='navbuttonsubDiv'><button className='navButton'>Min profil</button></div>
  <div className='navbuttonsubDiv'><button className='navButton'>Om oss</button></div>
  <div className='navbuttonsubDiv'><button className='navButton'>Kontakt oss</button></div>
  </div>
</nav>

{/* <p>dewfopkdjfwpfji</p> */}
</header>
    )
}

export default Navbar;
