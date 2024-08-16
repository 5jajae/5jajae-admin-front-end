import { DefaultProps } from '../../types/common/props/props.ts';
import styles from './Main.module.css';
import { Navbar } from 'react-bootstrap';

const Content = ({ children }: DefaultProps) => {
  return (
    <div className={styles.main}>
      <div className={styles.nav}>
        <Navbar.Toggle aria-controls="ojajae-admin-sidebar">햄버거</Navbar.Toggle>
      </div>
      {children}
    </div>
  );
};

export default Content;
