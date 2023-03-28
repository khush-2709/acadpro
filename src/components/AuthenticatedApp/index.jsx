import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Landing } from '../Landing';
import { ChatRoom } from '../ChatRoom';
import {Todo} from '../Todo';
import {Assignments} from '../Assignments'

function AuthenticatedApp() {

    

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/room/:id" element={<ChatRoom />} />
                <Route path="/todo" element={<Todo />} />
                <Route path="/assignments" element={<Assignments />} />
            </Routes>
        </BrowserRouter>
    );
}



export { AuthenticatedApp };