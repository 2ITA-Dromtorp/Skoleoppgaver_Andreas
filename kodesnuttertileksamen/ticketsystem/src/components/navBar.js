import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import '../navStyles.css'
import logo from '../images/logo.webp';
import handlekurvKnapp from '../images/handleKurv.svg';


export default function NavBar() {


    return (

        <header>

        <nav className='navBar'>
        <Link className='navlogoDiv' to={"/"}> 
        
            <h1 className='logoText'>TicketSystem</h1>
        
        </Link> 
          <div className='navbuttonDiv'>
          <Link className='navbuttonsubDiv' to={'/register'}><button className='navButton'><img src={handlekurvKnapp}/></button></Link>
          </div>
        </nav>
        </header>
    );
}