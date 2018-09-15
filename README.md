![Logo](https://user-images.githubusercontent.com/6123841/45583639-acff8200-b8ce-11e8-83a4-10a260e33035.png)

# EasyCodingStandard for Visual Studio Code

[![Build Status](https://circleci.com/gh/azdanov/vscode-easy-coding-standard.svg?style=svg)](https://circleci.com/gh/azdanov/vscode-easy-coding-standard) [![Code Coverage](https://codecov.io/gh/azdanov/vscode-easy-coding-standard/branch/master/graph/badge.svg)](https://codecov.io/gh/azdanov/vscode-easy-coding-standard) [![Semantic Release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

> The Easiest Way to Use Any Coding Standard 🐘

Visual Studio Code extension to format and lint your PHP code using [EasyCodingStandard](https://github.com/Symplify/EasyCodingStandard).

## Features

- Use [PHP-CS-Fixer | PHP_CodeSniffer](https://www.tomasvotruba.cz/blog/2017/05/03/combine-power-of-php-code-sniffer-and-php-cs-fixer-in-3-lines/) - anything you like
- Next run _under few seconds_ with caching
- [Skipping files](https://github.com/Symplify/EasyCodingStandard#ignore-what-you-cant-fix) for specific checkers
- [Prepared checker sets](https://github.com/Symplify/EasyCodingStandard#use-prepared-checker-sets) - PSR2, PSR12, Symfony, Common, Symplify and more...

Are you already using another tool?

- [How to Migrate From PHP_CodeSniffer to EasyCodingStandard in 7 Steps](https://www.tomasvotruba.cz/blog/2018/06/04/how-to-migrate-from-php-code-sniffer-to-easy-coding-standard/#comment-4086561141)
- [How to Migrate From PHP-CS-Fixer to EasyCodingStandard in 6 Steps](https://www.tomasvotruba.cz/blog/2018/06/07/how-to-migrate-from-php-cs-fixer-to-easy-coding-standard/)

## Requirements

This extension depends on [Symplify/EasyCodingStandard](https://github.com/Symplify/EasyCodingStandard#install) to be installed locally in the project or globally by specifying `configPath` in the settings.

## Extension Settings

By the default `configPath` takes precedence over `ruleSet`.

- `ecs.executablePath` - The path to the EasyCodingStandard executable. Default: `vendor/bin/ecs`
- `ecs.configPath` - The path to the [configuration file](https://github.com/Symplify/EasyCodingStandard#1-create-configuration-and-setup-checkers). Default: `easy-coding-standard.yml`
- `ecs.ruleSet` - A prepared [ruleset](https://github.com/Symplify/EasyCodingStandard#use-prepared-checker-sets) to use. Default: `psr2`

## Issues

An issue can occur either from this _extension_ or from _EasyCodingStandard_. Please manually verify where the issue originates by using the [EasyCodingStandard CLI](https://github.com/Symplify/EasyCodingStandard#usage) and file a request accordingly.

- [VSCode EasyCodingStandard Issue](https://github.com/azdanov/vscode-easy-coding-standard/issues/new)
- [EasyCodingStandard Issue](https://github.com/Symplify/Symplify/issues/new)

## Contributing

[CONTRIBUTING](./CONTRIBUTING.md)

### Style guide

[Prettier](https://prettier.io/) _(default settings)_ is used to maintain formatting. [TSLint](https://github.com/palantir/tslint) for linting. Each commit is automatically processed by using a git hook via [lint-staged](https://github.com/okonet/lint-staged) and [husky](https://github.com/typicode/husky).

### Tests

Testing is done with the help of [jest](https://jestjs.io/) and [jest-extended](https://github.com/jest-community/jest-extended).

```shell
# Test commands:

# Install necessary testing dependencies
npm run test:install

# Run all tests
npm run test

# Run in watch mode
npm run test -- --watch

# Create a coverage report
npm run test:coverage
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/6123841?v=4" width="100px;"/><br /><sub><b>Anton Zdanov</b></sub>](https://azdanov.js.org/)<br />[💻](https://github.com/azdanov/vscode-easy-coding-standard/commits?author=azdanov "Code") [📖](https://github.com/azdanov/vscode-easy-coding-standard/commits?author=azdanov "Documentation") [🤔](#ideas-azdanov "Ideas, Planning, & Feedback") [🚇](#infra-azdanov "Infrastructure (Hosting, Build-Tools, etc)") [📦](#platform-azdanov "Packaging/porting to new platform") [⚠️](https://github.com/azdanov/vscode-easy-coding-standard/commits?author=azdanov "Tests") |
| :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## Release Notes

[CHANGELOG](./CHANGELOG.md)

## Licensing

[MIT](./LICENSE)

---

**Enjoy!**
