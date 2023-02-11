import { PAGE, pages } from "../../types/pages";
import { UserType } from "../../types/users";

export type SidebarItemLinkType = {
    label: PAGE;
    link: typeof pages[PAGE];
};

export type SidebarItemType = {
    [key in UserType]: SidebarItemLinkType[];
};
