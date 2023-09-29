import logo from './logo.svg';
import './App.css';

function App() {


  return (
    <div className='container'>
      <header>
        <nav>
          <a className='logoText' href='#'>Klasseliste 2IM Drømtorp</a>
        </nav>
      </header>
      <main className='klassen'>
      <div className='rad1'>
          
        <div className='person lerer'>Lærer</div>



      </div>

      <div className='rad2'>
      <div className='person'>Martin</div>
      <div className='person'>Mathias</div>
      <div className='innaktivperson'></div>
      <div className='person'>Kevin</div>
      <div className='person'></div>
      <div className='person'>Andreas</div>
      </div>

      <div className='rad3'>
      <div className='person'>Falk</div>
      <div className='person'>Sander</div>
      <div className='innaktivperson'></div>
      <div className='person'>Ylva</div>
      <div className='person'>Vanessa</div>
      <div className='person'>Chen</div>
      </div>

      <div className='rad4'>
      <div className='person'></div>
      <div className='person'></div>
      <div className='innaktivperson'></div>
      <div className='person'>Luz</div>
      <div className='person'></div>
      <div className='person'>Fritjof</div>
      </div>
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
