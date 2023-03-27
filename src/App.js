import { AuthenticatedApp } from './components/AuthenticatedApp';
import { UnauthenticatedApp } from './components/UnauthenticatedApp';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import './App.css';

function App() {
    const { user } = useAuth();

    return (
        <div className="container">
            <h1>Welcome!</h1>
            {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
            
        </div>
    );
}

export default App;