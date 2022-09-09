import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ErrorBoundary from './HOC/ErrorBoundary';
import RouteBase from './routes';

import '@/assets/scss/index.scss';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const App = () => {
  return (
    <div className="App">
      <ErrorBoundary>
        <RouteBase />
        <ToastContainer />
      </ErrorBoundary>
    </div>
  );
};

export default App;
