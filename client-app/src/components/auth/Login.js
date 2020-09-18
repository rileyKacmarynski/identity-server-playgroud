import { useAuth } from './hooks';

function Login() {
    const { login } = useAuth();
    login();
    return null;
}

export default Login
