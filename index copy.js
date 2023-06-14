/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const axios = require("axios");

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
  const event = req.header("X-GitHub-Event");
  const payload = req.body;
  console.log("event");

  if (event == "issues") {
    if (payload.issue.user.login != "LwThanTest") {
      console.log("payload.textPayload");
      console.log(payload.issue);
      console.log(payload.issue.title);
      console.log(payload.issue.body);
      console.log(payload.issue.html_url);

      await axios.get(payload.issue.html_url, {
        params: {
          "issueUrl": payload.issue.body,
          "comment": payload.issue.body,
        },
      });
    } else {
      console.log(payload.issue.user.login);
      console.log("the bot");
    }
  } else {
    console.log("event not issues");
  }
});

exports.replyToGitHubIssue = onRequest(async (req, res) => {
  try {
    const {issueUrl} = req.query;
    const {comment} = req.query;
    const fToken="github_pat_11BAR3EFY0lL6UWFuscSdT_IfPfXoJBl";
    const eToken="PAU6Yj5jGu2XQ7KFkcRrIK6XqamEydcZ7pCTMTMVIWTfBU54AX";
    const token = fToken+eToken;
    const url = `${issueUrl}/comments`;
    const headers = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const data = {
      body: comment,
    };

    const fetchOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };

    const githubResponse = await fetch(url, fetchOptions);

    if (githubResponse.ok) {
      res.send("Comment created successfully");
    } else {
      res.status(500).send("Error creating comment");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("An error occurred");
  }
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
