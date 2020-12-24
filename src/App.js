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
import  {AuthProvider}  from './Context/auth'
import AuthRouter from './Context/AuthRouter'
import {setContext} from 'apollo-link-context'
import {createHttpLink} from 'apollo-link-http'


const httpLink = createHttpLink({
  uri: 'http://localhost:5000/'
})

const authLink = setContext(()=>{
  const token = localStorage.getItem('jwtToken')

  return{
    headers: {Authorization:token ? `Bearer ${token}`:''}
    }

})

 const client = new ApolloClient({
  link:authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
console.log(client);

function App() {
  return (
    <AuthProvider>
    <Router>
    <Container>
    <ApolloProvider client={client}>
    <MenuBar/>
    <Route exact path="/" component={Home}  />
    <AuthRouter exact path="/login" component={Login}  />
    <AuthRouter exact path="/register" component={Register}  />
    </ApolloProvider>
    </Container>

    </Router>
    </AuthProvider>
  );
}

export default App;
