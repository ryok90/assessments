import { useEffect, useState } from 'react';
import './App.css';
import people from './people.json';

function App() {
  const [inDisplay, setInDisplay] = useState(0);
  const sorted = people.sort((a, b) => (a.last_name > b.last_name ? -1 : 1));
  const filtered = sorted.filter((_, index) => !((index + 1) % 3));

  useEffect(() => {
    if (!filtered.length) return;
    if (inDisplay > filtered.length) return;
    setInDisplay(inDisplay);
    setTimeout(() => {
      setInDisplay(inDisplay + 1);
    }, filtered[inDisplay]?.timeout * 1000);
  }, [inDisplay, filtered]);

  const name =
    filtered[inDisplay]
      ? `${filtered[inDisplay].name} ${filtered[inDisplay].last_name}`
      : '';

  return (
    <div className="App">
      <header className="App-header">
        <p>{name}</p>
      </header>
    </div>
  );
}

export default App;
