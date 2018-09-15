# Contributing

Thanks for being willing to contribute!

You can learn more by watching a free course: [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github).

## Project setup

1. Fork and clone the repo
2. `cd` into the repo and run `npm install` and `npm run test:install` to install dependencies
3. Run `npm test` to ensure that all the tests pass
4. Create a branch for your PR

Tip: Keep your `master` branch pointing at the original repository and make
pull requests from branches on your fork. To do this, run:

```sh
git remote add upstream https://github.com/azdanov/vscode-easy-coding-standard.git
git fetch upstream
git branch --set-upstream-to=upstream/master master
```

This will add the original repository as a "remote" called "upstream," then fetch the git information from that remote, then set your local `master` branch to use the upstream master branch whenever you run `git pull`.

Then you can make all of your pull request branches based on this `master` branch. Whenever you want to update your version of `master`, do a regular `git pull`.

## Committing and Pushing changes

Run `npm test` to confirm that all tests pass before you commit your changes. Running `npm test -- -u` will update any snapshots that need updating. Make sure to include snapshot changes (if they exist) in your commit.

## Add yourself as a contributor

This project follows the [all contributors](https://github.com/kentcdodds/all-contributors) specification. To add yourself to the table of contributors on the `README.md`, please use the automated script as part of your PR:

```sh
npm run contributors:add
# and
npm run contributors:generate
```

Follow the prompt and commit `.all-contributorsrc` and `README.md` in the PR. If you've already added yourself to the list and are making a new type of contribution, you can run it again and select the added contribution type.

## Help is always welcome

Please check the [the open issues](https://github.com/azdanov/vscode-easy-coding-standard/issues?q=is%3Aopen+is%3Aissue+sort%3Aupdated-desc) for any questions, bug reports and feature requests!

Thanks!

[egghead]: https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github
