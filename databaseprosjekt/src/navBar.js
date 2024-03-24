import logo from './images/logo.gif';
export default function navBar(){

    return (
        <nav>
            <div className='navDiv' id='navLogoDiv'><img id='logo' src={logo} alt="logo"/></div>
            <div className='navDiv' ><a>WAA</a></div>
            <div className='navDiv' ><a>WAA</a></div>
        </nav>
    )

}
