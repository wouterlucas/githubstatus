GitHub status pusher. Small node.js wrapper that takes a bunch of arguments and pushes the status to GitHub.com (or any other GitHub url). Created to hookup buildbot (www.buildbot.net) builds to github statuses. (And I'm to lazy to do it in python). Built on node-github.

## Setup ##

npm install

## Configuration ##

Copy config_example.json to config.json and set the credentials with something that works for you

## Run ##

node githubstatus `<args>`

Available arguments:
```
-o <Owner> 			The owner of the repo, e.g. wouterlucas. 
-r <Repo> 			Repository name
-c <CommitSha>		Sha hash of the commit
-s <Status>			Status of the commit, pending, failure, error or success
-d <Description>	(Optional) Description of the commit
--context			(Optional) Context of the status update
-u <url>			(Optional) URL of the status update
``` 

Example:
`node githubstatus.js -o wouterlucas -r githubstatus -c e3134eea6d55f803bda91f8ac42795f8814ed83f -s success -d "All is good" --context "Buildbot"`

> Written with [StackEdit](https://stackedit.io/).