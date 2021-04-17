import BalanceData from './BalanceData';
import History from './History';

//import { GlobalProvider } from './context/GlobalState';
import './App.css';

function App() {

  return (
    //<GlobalProvider>
      <div className="App">
        <div className="title">
          <h2>EXPENSE TRACKER</h2>
        </div>
        <div className="main">
          <div className="left-half">
            <BalanceData />
          </div>
          <History />
        </div>
      </div>
    //</GlobalProvider>
  );
}

export default App;
