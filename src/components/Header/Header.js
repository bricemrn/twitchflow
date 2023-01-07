import React, {useState, useEffect} from "react";
import logo from "./images/twitch-logo.jpg";
import menu from "./images/menu.png";
import closeIcon from "./images/close.png";
import searchIcon from "./images/search-icon.svg";
import gameIcon from "./images/console.png";
import liveIcon from "./images/live.png";
import {Link} from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function Header() {

    // Menu burger
    
    const [menuBurgerStatus, setMenuBurgerStatus] = useState(false);

    // Search

    const [searchInput, setSearchInputs] = useState('');

    const handleKeyPress = (e) => {
        setSearchInputs(e.target.value);
    }

    const handleSubmit = (e) => {
        setMenuBurgerStatus(!menuBurgerStatus)
    }

    return(

        <div className="navLeft">
            <nav>
                <div className="navLogo">
                    <Link className="navLink" to="/">
                        <img src={logo} alt="twitch-logo" className="twitchLogo"/>
                    </Link>
                </div>
                <div className="burger" onClick={() => setMenuBurgerStatus(!menuBurgerStatus)}>
                    <img src={menu} alt="burger-icon" className={`openMenu ${!menuBurgerStatus ? 'showOpenMenu' : 'hideOpenMenu'}`}/>
                    <img src={closeIcon} alt="" className={`closeMenu ${menuBurgerStatus ? 'showCloseMenu' : 'hideCloseMenu'}`}/>
                </div>
                    
                    <div className={`navItems ${menuBurgerStatus ? 'showMenuBurger' : ''}`} menuBurgerStatus={menuBurgerStatus} setMenuBurgerStatus={setMenuBurgerStatus}>
                        <ul>
                            <li className="searchForm">
                                <form>
                                    <input type="text" name="search" placeholder="Rechercher..." value={searchInput} onChange={(e) => handleKeyPress(e)} required/>
                                    <Link to={{pathname: `/recherche/${searchInput}`}}>
                                        <button type="submit" onClick={handleSubmit}><img src={searchIcon} alt="search-solid"/></button>
                                    </Link>
                                </form>
                            </li>
                            <NavLink className="navLink" to="/top-games" activeStyle={{backgroundColor:"#7145b3",borderLeft:"4px solid #fff"}}>
                                <li className="item" onClick={() => setMenuBurgerStatus(!menuBurgerStatus)}><img src={gameIcon} alt=""/>Top jeux</li>
                            </NavLink>
                            <NavLink className="navLink" to="/top-streamers" activeStyle={{backgroundColor:"#7145b3",borderLeft:"4px solid #fff"}}>
                                <li className="item" onClick={() => setMenuBurgerStatus(!menuBurgerStatus)}><img src={liveIcon} alt=""/>Top streams</li>
                            </NavLink>
                        </ul>
                    </div>
            </nav>
        </div>

    )
}

export default Header;
