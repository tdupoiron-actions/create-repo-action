# Create Repository Action

A simple JavaScript application to create repositories in GitHub organizations using the Octokit SDK.

## Features

- Create repositories in GitHub organizations
- Configurable repository visibility (public, private, internal)
- Environment variable configuration
- Error handling and validation
- Automatic README initialization

## Prerequisites

- Node.js (version 14 or higher)
- GitHub personal access token with appropriate permissions
- Access to the target GitHub organization

## Setup

1. **Clone or download this repository**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file with your values:
   ```env
   GITHUB_TOKEN=your_github_token_here
   ORG_NAME=your_organization_name
   REPO_NAME=your_repository_name
   VISIBILITY=private
   ```

## Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `GITHUB_TOKEN` | Yes | GitHub personal access token with `repo` and `admin:org` permissions | - |
| `ORG_NAME` | Yes | Name of the GitHub organization where the repository will be created | - |
| `REPO_NAME` | Yes | Name of the repository to create | - |
| `VISIBILITY` | No | Repository visibility (`public`, `private`, `internal`) | `private` |

## GitHub Token Permissions

Your GitHub personal access token needs the following permissions:
- `repo` - Full control of private repositories
- `admin:org` - Full control of orgs and teams (for creating repos in organizations)

To create a token:
1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Click "Generate new token"
3. Select the required scopes
4. Copy the token and add it to your `.env` file

## Usage

### Testing the Setup

Before creating a repository, you can test your configuration:

```bash
npm test
```

This will validate:
- Environment variables are set correctly
- GitHub token is valid
- Organization access permissions
- Token permissions for repository creation

### Creating a Repository

Run the application:

```bash
npm start
```

Or directly with Node.js:

```bash
node index.js
```

## Example Output

```
Creating repository "my-new-repo" in organization "my-org" with visibility "private"...
✅ Repository created successfully!
📁 Repository: my-org/my-new-repo
🔗 URL: https://github.com/my-org/my-new-repo
👁️  Visibility: private
🆔 Repository ID: 123456789
```

## Error Handling

The application includes comprehensive error handling for common scenarios:

- **Authentication errors (401)**: Invalid or missing GitHub token
- **Permission errors (403)**: Token lacks necessary permissions
- **Validation errors (422)**: Repository name conflicts or invalid parameters
- **Missing environment variables**: Clear error messages for required variables

## Repository Settings

The created repository will have:
- Automatic README initialization
- Description: "Repository created by create-repo-action"
- Visibility as specified in environment variables

## License

MIT License - see the LICENSE file for details.