import { useLocation, NavLink, Link } from "react-router-dom";
import orderBy from "lodash/orderBy";
import { List, ListItem, ListItemButton } from '@mui/material';

import { searchRoute } from "../../utils/services";
import { VITE_APP } from "../../utils/constants";

import logo from "../../assets/react.svg";

import { PropsSidebar, PropsRoute } from '../../utils/interfaces';
import Container from './styles';

const Sidebar = ({ color, image, routes, onClean }: PropsSidebar) => {
  const location = useLocation();

  const activeRoute = (routeName: string) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  return (
    <Container>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")"
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo">
          <Link to={searchRoute('home')} onClick={() => onClean()} className="logo-mini">
            <div className="logo-img">
              <img src={logo} alt="..." />
            </div>

            <div className="simple-text">
              {VITE_APP.APP_NAME}
            </div>
          </Link>
        </div>

        <List component="nav" >
          {orderBy(routes.filter((route: PropsRoute) => route.isMenu), ['index'], ['asc']).map((prop: PropsRoute, key: number) => {
            return (
              <ListItem
                className={activeRoute(prop.path)}
                key={key}
              >
                <NavLink
                  to={prop.path}
                  onClick={() => onClean()}
                  style={{ textDecoration: 'none' }}
                >
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </ListItem>
            );
          })}
        </List>
      </div>
    </Container>
  );
}

export default Sidebar;
