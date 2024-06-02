import { Link } from 'react-router-dom';
import logo from './images/dromtorp-videregaende-skole.svg';
import handlekurvKnapp from './images/handleKurv.svg';

export default function NavBar() {

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