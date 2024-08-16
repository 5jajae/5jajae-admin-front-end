import { Outlet } from 'react-router';
import Sidebar from './Sidebar.tsx';
import Content from './Content.tsx';
import { DefaultProps } from '../../types/common/props/props.ts';
import { menus } from '../../const/menus.ts';
import styles from './Main.module.css';

const AdminLayout = ({ children }: DefaultProps) => {
  return (
    <div className={styles.wrapper}>
      <Sidebar items={menus} />
      <Content>
        {children}
        <Outlet />
      </Content>
    </div>
  );
};

export default AdminLayout;
