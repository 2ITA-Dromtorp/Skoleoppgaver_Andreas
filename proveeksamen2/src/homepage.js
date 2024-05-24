import { Link } from "react-router-dom";
export default function Homepage() {
    return (
        <div className="homepageContainer">
            <div className="homepageButtonDiv">
                <Link to="/products"><button className="homepageButton">Meny</button></Link>
            </div>
        </div>
    );
}