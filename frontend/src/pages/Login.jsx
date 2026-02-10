const Login = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2>Connexion</h2>
        <p>Veuillez vous connecter pour accéder au tableau de bord</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 60px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  content: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
};

export default Login;
