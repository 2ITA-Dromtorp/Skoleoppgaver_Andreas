import Select from './select.js';
import Update from './update.js';
import Insert from './insert.js';
import Delete from './delete.js';
import { useState } from 'react';


export default function Navbar() {

    const [content, setContent] = useState(<Select/>);

    function selectPush() {
        setContent(<Select/>);
    }

    function updatePush() {
        setContent(<Update/>);
    }

    function insertPush() {
        setContent(<Insert/>);
    }

    function deletePush() {
        setContent(<Delete/>);
    }

    return (
        <>
        <nav className="navbar">
            <div className="buttonDiv">
            <button className="navButton" onClick={selectPush}>SELECT</button>
            </div>
            <div className="buttonDiv">
            <button className="navButton" onClick={updatePush}>UPDATE</button>
            </div>
            <div className="buttonDiv">
            <button className="navButton" onClick={insertPush}>INSERT</button>
            </div>
            <div className="buttonDiv">
            <button className="navButton" onClick={deletePush}>DELETE</button>
            </div>

        </nav>
                    <div className='mainBox'>
                    {content}
                    </div>
                    </>
    );
}