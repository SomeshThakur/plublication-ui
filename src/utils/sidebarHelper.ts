
import { SidebarItemType } from "../components/Sidebar/sidebar-types";
import { PAGE, pages } from "../types/pages";

// - My Publications (Distributor readonly, Editor edit, Author edit)
//     - Dropdown  
//         - Books (CRUD) -> chapter, pages, 
//         - Magazines (CRUD) 
//         - Newpapers
//         - Journals 
// - All Publications (Admin) 
//     - Dropdown  
//         - Books (CRUD) -> chapter, pages, 
//         - Magazines (CRUD) 
//         - Newpapers
//         - Journals 
// - My Orders (Distributor) 
//     - List view
// - All Orders (Admin)
//     - List View 
// - My Payments (Distributor, Editor, Author)
//     - List View
// - All Payments (Admin)
//     - List View
// - Account information (All)
//     - Profile page component
const pagesThatAdminCanSee: PAGE[] = ["Dashboard", "All Orders", "All Payments", "All Publications", "All Users", "My Profile"];
const pagesThatEditorCanSee: PAGE[] = ["Dashboard", "My Publications", "My Payments", "My Profile"];
const pagesThatAuthorCanSee: PAGE[] = ["Dashboard", "My Publications", "My Payments", "My Profile"];
const pagesThatDistributorCanSee: PAGE[] = ["Dashboard", "My Publications", "My Orders", "My Payments", "My Profile"];

const pageKeys = Object.keys(pages);
const filterByPage = (key: PAGE) => pageKeys.includes(key);

const mapPages = (visiblesPages: PAGE[]) => visiblesPages.filter(filterByPage).map((key) => ({ label: key as PAGE, link: pages[key as PAGE] }));

export const sidebarItems: SidebarItemType = {
    Admin: mapPages(pagesThatAdminCanSee),
    Editor: mapPages(pagesThatEditorCanSee),
    Author: mapPages(pagesThatAuthorCanSee),
    Distributor: mapPages(pagesThatDistributorCanSee)
};
