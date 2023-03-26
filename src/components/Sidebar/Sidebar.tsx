import { Divider, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { UserRoleType } from '../../types/users';
import { sidebarItems } from '../../utils/sidebarHelper';
import styles from './sidebar.module.css';

export type SidebarProps = {
  userType?: UserRoleType;
}
export const Sidebar: FunctionComponent<SidebarProps> = ({ userType = 'Author' }): JSX.Element => {
  return (
    <Drawer variant="permanent" open className={styles.sidebar}>
      <List>
        <ListItemText style={{ height: '64px' }} />
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
