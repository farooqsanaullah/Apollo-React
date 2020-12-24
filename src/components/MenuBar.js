import React,{useState,useContext} from 'react'
import { Menu  } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import { AuthContext} from '../Context/auth';
function MenuBar() {
const {user,logout} = useContext(AuthContext)

 const handleItemClick = (e, { name }) => setActiveItem(name);

const pathName = window.location.pathname;

const path = pathName === '/'? 'home':pathName.substr(1);
 
   const [activeItem,setActiveItem]=useState(path);

  
   
    const MenuBar = user?(<Menu pointing secondary>
      <Menu.Item
        name={user.username}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
      
      <Menu.Item
        name='Logout'
        onClick={logout}
        
      />
      </Menu.Menu>
    </Menu>):(<Menu pointing secondary>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
      <Menu.Item
        name='register'
        active={activeItem === 'register'}
        onClick={handleItemClick}
        as={Link}
        to="/register"
      />
      <Menu.Item
        name='login'
        active={activeItem === 'login'}
        onClick={handleItemClick}
        as={Link}
        to="/login"
      />
      </Menu.Menu>
    </Menu>)
     
    return MenuBar
  
}

export default MenuBar 