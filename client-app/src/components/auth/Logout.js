import { useAuth } from './hooks';

const Logout = () => {
    const { logout } = useAuth();
    logout();
    return null;
}

export default Logout;