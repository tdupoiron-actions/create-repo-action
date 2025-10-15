# Create Repository Action

A GitHub Action to create repositories in GitHub organizations using the Octokit REST API.

## Features

- ✅ Create repositories in GitHub organizations
- ✅ Support for public, private, and internal visibility
- ✅ Automatic README initialization
- ✅ Comprehensive error handling
- ✅ Action outputs for repository details

## Usage

### Basic Example

```yaml
name: Create Repository
on:
  workflow_dispatch:
    inputs:
      repo_name:
        description: 'Repository name'
        required: true
        type: string
      repo_visibility:
        description: 'Repository visibility'
        required: false
        default: 'private'
        type: choice
        options:
          - public
          - private
          - internal

jobs:
  create-repo:
    runs-on: ubuntu-latest
    steps:
      - name: Create Repository
        id: create-repo
        uses: tdupoiron-actions/create-repo-action@v1
        with:
          repo_owner: 'your-organization'
          repo_name: ${{ github.event.inputs.repo_name }}
          repo_visibility: ${{ github.event.inputs.repo_visibility }}
          token: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Display Results
        run: |
          echo "Repository created: ${{ steps.create-repo.outputs.repository_url }}"
          echo "Repository ID: ${{ steps.create-repo.outputs.repository_id }}"
          echo "Full name: ${{ steps.create-repo.outputs.repository_full_name }}"
```

### Advanced Example

```yaml
name: Bulk Repository Creation
on:
  workflow_dispatch:

jobs:
  create-repositories:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        repo:
          - { name: 'project-frontend', visibility: 'private' }
          - { name: 'project-backend', visibility: 'private' }
          - { name: 'project-docs', visibility: 'public' }
    
    steps:
      - name: Create Repository
        uses: tdupoiron-actions/create-repo-action@v1
        with:
          repo_owner: 'your-organization'
          repo_name: ${{ matrix.repo.name }}
          repo_visibility: ${{ matrix.repo.visibility }}
          token: ${{ secrets.PAT_TOKEN }}
```

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `repo_owner` | GitHub organization or user name where the repository will be created | ✅ Yes | - |
| `repo_name` | Name of the repository to create | ✅ Yes | - |
| `repo_visibility` | Visibility of the repository (`public`, `private`, `internal`) | ❌ No | `private` |
| `token` | GitHub token with repository creation permissions | ✅ Yes | - |

## Outputs

| Output | Description |
|--------|-------------|
| `repository_url` | URL of the created repository |
| `repository_id` | ID of the created repository |
| `repository_full_name` | Full name of the created repository (owner/name) |

## Token Permissions

The provided token must have the following permissions:

### For Organization Repositories:
- `repo` scope (full repository access)
- Organization membership with repository creation permissions

### For Personal Repositories:
- `repo` scope (full repository access)

## Error Handling

The action provides detailed error messages for common scenarios:

- **401 Unauthorized**: Invalid or missing token
- **403 Forbidden**: Insufficient permissions
- **422 Unprocessable Entity**: Repository name already exists or invalid

## Development

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/tdupoiron-actions/create-repo-action.git
cd create-repo-action

# Install dependencies
npm install

# Build the action
npm run build
```

### Testing

```bash
# Run local tests
npm test

# Test the built action
node -c dist/index.js
```

### Building

The action uses Webpack to bundle all dependencies into a single file for distribution:

```bash
npm run build
```

This creates `dist/index.js` which is referenced in `action.yml`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and build
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.