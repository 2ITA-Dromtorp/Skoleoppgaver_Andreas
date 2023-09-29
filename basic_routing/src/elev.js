import { Link } from "react-router-dom";

export default function Elev(props) {

    let name = props.name;
    console.log(name)
    return(

        <div className='person'>
                     <Link to={name}> {name}  </Link>
        </div>

    )

}