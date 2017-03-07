/*
 * GitHubStatusPusher
 * Push status of builds/tests to github status on their respective repo
 *
 * 2017 wouterlucas.com
 *
 */
/*jslint esnext: true*/
/*jslint node: true*/
'use strict';

const config = require('./config.json');
const async = require('async');
const GitHubApi = require('github');

var github = new GitHubApi({
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
    headers: {
        "user-agent": "GitHub-Status-Pusher" // GitHub is happy with a unique user agent
    },
    followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
    timeout: 5000
});

console.log(config);

github.authenticate({
    type: "basic",
    username: config.user,
    password: config.pass
});

const ACCEPTED_STATUSES = [ 'pending', 'success', 'error', 'failure' ];

var argv = require('minimist')(process.argv.slice(2));

var owner = argv.o;
var repo = argv.r;
var commit = argv.c;
var state = argv.s;
var url = argv.u;
var description = argv.d;
var context = argv.context;

// sanity check
if (ACCEPTED_STATUSES.indexOf(state) === -1){
    console.error('Invalid state provided, please provide any of the following states:', ACCEPTED_STATUSES);
    process.exit(1);
}

if (owner === undefined || repo === undefined || commit === undefined) {
    console.log('Missing (-o) owner, (-r) repo or (-c) commit');
    process.exit(1);
}

var statusObj = {
    'owner'         : owner,
    'repo'          : repo,
    'sha'           : commit,
    'state'         : state
};

if (url !== undefined) statusObj.url = url;
if (description !== undefined) statusObj.description = description;
if (context !== undefined) statusObj.context = context;

github.repos.createStatus(statusObj, (err, res) => {
    if (err){
        console.error(err);
        process.exit(1);
    }
});
