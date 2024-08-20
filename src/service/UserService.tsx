export default class UserService {
    public static getCurrentUserRole(): string {
        const token = localStorage.getItem('access_token');
        if (token) {
            const payload = token.split('.')[1];
            const decoded = atob(payload);
            const user = JSON.parse(decoded);
            return user.role;
        }
        return "";
    }
}