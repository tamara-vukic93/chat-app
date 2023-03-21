import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import Messages from './Messages';
import Input from './Input';

function App() {
  //Random adjectives and nouns for name creation
  function randomName() {
    const adjectives = [
      'autumn',
      'hidden',
      'bitter',
      'misty',
      'silent',
      'empty',
      'dry',
      'dark',
      'summer',
      'icy',
      'delicate',
      'quiet',
      'white',
      'cool',
      'spring',
      'winter',
      'patient',
      'twilight',
      'dawn',
      'crimson',
      'wispy',
      'weathered',
      'blue',
      'billowing',
      'broken',
      'cold',
      'damp',
      'falling',
      'frosty',
      'green',
      'long',
      'late',
      'lingering',
      'bold',
      'little',
      'morning',
      'muddy',
      'old',
      'red',
      'rough',
      'still',
      'small',
      'sparkling',
      'throbbing',
      'shy',
      'wandering',
      'withered',
      'wild',
      'black',
      'young',
      'holy',
      'solitary',
      'fragrant',
      'aged',
      'snowy',
      'proud',
      'floral',
      'restless',
      'divine',
      'polished',
      'ancient',
      'purple',
      'lively',
      'nameless',
    ];
    const nouns = [
      'waterfall',
      'river',
      'breeze',
      'moon',
      'rain',
      'wind',
      'sea',
      'morning',
      'snow',
      'lake',
      'sunset',
      'pine',
      'shadow',
      'leaf',
      'dawn',
      'glitter',
      'forest',
      'hill',
      'cloud',
      'meadow',
      'sun',
      'glade',
      'bird',
      'brook',
      'butterfly',
      'bush',
      'dew',
      'dust',
      'field',
      'fire',
      'flower',
      'firefly',
      'feather',
      'grass',
      'haze',
      'mountain',
      'night',
      'pond',
      'darkness',
      'snowflake',
      'silence',
      'sound',
      'sky',
      'shape',
      'surf',
      'thunder',
      'violet',
      'water',
      'wildflower',
      'wave',
      'water',
      'resonance',
      'sun',
      'wood',
      'dream',
      'cherry',
      'tree',
      'fog',
      'frost',
      'voice',
      'paper',
      'frog',
      'smoke',
      'star',
    ];

    //Random name creation logic
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adjective + noun;
  }
  //Random color for the user
  function randomColor() {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
  }

  //Main states for the app
  const [messages, setMessages] = useState([]);
  const [member, setMember] = useState({
    username: randomName(),
    color: randomColor(),
  });
  const [drone, setDrone] = useState();
  //Used for first time loading to web app
  useEffect(() => {
    //Connecting to Scaledrone api key
    const drone = new window.Scaledrone('gevJUr4udzfUu9Iu', {
      data: member,
    });
    //Establishing connection as a user
    drone.on('open', (error) => {
      if (error) {
        return console.error(error);
      }
      member.id = drone.clientId;
      setMember(member);
    });
    //Connectin to specific room and pulling messages from it
    const room = drone.subscribe('observable-room');
    room.on('message', (message) => {
      setMessages((prevState) => [...prevState, message]);
    });
    setDrone(drone);
    // eslint-disable-next-line
  }, []);

  //Function created for sending message to the selected room
  const handleInput = (message) => {
    drone.publish({ room: 'observable-room', message });
  };

  return (
    <div className='App'>
      <div className='App-header'>
        <h1>Welcome to the chat app</h1>
      </div>
      <Messages messages={messages} currentMember={member} />
      <Input onSendMessage={handleInput} />
    </div>
  );
}

export default App;
