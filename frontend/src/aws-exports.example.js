# AWS Cognito Configuration - Example
# Copy to aws-exports.js and fill in your values

const awsconfig = {
  Auth: {
    Cognito: {
      region: 'eu-west-1',
      
      // Get this from AWS Cognito Console > User pools > Your pool > User pool ID
      // Example: eu-west-1_abc123XYZ
      userPoolId: 'YOUR_USER_POOL_ID',
      
      // Get this from AWS Cognito Console > User pools > Your pool > App integration > App clients
      // Example: 1a2b3c4d5e6f7g8h9i0j1k2l3m
      userPoolClientId: 'YOUR_USER_POOL_CLIENT_ID',
      
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
        // Get this after deploying backend with serverless deploy
        // Example: https://abc123def4.execute-api.eu-west-1.amazonaws.com/dev
        endpoint: 'YOUR_API_GATEWAY_ENDPOINT',
        region: 'eu-west-1'
      }
    }
  }
};

export default awsconfig;
