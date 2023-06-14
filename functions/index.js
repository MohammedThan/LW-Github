/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const { Configuration, OpenAIApi } = require("openai");

// const axios = require("axios");

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
  console.log(event);
  console.log("now in getRepoWebhook");

  console.log("the sender is");
  console.log(payload.sender.login);
  console.log(payload.sender.login.toLowerCase());


  console.log("the user is");
  console.log(payload.issue.user.login);

  // console.log("openAI start");
  // chatGPT();

  if (event == "issues" || event == "issue_comment" ) {
    if (payload.sender.login.toLowerCase() != "ByMOH".toLowerCase()) {
      // console.log("payload.textPayload");

      // console.log(payload.issue.html_url);
      // console.log(payload.issue.timeline_url);
      let originalLink = payload.issue.timeline_url;
      let modifiedLink = originalLink.replace('/timeline', '/comments');
      let body="body not defined"
      if(event == "issues"){
         body=payload.issue.body
      } else if(event == "issue_comment") {
         body=payload.comment.body
      } else {
         body="body wnrog fix please fix"
      }
      console.log("payload.issue");
      console.log(payload.issue.title);
      console.log(body);
      // console.log("modifiedLink");
      // console.log(modifiedLink);

      comment = await chatGPT("title: "+payload.issue.title+" body: "+body);
      console.log("openAI start");
      console.log("comment");
      console.log(comment);

      
      
      replyToGitHubIssue(comment, modifiedLink);
      
    } else {
      console.log("the bot error account: ");
      console.log(payload.issue.user.login);
    }

  } else {
    console.log("event not issues");
  }
});
// Assuming this code is part of a block function
// You may need to adjust the imports and function signature based on the block function platform you are using

async function replyToGitHubIssue(comment, issueUrl) {
  try {
    // const { comment } = req.query;
    // const { issueUrl } = req.query;
    const token = "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";
    const url = issueUrl;
    // console.log("now in replyToGitHubIssue");
    // console.log("comment");
    // console.log(comment);
    // console.log("url");
    // console.log(url);
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
    //https://api.github.com/repos/MohammedThan/LW-Github/issues/30/comments
    const githubResponse = await fetch(url, fetchOptions);

    if (githubResponse.ok) {
      console.log("Comment created successfully");
      // console.log(githubResponse);
      // res.send("Comment created successfully");
    } else {
      console.log("Error creating comment");
      // res.status(500).send("Error creating comment");
    }
  } catch (error) {
    console.log("An error occurred:", error);
    console.error("An error occurred:", error);
    // res.status(500).send("An error occurred");
  }
}

// Entry point for the block function
exports.blockFunction = (req, res) => {
  // Assuming the block function is triggered by an HTTP request
  replyToGitHubIssue(req, res)
    .catch((error) => {
      console.error("Unhandled error:", error);
      res.status(500).send("An error occurred");
    });
};


async function chatGPT(text) {

OPENAI_API_KEY ="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"

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const response = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{role:"user", content:text}],
});

return response.data.choices[0].message.content;

// const responseData = response;
console.log("generatedText: "+response.data.choices[0].message.content);
// console.log("generatedText: "+response);
// console.log("generatedText: "+response.data);
// console.log("generatedText: "+response.data.choices);
// console.log("generatedText: "+response.data.choices[0]);
// console.log("generatedText: "+response.data.choices[0].message);
console.log("generatedText: "+response.data.choices[0].message.content);
}


// exports.replyToGitHubIssue = onRequest(async (req, res) => {
//   try {
//     const {comment} = req.query;
//     const {issueUrl} = req.query;
//     const token = "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";
//     const url = issueUrl;
//     console.log("comment");
//     console.log(comment);
//     console.log("url");
//     console.log(url);
//     const headers = {
//       "Authorization": `Bearer ${token}`,
//       "Content-Type": "application/json",
//     };

//     const data = {
//       body: comment,
//     };

//     const fetchOptions = {
//       method: "POST",
//       headers: headers,
//       body: JSON.stringify(data),
//     };

//     const githubResponse = await fetch(url, fetchOptions);

//     if (githubResponse.ok) {
//       console.log("Comment created successfully");
//       res.send("Comment created successfully");
//     } else {
//       console.log("Error creating comment");
//       res.status(500).send("Error creating comment");
//     }
//   } catch (error) {
//     console.log("An error occurred:", error);
//     console.error("An error occurred:", error);
//     res.status(500).send("An error occurred");
//   }
// });



// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
