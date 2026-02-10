# Guide de configuration rapide

## Étapes de configuration

### 1. Backend

1. Configurer le User Pool ID dans `backend/serverless.yml` :
```yaml
custom:
  cognitoUserPoolId: 'eu-west-1_XXXXXXXXX'  # Remplacer
```

2. Déployer :
```bash
cd backend
npm install
npm run deploy
```

3. Noter l'URL de l'API dans la sortie du déploiement.

### 2. Frontend

1. Configurer AWS dans `frontend/src/aws-exports.js` :
```javascript
const awsconfig = {
  Auth: {
    Cognito: {
      region: 'eu-west-1',
      userPoolId: 'eu-west-1_XXXXXXXXX',        // De l'étape 1
      userPoolClientId: '1a2b3c4d5e6f7g8h9i0j', // App Client ID Cognito
      signUpVerificationMethod: 'code',
      loginWith: {
        email: true,
        username: false
      }
    }
  },
  API: {
    REST: {
      adherentsApi: {
        endpoint: 'https://xxxxx.execute-api.eu-west-1.amazonaws.com/dev', // URL de l'étape 1
        region: 'eu-west-1'
      }
    }
  }
};
```

2. Lancer l'application :
```bash
cd frontend
npm install
npm run dev
```

## Ordre des opérations

1. ✅ Créer User Pool Cognito
2. ✅ Créer App Client Cognito
3. ✅ Configurer `backend/serverless.yml`
4. ✅ Déployer le backend
5. ✅ Configurer `frontend/src/aws-exports.js`
6. ✅ Lancer le frontend
7. ✅ Créer un utilisateur de test
8. ✅ Se connecter et tester

## Exemple complet

Voir le README.md principal pour les commandes AWS CLI complètes.
