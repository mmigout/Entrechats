// Configuration AWS Amplify - Template
// Remplacer les valeurs par celles de votre environnement AWS

const awsconfig = {
  Auth: {
    Cognito: {
      region: 'eu-west-1',
      userPoolId: 'YOUR_USER_POOL_ID', // ex: eu-west-1_XXXXXXXXX
      userPoolClientId: 'YOUR_USER_POOL_CLIENT_ID', // ex: 1234567890abcdefghijklmnop
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
        endpoint: 'YOUR_API_GATEWAY_ENDPOINT', // ex: https://xxxxx.execute-api.eu-west-1.amazonaws.com/dev
        region: 'eu-west-1'
      }
    }
  }
};

export default awsconfig;
