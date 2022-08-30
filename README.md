# argos-cli

> This package is deprecated, see https://github.com/argos-ci/argos-javascript

## Usage

```sh
Usage:  [options] [command]

Options:
  -V, --version                 output the version number
  -h, --help                    output usage information

Commands:
  upload [options] <directory>  Upload screenshots
  cancel [options]              Cancel the build (batch mode only)
```

### Upload

```sh
Usage: argos upload [options] <directory>

Upload screenshots

Options:
  -T, --token <token>           Repository token
  -C, --commit <commit>         Git commit
  -B, --branch <branch>         Git branch
  --external-build-id [string]  ID of the build (batch mode only)
  --batchCount [int]            Number of batches expected (batch mode)
  --build-name [string]         Name of the build
  --ignore <list>               List of glob files to ignore (ex: "**/*.png,**/diff.jpg")
  -h, --help                    display help for command
```

### Cancel

```sh
Usage: argos cancel [options]

Cancel the build (batch mode only)

Options:
  -T, --token <token>         Repository token
  --external-build-id [string]  ID of the build (batch mode only)
  -h, --help                  output usage information
```

## License

MIT
