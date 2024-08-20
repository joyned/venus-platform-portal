import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";

interface GuardComponentProps {
    children: ReactElement | ReactElement[];
    rolesToAccess?: string[];
}

export default function GuardComponent(props: GuardComponentProps) {
    const navigate = useNavigate();
    const [isAuthenticated] = useState(localStorage.getItem('access_token') !== null);
    const userRole = UserService.getCurrentUserRole();
    const userHasAccess = props.rolesToAccess ? props.rolesToAccess.includes(userRole) : true;

    if (!userHasAccess) {
        return (
            <div>
                <h1>Access denied</h1>
                <p>You don't have permission to access this page.</p>
            </div>
        )
    }

    if (isAuthenticated) {
        return (
            <>
                {props.children}
            </>
        );
    } else {
        setTimeout(() => {
            navigate('/login');
        }, 2000);
        return (
            <div>
                <h1>Not authenticated</h1>
                <p>Redirecting you to login.</p>
            </div>
        );
    }
}