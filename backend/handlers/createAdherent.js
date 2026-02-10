const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require("uuid");

const client = new DynamoDBClient({ region: process.env.AWS_REGION || "eu-west-1" });
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  console.log("Event:", JSON.stringify(event, null, 2));

  try {
    const body = JSON.parse(event.body || "{}");

    // Validation des champs requis
    if (!body.nom || !body.prenom || !body.email) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          message: "Les champs nom, prénom et email sont requis",
        }),
      };
    }

    const adherent = {
      id: uuidv4(),
      nom: body.nom,
      prenom: body.prenom,
      adresse: body.adresse || "",
      email: body.email,
      tel: body.tel || "",
      createdAt: new Date().toISOString(),
    };

    const params = {
      TableName: process.env.ADHERENTS_TABLE,
      Item: adherent,
    };

    const command = new PutCommand(params);
    await docClient.send(command);

    return {
      statusCode: 201,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        message: "Adhérent créé avec succès",
        adherent: adherent,
      }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        message: "Erreur lors de la création de l'adhérent",
        error: error.message,
      }),
    };
  }
};
