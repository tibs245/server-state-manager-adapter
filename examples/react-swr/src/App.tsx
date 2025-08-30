import './App.css';
import { WeatherComponent } from '@/weatherFeature/ui/weather.component.tsx';
import { useState } from 'react';

type City = 'PARIS' | 'NEW_Y0RK' | 'LOS_ANGELES' | 'LONDON' | 'TOKYO';
function App(): React.ReactNode {
  const [selectedCity, setSelectedCity] = useState<City>('PARIS');
  return (
    <div className="app">
      <header className="app-header">
        <h1>Server State Manager Adapter Examples</h1>
        <p>
          This playground demonstrates how to use the ServerStateManagerAdapter library for managing
          server state in React applications.
        </p>
      </header>

      <main className="examples-container" aria-labelledby="main-title">
        <h1 id="main-title">
          Hello, what is the temperature in {selectedCity.replace('_', ' ')} ?
        </h1>
        <div role="radiogroup" aria-label="Select a city" className="city-selection">
          {(['PARIS', 'NEW_Y0RK', 'LOS_ANGELES', 'LONDON', 'TOKYO'] as const).map(city => (
            <div key={city} className="radio-item">
              <input
                type="radio"
                id={city}
                name="city"
                value={city}
                checked={selectedCity === city}
                onChange={e => setSelectedCity(e.target.value as City)}
              />
              <label htmlFor={city}>{city.replace('_', ' ')}</label>
            </div>
          ))}
        </div>

        <WeatherComponent city={selectedCity} />
      </main>

      <footer className="app-footer">
        <p>
          For more information, check out the{' '}
          <a
            href="https://github.com/tibs245/ServerStateAdapter"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub repository
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
