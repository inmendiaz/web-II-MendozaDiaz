import './App.css';
import "./style/Login.css";
import MyFirstComponent from './components/MyFirstComponent';
import Form from './components/Form/Form';
import Profile from "./components/Profile";
import { UserContextProvider } from './context/user-context';
import { Link } from 'react-router-dom';
import MyRouters from './router/Router';
import ProductList from './page/ProductList';
import CreateProduct from './page/Createproduct';
import Menu from './page/base/Menu';

function App() {
  return (
    <UserContextProvider>
      <Menu />
    </UserContextProvider>
  );
}

export default App;
