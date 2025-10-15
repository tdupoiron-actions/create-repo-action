const { Octokit } = require('@octokit/rest');
const core = require('@actions/core');

/**
 * Create a repository in a GitHub organization
 */
async function createRepository() {
  try {
    // Get input parameters from GitHub Actions or environment variables
    const orgName = core.getInput('repo_owner') || process.env.ORG_NAME;
    const repoName = core.getInput('repo_name') || process.env.REPO_NAME;
    const visibility = core.getInput('repo_visibility') || process.env.VISIBILITY || 'private';
    const githubToken = core.getInput('token') || process.env.GITHUB_TOKEN;

    // Validate required environment variables
    if (!orgName) {
      core.setFailed('Error: repo_owner input is required');
      return;
    }

    if (!repoName) {
      core.setFailed('Error: repo_name input is required');
      return;
    }

    if (!githubToken) {
      core.setFailed('Error: token input is required');
      return;
    }

    // Validate visibility value
    const validVisibilities = ['public', 'private', 'internal'];
    if (!validVisibilities.includes(visibility)) {
      core.setFailed(`Error: repo_visibility must be one of: ${validVisibilities.join(', ')}. Received: ${visibility}`);
      return;
    }

    core.info(`Creating repository "${repoName}" in organization "${orgName}" with visibility "${visibility}"...`);

    // Initialize Octokit
    const octokit = new Octokit({
      auth: githubToken,
    });

    // Create the repository
    const response = await octokit.rest.repos.createInOrg({
      org: orgName,
      name: repoName,
      private: visibility === 'private',
      visibility: visibility,
      description: `Repository created by create-repo-action`,
      auto_init: true, // Initialize with README
    });

    core.info('✅ Repository created successfully!');
    core.info(`📁 Repository: ${response.data.full_name}`);
    core.info(`🔗 URL: ${response.data.html_url}`);
    core.info(`👁️  Visibility: ${response.data.visibility}`);
    core.info(`🆔 Repository ID: ${response.data.id}`);

    // Set outputs
    core.setOutput('repository_url', response.data.html_url);
    core.setOutput('repository_id', response.data.id);
    core.setOutput('repository_full_name', response.data.full_name);

  } catch (error) {
    core.error('❌ Error creating repository:');
    
    if (error.status === 401) {
      core.setFailed('Authentication failed. Please check your token.');
    } else if (error.status === 403) {
      core.setFailed('Permission denied. Make sure your token has the necessary permissions for the organization.');
    } else if (error.status === 422) {
      core.setFailed('Repository name already exists or is invalid.');
    } else {
      core.setFailed(`HTTP ${error.status}: ${error.message}`);
    }
    
    core.debug(`Full error details: ${JSON.stringify(error.response?.data || error.message)}`);
  }
}
// Run the function
if (require.main === module) {
  createRepository();
}

module.exports = { createRepository };