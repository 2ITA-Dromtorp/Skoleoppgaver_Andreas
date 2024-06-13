import { Link } from 'react-router-dom';
import '../navStyles.css'
import { User, Home } from 'lucide-react';

export default function NavBar() {


    return (

        <header>

        <nav className='navBar'>
        <Link className='navlogoDiv' to={"/"}> 
        
            <div className='logo'><Home/></div>

        </Link> 
          <div className='navbuttonDiv'>
          <Link className='navbuttonsubDiv' to={'/register'}> <div className='logo'><User/></div></Link>
          </div>
        </nav>
        </header>
    );
}