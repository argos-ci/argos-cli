# argos-cli

> Argos command line interface.

[![npm version](https://img.shields.io/npm/v/argos-cli.svg?style=flat-square)](https://www.npmjs.com/package/argos-cli)
[![npm downloads](https://img.shields.io/npm/dm/argos-cli.svg?style=flat-square)](https://www.npmjs.com/package/argos-cli)
[![Build Status](https://travis-ci.org/argos-ci/argos-cli.svg?branch=master)](https://travis-ci.org/argos-ci/argos-cli)

[![Dependencies](https://img.shields.io/david/argos-ci/argos-cli.svg?style=flat-square)](https://david-dm.org/argos-ci/argos-cli)
[![DevDependencies](https://img.shields.io/david/dev/argos-ci/argos-cli.svg?style=flat-square)](https://david-dm.org/argos-ci/argos-cli#info=devDependencies&view=list)

## Usage

```sh
Usage: argos [options] [command]


Commands:

  upload [options] <directory>  Upload screenshots

Options:

  -h, --help     output usage information
  -V, --version  output the version number
```

### Upload

```sh
Usage: upload [options] <directory>

Upload screenshots

Options:

  -h, --help             output usage information
  -C, --commit <commit>  Git commit
  -B, --branch <branch>  Git branch
  -T, --token <token>    Repository token
  --ignore <list>        List of glob files to ignore (ex: "**/*.png,**/diff.jpg")
```

## License

MIT
