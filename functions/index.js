/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");

exports.getUser = onRequest(async (req, res) => {
  const {token} = req.query;
  try {
    const response = await fetch("https://api.github.com/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error in index.js getUser fetch: ${response.status}`);
    }

    const userData = await response.json();
    res.json(userData);
  } catch (err) {
    console.error("Error in index.js getUser fetch: " + err);
  }
});


exports.getStarred = onRequest(async (req, res) => {
  const {token} = req.query;
  try {
    const response = await fetch("https://api.github.com/user/starred", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error in index.js getStarred fetch: ${response.status}`);
    }

    const starredData = await response.json();
    res.json(starredData);
  } catch (err) {
    console.error("Error in index.js getStarred fetch: " + err);
  }
});


exports.getRepos = onRequest(async (req, res) => {
  const {token} = req.query;
  try {
    const response = await fetch("https://api.github.com/user/repos", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Token R failed getrepos: ${response.status}`);
    }

    const reposData = await response.json();
    res.json(reposData);
  } catch (error) {
    console.error("Error:", error);
  }
});


exports.getToken = onRequest(async (req, res) => {
  const {code, CLIENT_ID} = req.query;

  try {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        code: code,
        client_id: CLIENT_ID,
        client_secret: "535e136ac49021e3d675aa0f9fb159497e69b77d",
      }),
    });

    if (!tokenRes.ok) {
      throw new Error(`Token R failed gettoken: ${tokenRes.status}`);
    }

    const tokenData = await tokenRes.json();
    res.json(tokenData.access_token);
  } catch (error) {
    console.error("Error:", error);
  }
});

exports.getRepoWebhook= onRequest(async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload.body);
    res.json(payload);
  } catch ( error) {
    console.error("Error:", error);
  }
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
