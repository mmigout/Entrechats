const Home = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>💃 Bienvenue sur Entrechats</h1>
        <p style={styles.description}>
          Application de gestion des adhérents pour votre association de danse.
        </p>
        <div style={styles.features}>
          <div style={styles.feature}>
            <h3>✨ Simple et intuitif</h3>
            <p>Interface moderne et facile à utiliser</p>
          </div>
          <div style={styles.feature}>
            <h3>🔒 Sécurisé</h3>
            <p>Authentification via AWS Cognito</p>
          </div>
          <div style={styles.feature}>
            <h3>☁️ Cloud</h3>
            <p>Hébergé sur AWS avec infrastructure serverless</p>
          </div>
        </div>
        <p style={styles.instruction}>
          Connectez-vous pour accéder au tableau de bord
        </p>
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
    padding: '2rem',
  },
  content: {
    maxWidth: '800px',
    textAlign: 'center',
  },
  title: {
    fontSize: '3rem',
    color: '#333',
    marginBottom: '1rem',
  },
  description: {
    fontSize: '1.25rem',
    color: '#666',
    marginBottom: '3rem',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
  },
  feature: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  instruction: {
    fontSize: '1.1rem',
    color: '#666',
  },
};

export default Home;
