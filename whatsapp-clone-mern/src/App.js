import { useEffect } from 'react';
import './App.css';
import Chat from './Components/Chat/Chat';
import Sidebar from './Components/Sidebar/Sidebar';
import Pusher from 'pusher-js';

function App() {

  useEffect(() => {
    const pusher = new Pusher('12852351f22566cbb74b', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('message');
    channel.bind('inserted', (data) => {
      alert(JSON.stringify(data));
    });
  }, [])

  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
