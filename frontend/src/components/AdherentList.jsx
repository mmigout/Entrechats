const AdherentList = ({ adherents, onDelete, loading }) => {
  if (loading) {
    return (
      <div style={styles.container}>
        <p style={styles.loading}>Chargement des adhérents...</p>
      </div>
    );
  }

  if (!adherents || adherents.length === 0) {
    return (
      <div style={styles.container}>
        <p style={styles.empty}>Aucun adhérent enregistré</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Liste des adhérents ({adherents.length})</h2>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Nom</th>
              <th style={styles.th}>Prénom</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Téléphone</th>
              <th style={styles.th}>Adresse</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {adherents.map((adherent) => (
              <tr key={adherent.id} style={styles.tr}>
                <td style={styles.td}>{adherent.nom}</td>
                <td style={styles.td}>{adherent.prenom}</td>
                <td style={styles.td}>{adherent.email}</td>
                <td style={styles.td}>{adherent.tel || '-'}</td>
                <td style={styles.td}>{adherent.adresse || '-'}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => {
                      if (window.confirm(`Voulez-vous vraiment supprimer ${adherent.prenom} ${adherent.nom} ?`)) {
                        onDelete(adherent.id);
                      }
                    }}
                    style={styles.deleteButton}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    marginTop: 0,
    marginBottom: '1.5rem',
    color: '#333',
  },
  loading: {
    textAlign: 'center',
    color: '#666',
    fontSize: '1.1rem',
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    fontSize: '1.1rem',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#f5f5f5',
    padding: '1rem',
    textAlign: 'left',
    fontWeight: '600',
    color: '#333',
    borderBottom: '2px solid #ddd',
  },
  tr: {
    borderBottom: '1px solid #eee',
  },
  td: {
    padding: '1rem',
    color: '#555',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
};

export default AdherentList;
