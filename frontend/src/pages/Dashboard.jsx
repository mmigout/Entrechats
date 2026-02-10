import { useState, useEffect } from 'react';
import AdherentForm from '../components/AdherentForm';
import AdherentList from '../components/AdherentList';
import { getAdherents, createAdherent, deleteAdherent } from '../services/api';

const Dashboard = () => {
  const [adherents, setAdherents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les adhérents au montage du composant
  useEffect(() => {
    loadAdherents();
  }, []);

  const loadAdherents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAdherents();
      setAdherents(data);
    } catch (err) {
      console.error('Erreur lors du chargement des adhérents:', err);
      setError('Erreur lors du chargement des adhérents');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdherent = async (adherentData) => {
    try {
      const newAdherent = await createAdherent(adherentData);
      setAdherents([...adherents, newAdherent]);
      // Note: Consider replacing alert() with a toast notification system for better UX
      alert('Adhérent créé avec succès !');
    } catch (err) {
      console.error('Erreur lors de la création:', err);
      throw err;
    }
  };

  const handleDeleteAdherent = async (id) => {
    try {
      await deleteAdherent(id);
      setAdherents(adherents.filter(a => a.id !== id));
      // Note: Consider replacing alert() with a toast notification system for better UX
      alert('Adhérent supprimé avec succès !');
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      alert('Erreur lors de la suppression de l\'adhérent');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Tableau de bord</h1>
        
        {error && (
          <div style={styles.error}>
            {error}
            <button onClick={loadAdherents} style={styles.retryButton}>
              Réessayer
            </button>
          </div>
        )}

        <AdherentForm onSubmit={handleCreateAdherent} />
        
        <AdherentList 
          adherents={adherents} 
          onDelete={handleDeleteAdherent}
          loading={loading}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 60px)',
    backgroundColor: '#f5f5f5',
    padding: '2rem',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    color: '#333',
    marginBottom: '2rem',
  },
  error: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  retryButton: {
    backgroundColor: '#c62828',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Dashboard;
