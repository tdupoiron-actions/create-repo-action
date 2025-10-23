# Create Repository Action

A simple JavaScript application that creates a GitHub repository in an organization using the Octokit SDK.

## Prerequisites

- Node.js (v14 or higher)
- A GitHub Personal Access Token with appropriate permissions to create repositories in organizations
  - Required scope: `repo` (Full control of private repositories)
  - For organizations: `admin:org` or appropriate organization permissions

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

## Usage

The application requires the following environment variables:

- `GITHUB_TOKEN` (required): Your GitHub Personal Access Token
- `ORG_NAME` (required): The name of the organization where the repository will be created
- `REPO_NAME` (required): The name of the new repository
- `VISIBILITY` (optional): Repository visibility - `public`, `private`, or `internal` (defaults to `private`)

### Run the application

```bash
GITHUB_TOKEN=your_token_here \
ORG_NAME=your-org-name \
REPO_NAME=new-repo-name \
VISIBILITY=private \
npm start
```

Or export the environment variables first:

```bash
export GITHUB_TOKEN=your_token_here
export ORG_NAME=your-org-name
export REPO_NAME=new-repo-name
export VISIBILITY=private

npm start
```

### Example

```bash
GITHUB_TOKEN=ghp_xxxxxxxxxxxx \
ORG_NAME=my-organization \
REPO_NAME=my-new-repo \
VISIBILITY=private \
npm start
```

## Features

- ✓ Creates repositories in GitHub organizations
- ✓ Supports public, private, and internal visibility
- ✓ Automatically initializes repository with README
- ✓ Comprehensive error handling
- ✓ Clear success and error messages

## Error Handling

The application provides clear error messages for common issues:

- Missing required environment variables
- Invalid visibility values
- Authentication failures
- Organization not found or access denied
- Repository already exists

## License

MIT