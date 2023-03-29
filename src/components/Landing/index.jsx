import { Link, useNavigate} from 'react-router-dom';
import { chatRooms } from '../../data/chatRooms';
import './styles.css';

function Landing() {

    const navigate=useNavigate();

    const navigateToTodo = () => {
        navigate('/todo');
    };
    const navigateToAssignments = () => {
        navigate('/assignments');
    };
    const navigateLogout = () => {
        navigate('/logout');
    };
    return (
        <>
            <button onClick={navigateToTodo}>TodoList</button>
            <button onClick={navigateToAssignments}>Assignments</button>
            <h2>Choose a Chat Room</h2>
            <ul className="chat-room-list">
                {chatRooms.map((room) => (
                    <li key={room.id}>
                        <Link to={`/room/${room.id}`}>{room.title}</Link>
                    </li>
                ))}
            </ul>
            <button onClick={navigateLogout}> Logout </button>
        </>
    );
    
    
}

export { Landing };