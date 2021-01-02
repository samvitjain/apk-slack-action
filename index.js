const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios').default;

// try {
//   // `who-to-greet` input defined in action metadata file
//   const nameToGreet = core.getInput('who-to-greet');
//   console.log(`Hello ${nameToGreet}!`);
//   const time = (new Date()).toTimeString();
//   core.setOutput("time", time);
//   // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(github.context.payload, undefined, 2)
//   console.log(`The event payload: ${payload}`);
// } catch (error) {
//   core.setFailed(error.message);
// }


try {
    const SLACK_TOKEN = core.getInput('SLACK_TOKEN');
    const SLACK_MESSAGE = core.getInput('SLACK_MESSAGE');
    const instance = axios.create({
        baseURL: `https://slack.com/api`,
        headers: { 'Authorization': 'Bearer ' + SLACK_TOKEN }
    });
    instance.post(`/chat.postMessage?channel=general&text=${SLACK_MESSAGE}&pretty=1`)
        .then(response => {
            console.log(response.status);
            return response.data;

        })
} catch (error) {
    core.setFailed(error.message);
}