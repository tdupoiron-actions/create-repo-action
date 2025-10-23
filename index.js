const core = require('@actions/core');
const { Octokit } = require('@octokit/rest');

// Read action inputs
const repoOwner = core.getInput('repo_owner', { required: true });
const repoName = core.getInput('repo_name', { required: true });
const repoVisibility = core.getInput('repo_visibility', { required: false }) || 'private';
const token = core.getInput('token', { required: true });

// Validate visibility value
const validVisibilities = ['public', 'private', 'internal'];
if (!validVisibilities.includes(repoVisibility)) {
  core.setFailed(`VISIBILITY must be one of: ${validVisibilities.join(', ')}`);
  process.exit(1);
}

// Initialize Octokit
const octokit = new Octokit({
  auth: token
});

// Create repository
async function createRepository() {
  try {
    core.info(`Creating repository "${repoName}" in organization "${repoOwner}"...`);
    core.info(`Visibility: ${repoVisibility}`);

    const response = await octokit.repos.createInOrg({
      org: repoOwner,
      name: repoName,
      private: repoVisibility === 'private',
      visibility: repoVisibility,
      auto_init: true
    });

    core.info('✓ Repository created successfully!');
    core.info(`Repository URL: ${response.data.html_url}`);
    core.info(`Clone URL: ${response.data.clone_url}`);
    
    // Set outputs
    core.setOutput('repository_url', response.data.html_url);
    core.setOutput('clone_url', response.data.clone_url);
    core.setOutput('repository_id', response.data.id.toString());
    
  } catch (error) {
    let errorMessage = 'Failed to create repository';
    
    if (error.status === 404) {
      errorMessage = 'Organization not found or you don\'t have access';
    } else if (error.status === 422) {
      errorMessage = 'Repository already exists or invalid parameters';
    } else if (error.status === 401) {
      errorMessage = 'Authentication failed - check your token';
    } else {
      errorMessage = error.message;
    }
    
    core.setFailed(errorMessage);
    process.exit(1);
  }
}

// Run the function
createRepository();
