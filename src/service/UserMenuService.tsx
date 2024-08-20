import { FaUser } from "react-icons/fa";
import { FiGitPullRequest } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import IMenuItem from "../model/IMenuItem";
import UserService from "./UserService";

const MENU: IMenuItem[] = [
    {
        title: 'My Profile',
        uri: '/profile',
        icon: <FaUser></FaUser>
    },
    {
        title: 'Management',
        uri: '/manager/workflow',
        accessRole: ['ADMIN', 'MANAGER'],
        icon: <FiGitPullRequest></FiGitPullRequest>
    },
    {
        title: 'Admin',
        uri: '/admin/teams',
        accessRole: ['ADMIN'],
        icon: <RiAdminLine />
    }
]

export default class UserMenuService {
    public static getMenu(): any {
        const userRole = UserService.getCurrentUserRole();
        return MENU.filter(item => {
            if (item.accessRole) {
                return item.accessRole.includes(userRole);
            }
            return true;
        });
    }
}