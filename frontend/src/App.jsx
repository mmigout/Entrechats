import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

// Configuration AWS Amplify
Amplify.configure(awsconfig);

function App() {
  return (
    <Authenticator socialProviders={[]}>
      {({ user }) => (
        <div>
          <Navbar user={user} />
          {user ? <Dashboard /> : <Home />}
        </div>
      )}
    </Authenticator>
  );
}

export default App;
