import { useState } from 'react';

const AdherentForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [formData, setFormData] = useState({
    nom: initialData?.nom || '',
    prenom: initialData?.prenom || '',
    adresse: initialData?.adresse || '',
    email: initialData?.email || '',
    tel: initialData?.tel || '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }
    
    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      // Reset form after successful submission (only if not editing)
      if (!initialData) {
        setFormData({
          nom: '',
          prenom: '',
          adresse: '',
          email: '',
          tel: '',
        });
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de l\'enregistrement');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>
        {initialData ? 'Modifier l\'adhérent' : 'Ajouter un adhérent'}
      </h2>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>
          Nom <span style={styles.required}>*</span>
        </label>
        <input
          type="text"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          style={errors.nom ? {...styles.input, ...styles.inputError} : styles.input}
          disabled={isSubmitting}
        />
        {errors.nom && <span style={styles.errorText}>{errors.nom}</span>}
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>
          Prénom <span style={styles.required}>*</span>
        </label>
        <input
          type="text"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          style={errors.prenom ? {...styles.input, ...styles.inputError} : styles.input}
          disabled={isSubmitting}
        />
        {errors.prenom && <span style={styles.errorText}>{errors.prenom}</span>}
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Adresse</label>
        <input
          type="text"
          name="adresse"
          value={formData.adresse}
          onChange={handleChange}
          style={styles.input}
          disabled={isSubmitting}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>
          Email <span style={styles.required}>*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={errors.email ? {...styles.input, ...styles.inputError} : styles.input}
          disabled={isSubmitting}
        />
        {errors.email && <span style={styles.errorText}>{errors.email}</span>}
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Téléphone</label>
        <input
          type="tel"
          name="tel"
          value={formData.tel}
          onChange={handleChange}
          style={styles.input}
          disabled={isSubmitting}
        />
      </div>

      <div style={styles.buttonGroup}>
        <button 
          type="submit" 
          style={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
        </button>
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel} 
            style={styles.cancelButton}
            disabled={isSubmitting}
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
};

const styles = {
  form: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
  },
  title: {
    marginTop: 0,
    marginBottom: '1.5rem',
    color: '#333',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#555',
    fontWeight: '500',
  },
  required: {
    color: '#ff4444',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  inputError: {
    borderColor: '#ff4444',
  },
  errorText: {
    display: 'block',
    color: '#ff4444',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    flex: 1,
  },
  cancelButton: {
    backgroundColor: '#999',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    flex: 1,
  },
};

export default AdherentForm;
