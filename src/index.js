// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";

import App from './App';
import 'semantic-ui-css/semantic.min.css';

const client = new ApolloClient({
  uri: "https://swapi-graphql-integracion-t3.herokuapp.com/ "
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App client={client}/> 
  </ApolloProvider>,
  document.getElementById('root')
);

// How apollo can help us query data from the server
// client
//   .query({
//     query: gql `
//     {
//       allFilms {
//         edges {
//           node {
//             title
//             releaseDate
//             director
//             producers
//             episodeID
//           }
//         }
//       }
//     }
//     `
//   })
//   .then(result => console.log(result));
