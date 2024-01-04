import logo from './images/svg.svg'

export default function Navbar() {

    return (
        <header className="navBar">
            <nav className='navContent'>
                <h1 className='logo' src={logo}>VTH</h1>
            </nav>
        </header>
    )
}