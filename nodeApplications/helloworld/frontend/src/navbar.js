export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="buttonDiv">
            <button className="navButton">SELECT</button>
            </div>
            <div className="buttonDiv">
            <button className="navButton">UPDATE</button>
            </div>
            <div className="buttonDiv">
            <button className="navButton">INSERT</button>
            </div>
            <div className="buttonDiv">
            <button className="navButton">DELETE</button>
            </div>
        </nav>
    );
}