import './NavBar.css';
import Switch from '@material-ui/core/Switch';
import  { useState } from 'react';


const ModeSwitch = () => {
  const [mode, setMode] = useState(true);

  const handleChange = () => {
    const body = document.getElementsByTagName("body")[0];
     body.setAttribute("data-theme" , !mode ? "light" : "dark");
      setMode(prev => !prev);
    };

  return (
    <div className = "mode_switch">
    <Switch
      checked={mode}
      color="default"
      onChange={handleChange}
    />
   </div>
  )
}


function NavBar() {

  return (<>
    <header className="top">
      <nav className="nav_top">  
      <div className="credit">Created by Roei Rabany</div>   
      </nav>
      <ModeSwitch/>
    </header>
   <div className="block" ></div>
   </>
  );
}

export default NavBar;