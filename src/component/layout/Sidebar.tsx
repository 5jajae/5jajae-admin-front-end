import { SidebarProps } from '../../types/common/props/sidebar/sidebarProps.ts';
import { Image, Nav, Navbar } from 'react-bootstrap';
import styles from './Main.module.css';
import { Link } from 'react-router-dom';

const Sidebar = ({ items }: SidebarProps) => {
  return (
    <div className={styles.sidebar}>
      <Navbar.Collapse className="show" id="ojajae-admin-sidebar">
        <Navbar.Brand>
          <Link to="/">
            <Image src="/logo.png" alt="logo" style={{ width: '160px' }} />
          </Link>
        </Navbar.Brand>
        <Nav navbarScroll className="flex-column">
          {items?.length &&
            items.map((item) => (
              <Navbar key={item.link}>
                <Link to={item.link}>{item.title}</Link>
              </Navbar>
            ))}
        </Nav>
      </Navbar.Collapse>
    </div>
  );
};

export default Sidebar;
