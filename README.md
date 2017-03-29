# Clarity ACM CTF Challenge

Clarity Partners and Illinois Tech ACM have worked together to create this Capture the Flag (CTF) challenge as a way to expose your team to topics in web development and engineering.

The goal of the contest is to win the most points by completing "flags," which are tasks and test cases spread throughout this repository.

You can follow the [live leaderboard here](https://acmillinoistech.github.io/ctfmanager/view/).

Create a file called `secrets.txt` at the top level directory. Add your team API key following the format below:

```
TEAM_API_KEY :: -KgIunYRz7HUOVUcKjU7
IS_SILENT :: false
```

Do not let any other teams get access to your API key, otherwise they will be able to pretend to be you! The `secrets.txt` file is listed in this repository's `.gitignore` file, which means that it will stay safely on your local machine and never be committed to GitHub. As long as you run your programs locally, the tests will still be able to access your API key.

When working on HTML/CSS/JavaScript challenges, you will be able to see the results of flags in the browser console. It is recommended that you use Chrome for this contest.

![Animation of Test Cases](http://g.recordit.co/EI2fpWV6lM.gif)

Also in `secrets.txt`, you may set `IS_SILENT`. If it is set to `true`, your tests will run and tell you if they pass or fail, but they will not be submitted to the contest until you set it to `false`.

Good luck and represent Illinois Tech well!