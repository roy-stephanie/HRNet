import {NavLink, Outlet} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store/store';

const Layout = () => (
  <>
    <Provider store={store}>
      <main>
        <header className="header">
          <ul>
            <li>HRNet</li>
            <li>
              <NavLink
                to="/"
                className={({isActive}) => (isActive ? "active" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/employees"
                className={({isActive}) => (isActive ? "active" : "")}
              >
                Employees
              </NavLink>
            </li>
          </ul>
        </header>
        <Outlet/>
      </main>
    </Provider>
  </>
);

export default Layout;
