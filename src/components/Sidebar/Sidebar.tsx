import { List, ListItemText, Drawer, ListItemButton, Typography, Divider } from '@mui/material';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { UserType } from '../../types/users';
import { sidebarItems } from '../../utils/sidebarHelper';
import styles from './sidebar.module.css';

export type SidebarProps = {
  userType: UserType;
}
export const Sidebar: FunctionComponent<SidebarProps> = ({ userType = 'Author' }): JSX.Element => {
  return (
    <Drawer variant="permanent" open className={styles.sidebar}>
      <List>
        <ListItemText style={{ height: '64px' }} />
        <ListItemText style={{ paddingLeft: '10px' }}>Your Role: {userType}</ListItemText>
        <Divider />
        {
          sidebarItems[userType].map(({ label, link }) => (
            <Link key={label + link} to={'/' + link} style={{ all: 'unset' }}>
              <ListItemButton key={label} style={{ padding: '10px' }} >
                <ListItemText primary={label} />
              </ListItemButton>
            </Link>
          ))
        }
      </List >
    </Drawer >
  );
};
