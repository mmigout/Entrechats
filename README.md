# Entrechats 💃

Application complète de gestion d'adhérents pour association de danse avec authentification AWS Cognito et backend serverless.

## 📋 Fonctionnalités

- **Gestion des adhérents** : Créer, lister, modifier et supprimer des adhérents
- **Authentification sécurisée** : AWS Cognito User Pools
- **Interface moderne** : React 18 avec Vite
- **Backend serverless** : AWS Lambda + API Gateway + DynamoDB
- **Région** : EU-West-1 (Paris)

## 🏗️ Architecture

```
┌─────────────────┐
│  React Frontend │
│   (Vite + AWS   │
│    Amplify)     │
└────────┬────────┘
         │
         ↓ HTTPS
┌─────────────────┐
│  AWS Cognito    │
│  (Auth)         │
└────────┬────────┘
         │
         ↓ JWT
┌─────────────────┐
│  API Gateway    │
│  (REST API)     │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Lambda         │
│  Functions      │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  DynamoDB       │
│  (Table)        │
└─────────────────┘
```

## 📦 Structure du projet

```
.
├── backend/                    # Backend serverless
│   ├── handlers/              # Lambda functions
│   │   ├── getAdherents.js    # GET /adherents
│   │   ├── createAdherent.js  # POST /adherents
│   │   ├── updateAdherent.js  # PUT /adherents/{id}
│   │   └── deleteAdherent.js  # DELETE /adherents/{id}
│   ├── serverless.yml         # Configuration Serverless Framework
│   └── package.json
│
└── frontend/                   # Frontend React
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── AdherentList.jsx
    │   │   ├── AdherentForm.jsx
    │   │   └── Navbar.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   └── Dashboard.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── index.jsx
    │   ├── index.css
    │   └── aws-exports.js      # Configuration AWS (à remplir)
    ├── package.json
    └── vite.config.js
```

## 🚀 Prérequis

- **Node.js** 18+ et npm
- **AWS CLI** configuré avec des credentials
- **Serverless Framework** : `npm install -g serverless`
- Un compte AWS avec les permissions suivantes :
  - Lambda
  - API Gateway
  - DynamoDB
  - Cognito
  - CloudFormation
  - IAM

## ⚙️ Configuration AWS Cognito

### 1. Créer un User Pool Cognito

```bash
# Via AWS Console ou AWS CLI
aws cognito-idp create-user-pool \
  --pool-name entrechats-users \
  --auto-verified-attributes email \
  --username-attributes email \
  --region eu-west-1
```

Notez l'**User Pool ID** (ex: `eu-west-1_XXXXXXXXX`)

### 2. Créer un App Client

```bash
aws cognito-idp create-user-pool-client \
  --user-pool-id <YOUR_USER_POOL_ID> \
  --client-name entrechats-web-client \
  --no-generate-secret \
  --explicit-auth-flows ALLOW_USER_PASSWORD_AUTH ALLOW_REFRESH_TOKEN_AUTH \
  --region eu-west-1
```

Notez l'**App Client ID** (ex: `1a2b3c4d5e6f7g8h9i0j`)

### 3. Créer un utilisateur de test

```bash
aws cognito-idp admin-create-user \
  --user-pool-id <YOUR_USER_POOL_ID> \
  --username test@example.com \
  --user-attributes Name=email,Value=test@example.com \
  --temporary-password TempPass123! \
  --region eu-west-1
```

## 🔧 Installation et déploiement

### Backend

1. **Installer les dépendances**

```bash
cd backend
npm install
```

2. **Configurer Cognito dans serverless.yml**

Modifier la section `custom.cognitoUserPoolId` dans `serverless.yml` :

```yaml
custom:
  cognitoUserPoolId: 'eu-west-1_XXXXXXXXX'  # Remplacer par votre User Pool ID
```

3. **Déployer sur AWS**

```bash
npm run deploy

# Ou avec Serverless CLI
serverless deploy --stage dev
```

4. **Récupérer l'URL de l'API**

Après le déploiement, notez l'**API Gateway endpoint** affiché :
```
endpoints:
  GET - https://xxxxx.execute-api.eu-west-1.amazonaws.com/dev/adherents
  POST - https://xxxxx.execute-api.eu-west-1.amazonaws.com/dev/adherents
  PUT - https://xxxxx.execute-api.eu-west-1.amazonaws.com/dev/adherents/{id}
  DELETE - https://xxxxx.execute-api.eu-west-1.amazonaws.com/dev/adherents/{id}
```

### Frontend

1. **Installer les dépendances**

```bash
cd frontend
npm install
```

2. **Configurer AWS dans aws-exports.js**

Modifier `src/aws-exports.js` avec vos valeurs :

```javascript
const awsconfig = {
  Auth: {
    Cognito: {
      region: 'eu-west-1',
      userPoolId: 'eu-west-1_XXXXXXXXX',        // Votre User Pool ID
      userPoolClientId: '1a2b3c4d5e6f7g8h9i0j', // Votre App Client ID
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
        endpoint: 'https://xxxxx.execute-api.eu-west-1.amazonaws.com/dev', // Votre API endpoint
        region: 'eu-west-1'
      }
    }
  }
};

export default awsconfig;
```

3. **Lancer en mode développement**

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

4. **Build pour production**

```bash
npm run build
```

Les fichiers compilés seront dans le dossier `dist/`

## 📊 Modèle de données

### Adhérent

```json
{
  "id": "uuid",           // Généré automatiquement
  "nom": "Dupont",        // Requis
  "prenom": "Marie",      // Requis
  "adresse": "1 rue de la Danse, 75001 Paris",
  "email": "marie.dupont@example.com",  // Requis
  "tel": "0612345678",
  "createdAt": "2024-01-01T12:00:00.000Z",
  "updatedAt": "2024-01-01T12:00:00.000Z"
}
```

## 🔐 API Endpoints

Toutes les routes nécessitent un token JWT Cognito dans l'en-tête `Authorization`.

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/adherents` | Liste tous les adhérents |
| POST | `/adherents` | Crée un nouvel adhérent |
| PUT | `/adherents/{id}` | Met à jour un adhérent |
| DELETE | `/adherents/{id}` | Supprime un adhérent |

## 🧪 Tester l'API

### Avec curl

```bash
# Récupérer un token (remplacer les valeurs)
TOKEN=$(aws cognito-idp initiate-auth \
  --auth-flow USER_PASSWORD_AUTH \
  --client-id <YOUR_CLIENT_ID> \
  --auth-parameters USERNAME=<email>,PASSWORD=<password> \
  --query 'AuthenticationResult.IdToken' \
  --output text)

# Lister les adhérents
curl -H "Authorization: Bearer $TOKEN" \
  https://<API_ENDPOINT>/dev/adherents

# Créer un adhérent
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"nom":"Dupont","prenom":"Marie","email":"marie@example.com"}' \
  https://<API_ENDPOINT>/dev/adherents
```

## 🛠️ Technologies utilisées

### Frontend
- **React** 18.2.0
- **Vite** 5.0.8 (build tool)
- **AWS Amplify** 6.0.0
- **@aws-amplify/ui-react** 6.0.0 (composants d'authentification)

### Backend
- **Node.js** 18.x
- **Serverless Framework** 3.38.0
- **AWS SDK v3** (DynamoDB)
- **AWS Lambda**
- **API Gateway**
- **DynamoDB**

## 📝 Scripts disponibles

### Backend
```bash
npm run deploy  # Déployer sur AWS
npm run remove  # Supprimer le stack AWS
npm run logs    # Voir les logs d'une fonction
```

### Frontend
```bash
npm run dev     # Serveur de développement
npm run build   # Build production
npm run preview # Prévisualiser le build
```

## 🚨 Dépannage

### Erreur CORS
Vérifiez que l'URL de l'API dans `aws-exports.js` ne contient pas de `/` à la fin.

### Erreur d'authentification
- Vérifiez que le User Pool ID et Client ID sont corrects
- Vérifiez que l'utilisateur a confirmé son email
- Vérifiez que le mot de passe respecte la politique (8+ caractères, majuscule, minuscule, chiffre, caractère spécial)

### Erreur 403 sur l'API
- Vérifiez que l'authorizer Cognito est bien configuré dans `serverless.yml`
- Vérifiez que le token JWT est valide et non expiré

### Lambda timeout
Par défaut, les fonctions Lambda ont un timeout de 6 secondes. Si nécessaire, augmentez-le dans `serverless.yml` :

```yaml
provider:
  timeout: 30  # secondes
```

## 📚 Ressources

- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [Serverless Framework Documentation](https://www.serverless.com/framework/docs)
- [AWS Cognito Documentation](https://docs.aws.amazon.com/cognito/)
- [React Documentation](https://react.dev/)

## 📄 Licence

MIT

## 👥 Auteur

Projet Entrechats - Association de danse