import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [facts, setFacts] = useState([]);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    console.log("----------mount----------", listening)
    // if (!listening) {
    const events = new EventSource('http://localhost:4000/events');

    events.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);

      setFacts((facts) => facts.concat(parsedData));
    };

    setListening(true);

    return () => {
      events.close();
    }
    // }
  }, [listening]);

  return (
    <table className="stats-table">
      <thead>
        <tr>
          <th>Fact</th>
          <th>Source</th>
        </tr>
      </thead>
      <tbody>
        {
          facts.map((fact, i) =>
            <tr key={i}>
              <td>{fact.info}</td>
              <td>{fact.source}</td>
            </tr>
          )
        }
      </tbody>
    </table>
  );
}

export default App;