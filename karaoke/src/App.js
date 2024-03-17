import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="karaokeWrapper">
      <div className='karaokeHeader'>
        <div className='karaokeSearch'></div>
      </div>
      <div className='songWrapper'>
        <div className='karaokeSongs'>
          <div className='karaokeCard'></div>
          <div className='karaokeCard'></div>
          <div className='karaokeCard'></div>
          <div className='karaokeCard'></div>
        </div>
      </div>
    </div>
  );
}

export default App;
