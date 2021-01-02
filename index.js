const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios').default;
const fs = require('fs');
const FormData = require('form-data');
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
    const FILE_PATH = core.getInput('FILE_PATH');
    const instance = axios.create({
        baseURL: `https://slack.com/api`,
        headers: { 'Authorization': 'Bearer ' + SLACK_TOKEN }
    });

    instance.post(`/chat.postMessage?channel=general&text=HelloFromSlack&pretty=1`)
        .then(response => {
            console.log(response.status);
            return response.data;

        })

    //FILE POST
    const form_data = new FormData();
    console.log(FILE_PATH);
    form_data.append("file", fs.createReadStream(FILE_PATH));
    const postFileInstance = axios.create({
        baseURL: `https://slack.com/api`,
        headers: { 'Authorization': 'Bearer ' + SLACK_TOKEN, 'Content-Type': 'multipart/form-data' }
    });
    postFileInstance.post(`/files.upload?channels=random&pretty=1&initial_comment=file from slack`, form_data)
        .then(response => {
            console.log(response.status);
            console.log(response.data);
            return response.data;
        })


} catch (error) {
    core.setFailed(error.message);
}