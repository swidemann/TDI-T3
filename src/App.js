// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Films from './components/Films';
import Film from './components/Film';
import Character from './components/Character';
import Starship from './components/Starship';
import Planet from './components/Planet';

const App = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Films} />
      <Route exact path="/films/:id" component={Film} />
      <Route exact path="/characters/:id" component={Character} />
      <Route exact path="/starships/:id" component={Starship} />
      <Route exact path="/planets/:id" component={Planet} />
      <Route render={() => <div>404</div>} />
    </Switch>
  </Router>
)

export default App;
