# Architecture détaillée

## Flux d'authentification

```
1. Utilisateur accède à l'application
   ↓
2. Page d'accueil (non authentifié)
   ↓
3. Clique sur "Se connecter"
   ↓
4. Composant Authenticator d'AWS Amplify
   ↓
5. Saisie email/password
   ↓
6. Validation avec AWS Cognito
   ↓
7. Récupération du JWT token
   ↓
8. Accès au Dashboard (authentifié)
```

## Flux de données - Création d'adhérent

```
1. Utilisateur remplit le formulaire
   ↓
2. AdherentForm valide les données
   ↓
3. Appel API createAdherent()
   ↓
4. aws-amplify ajoute le token JWT automatiquement
   ↓
5. API Gateway vérifie le token avec Cognito
   ↓
6. Lambda createAdherent s'exécute
   ↓
7. Génération d'un UUID
   ↓
8. Enregistrement dans DynamoDB
   ↓
9. Retour de la réponse
   ↓
10. Mise à jour de l'interface
```

## Architecture des composants React

```
App.jsx (Point d'entrée)
├── Authenticator (AWS Amplify)
│   └── Gère l'authentification
│
├── Navbar
│   └── Affiche le user et le bouton déconnexion
│
└── Dashboard (Page principale)
    ├── AdherentForm
    │   └── Formulaire de création/modification
    │
    └── AdherentList
        └── Tableau avec liste et bouton supprimer
```

## API REST

### GET /adherents
- **Auth**: Requise (JWT Cognito)
- **Lambda**: getAdherents.handler
- **DynamoDB**: Scan de la table
- **Réponse**: Liste d'adhérents

### POST /adherents
- **Auth**: Requise (JWT Cognito)
- **Lambda**: createAdherent.handler
- **Body**: `{ nom, prenom, email, adresse?, tel? }`
- **DynamoDB**: PutItem
- **Réponse**: Adhérent créé avec ID

### PUT /adherents/{id}
- **Auth**: Requise (JWT Cognito)
- **Lambda**: updateAdherent.handler
- **Body**: `{ nom?, prenom?, email?, adresse?, tel? }`
- **DynamoDB**: UpdateItem
- **Réponse**: Adhérent mis à jour

### DELETE /adherents/{id}
- **Auth**: Requise (JWT Cognito)
- **Lambda**: deleteAdherent.handler
- **DynamoDB**: DeleteItem
- **Réponse**: Confirmation de suppression

## Sécurité

### Authentification
- AWS Cognito User Pools
- JWT tokens avec expiration
- Refresh tokens automatiques via Amplify

### Autorisation
- API Gateway Authorizer (Cognito)
- Validation du token sur chaque requête
- Pas d'accès direct à DynamoDB depuis le frontend

### CORS
- Configuration CORS sur API Gateway
- Headers autorisés pour les requêtes authentifiées
- Origin '*' en développement (à restreindre en production)

## Performance

### Backend
- Lambda cold start: ~1-2 secondes
- Lambda warm: ~100-200ms
- DynamoDB: Latence <10ms
- Pay-per-use (pas de serveur permanent)

### Frontend
- Vite: Build rapide et HMR
- React 18: Concurrent features
- Lazy loading possible pour optimisation future

## Coûts AWS (estimation mensuelle)

### Utilisation faible (1000 adhérents, 5000 requêtes/mois)
- Lambda: ~$0.20
- API Gateway: ~$0.04
- DynamoDB: ~$0.25 (PAY_PER_REQUEST)
- Cognito: Gratuit (< 50k MAU)
- **Total: ~$0.50/mois**

### Utilisation moyenne (10000 requêtes/mois)
- Lambda: ~$0.40
- API Gateway: ~$0.08
- DynamoDB: ~$0.50
- Cognito: Gratuit
- **Total: ~$1.00/mois**

## Évolutions possibles

1. **Ajout de fonctionnalités**
   - Modification d'adhérent (interface)
   - Export CSV/Excel
   - Recherche et filtres
   - Pagination

2. **Améliorations techniques**
   - GraphQL avec AppSync
   - Hébergement frontend sur S3+CloudFront
   - Pipeline CI/CD avec GitHub Actions
   - Tests unitaires et E2E

3. **Fonctionnalités métier**
   - Gestion des cotisations
   - Planning des cours
   - Système de réservation
   - Notifications email/SMS
