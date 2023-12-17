import { NavLink } from "react-router-dom"


const Header = () => {
  return (
      <nav>
          <div><span>Navbar</span></div>
          <div>
              <ul>
                  <li><NavLink to='/'>Home</NavLink></li>
                  <li><NavLink to='/movies'>Movies</NavLink></li>
              </ul>
          </div>
      </nav>
  )
}

export default Header