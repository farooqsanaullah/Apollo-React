import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router , Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import MenuBar from './components/MenuBar';
import {Container} from 'semantic-ui-react'

import { ApolloClient, InMemoryCache } from '@apollo/client';

import { ApolloProvider } from '@apollo/client';


 const client = new ApolloClient({
  uri: 'http://localhost:5000/',
  cache: new InMemoryCache()
});
console.log(client);

function App() {
  return (
    <Router>
    <Container>
    <ApolloProvider client={client}>
    <MenuBar/>
    <Route exact path="/" component={Home}  />
    <Route exact path="/login" component={Login}  />
    <Route exact path="/register" component={Register}  />
    </ApolloProvider>
    </Container>

    </Router>
  );
}

export default App;
