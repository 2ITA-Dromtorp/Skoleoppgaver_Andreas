
export default function Elev(props) {

    let name = props.name;
    console.log(name);

    function handleClick() {
        console.log('Elev clicked')
    }

    return (

        <div onClick={handleClick} className='person'>
          {name}
        </div>
        
    )
}