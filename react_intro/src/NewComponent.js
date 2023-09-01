function MyButton() {
    return (
      <button>
        I'm a button
      </button>
    );
  }

  export default function MyApp() {
    return (
      <div>
        <h1>Welcome to my app</h1>
        <MyButton onClick={console.log("asodiaf")}/>
      </div>
    );
  }

  
  function consolelogger() {
    console.log("morradi")
  }