import { useContext, useEffect, useState } from 'react';
import './App.css';
import Chat from './Components/Chat/Chat';
import Sidebar from './Components/Sidebar/Sidebar';
import Pusher from 'pusher-js';
import axios from './axios';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Components/Login/Login';
import { AuthContext } from './Store/Context';

function App() {

  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  console.log('user ---> ', user);

  useEffect(() => {
    const pusher = new Pusher('12852351f22566cbb74b', {
        cluster: 'eu'
    });

    const Msgchannel = pusher.subscribe('message');
    Msgchannel.bind('inserted', (data) => {
        setMessages([...messages, data])
    });

    return () => {
        Msgchannel.unbind_all();
        Msgchannel.unsubscribe();
    }
}, [messages])

console.log(messages);

  return (
    <div className="app">
      {!user ? (
        <Login/>
      ) : (
        <div className="app_body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat messages={messages} setMessages={setMessages} />
              </Route>
            </Switch>
          </Router>
        </div>
      )}

    </div>
  );
}

export default App;
