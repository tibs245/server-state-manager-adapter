import './App.css';
import { ReactTanstackQueryProvider } from '@server-state-manager-adapter/tanstack-query-react-adapter';
import { WeatherComponent } from '@/weatherFeature/ui/weather.component.tsx';

function App(): React.ReactNode {
  return (
    <ReactTanstackQueryProvider>
      <div className="app">
        <header className="app-header">
          <h1>Server State Manager Adapter Examples</h1>
          <p>
            This playground demonstrates how to use the ServerStateManagerAdapter library for
            managing server state in React applications.
          </p>
        </header>

        <main className="examples-container" aria-labelledby="main-title">
          <h1 id="main-title">Hello, what is the temperature in Paris ?</h1>
          <WeatherComponent city="PARIS" />
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
    </ReactTanstackQueryProvider>
  );
}

export default App;
