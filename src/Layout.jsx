import { NavLink, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

const Layout = () => (
  <>
    <Provider store={store}>
      <main>
        <header className="">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">HRNet</a>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `nav-link ${isActive ? "active text-white" : "text-light"}`
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/employees"
                      className={({ isActive }) =>
                        `nav-link ${isActive ? "active text-white" : "text-light"}`
                      }
                    >
                      Employees
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <Outlet />
      </main>
    </Provider>
  </>
);

export default Layout;
