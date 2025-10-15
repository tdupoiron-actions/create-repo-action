#!/usr/bin/env node

/**
 * Test script to validate the setup and configuration
 */

const { Octokit } = require('@octokit/rest');
require('dotenv').config();

async function testSetup() {
  console.log('🧪 Testing create-repo-action setup...\n');

  // Check environment variables
  console.log('📋 Environment Variables:');
  const requiredVars = ['GITHUB_TOKEN', 'ORG_NAME', 'REPO_NAME'];
  const optionalVars = ['VISIBILITY'];
  
  let missingRequired = [];
  
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      console.log(`  ✅ ${varName}: ${varName === 'GITHUB_TOKEN' ? '[HIDDEN]' : value}`);
    } else {
      console.log(`  ❌ ${varName}: Not set`);
      missingRequired.push(varName);
    }
  });

  optionalVars.forEach(varName => {
    const value = process.env[varName];
    console.log(`  📝 ${varName}: ${value || 'private (default)'}`);
  });

  if (missingRequired.length > 0) {
    console.log(`\n❌ Missing required environment variables: ${missingRequired.join(', ')}`);
    console.log('Please copy .env.example to .env and fill in the required values.');
    return;
  }

  // Test GitHub token validity
  console.log('\n🔑 Testing GitHub Token:');
  try {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    const { data: user } = await octokit.rest.users.getAuthenticated();
    console.log(`  ✅ Token valid - Authenticated as: ${user.login}`);

    // Test organization access
    console.log('\n🏢 Testing Organization Access:');
    try {
      const { data: org } = await octokit.rest.orgs.get({
        org: process.env.ORG_NAME
      });
      console.log(`  ✅ Organization found: ${org.name || org.login}`);
      
      // Check if user has repo creation permissions
      const { data: membership } = await octokit.rest.orgs.getMembershipForAuthenticatedUser({
        org: process.env.ORG_NAME
      });
      console.log(`  📝 Your role: ${membership.role}`);
      
      if (membership.role === 'admin' || membership.role === 'member') {
        console.log('  ✅ You should be able to create repositories in this organization');
      } else {
        console.log('  ⚠️  You might not have permission to create repositories in this organization');
      }
      
    } catch (error) {
      if (error.status === 404) {
        console.log(`  ❌ Organization "${process.env.ORG_NAME}" not found or not accessible`);
      } else {
        console.log(`  ❌ Error accessing organization: ${error.message}`);
      }
    }

  } catch (error) {
    if (error.status === 401) {
      console.log('  ❌ Invalid GitHub token');
    } else {
      console.log(`  ❌ Error: ${error.message}`);
    }
    return;
  }

  console.log('\n🎉 Setup test completed!');
  console.log('\n💡 To create a repository, run: npm start');
}

if (require.main === module) {
  testSetup().catch(error => {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  });
}

module.exports = { testSetup };