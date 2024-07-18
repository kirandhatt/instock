import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo/InStock-Logo.svg";
import "./Header.scss";

function Header() {
  const location = useLocation();
  const isActive =
    location.pathname === "/" || location.pathname.startsWith("/warehouse");

  const statusClass = isActive ? "active" : "";

  return (
    <header className="header">
      <div className="header__container">
        <Link className="header__logo-link" to="/">
          <img src={logo} alt="instock logo" className="header__logo-icon" />
        </Link>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-button">
              <NavLink className={`header__nav-link ${statusClass}`} to={"/"}>
                Warehouses
              </NavLink>
            </li>
            <li className="header__nav-button">
              <NavLink className="header__nav-link" to="/inventory">
                Inventory
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
