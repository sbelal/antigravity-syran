#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Workflows to deploy separately
const WORKFLOW_NAMES = ['commit.md', 'onboard.md', 'pr.md', 'review.md'];

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function copyDirExcept(src, dest, excludeDirs = []) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory() && excludeDirs.includes(entry.name)) {
      continue;
    }
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirExcept(srcPath, destPath, excludeDirs);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function removeEmptyDir(dir) {
  try {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      if (files.length === 0) {
        fs.rmdirSync(dir);
        return true;
      }
    }
  } catch (error) {
    // Ignore cleanup errors
  }
  return false;
}

function install(targetDir, workflowsDir, name) {
  console.log(`Installing Syran plugin to ${targetDir}...`);
  try {
    const srcRoot = path.join(__dirname, '..', 'template');
    
    if (!fs.existsSync(srcRoot)) {
      throw new Error(`Template directory not found at ${srcRoot}`);
    }

    // Ensure clean main plugin directory install
    if (fs.existsSync(targetDir)) {
      console.log(`Target directory already exists. Removing older installation...`);
      fs.rmSync(targetDir, { recursive: true, force: true });
    }
    
    // Copy main plugin template, excluding workflows when we deploy them separately.
    if (workflowsDir) {
      copyDirExcept(srcRoot, targetDir, ['workflows']);
    } else {
      copyDir(srcRoot, targetDir);
    }

    // Deploy workflows separately to the parsed workflows folder
    if (workflowsDir) {
      console.log(`Deploying workflows to ${workflowsDir}...`);
      fs.mkdirSync(workflowsDir, { recursive: true });
      const srcWorkflowsDir = path.join(srcRoot, 'workflows');
      
      for (const file of WORKFLOW_NAMES) {
        const srcFile = path.join(srcWorkflowsDir, file);
        const destFile = path.join(workflowsDir, file);
        if (fs.existsSync(srcFile)) {
          fs.copyFileSync(srcFile, destFile);
        }
      }
    }
    
    console.log(`\n\x1b[32mSuccess: Syran plugin installed ${name} successfully!\x1b[0m`);
    console.log(`Please reload/restart the Antigravity agent to load the new plugin.`);
  } catch (error) {
    console.error(`\n\x1b[31mError during installation: ${error.message}\x1b[0m`);
  }
}

function uninstall(targetDir, workflowsDir, name) {
  console.log(`Uninstalling Syran plugin from ${targetDir}...`);
  try {
    // 1. Remove main plugin directory
    if (fs.existsSync(targetDir)) {
      fs.rmSync(targetDir, { recursive: true, force: true });
      console.log(`Removed plugin directory: ${targetDir}`);
    }

    // 2. Remove specific workflow files
    if (workflowsDir && fs.existsSync(workflowsDir)) {
      for (const file of WORKFLOW_NAMES) {
        const destFile = path.join(workflowsDir, file);
        if (fs.existsSync(destFile)) {
          fs.rmSync(destFile, { force: true });
          console.log(`Removed workflow file: ${destFile}`);
        }
      }
      if (name === 'globally') {
        if (removeEmptyDir(workflowsDir)) {
          console.log(`Removed empty global_workflows directory: ${workflowsDir}`);
        }
      }
    }

    console.log(`\n\x1b[32mSuccess: Syran plugin uninstalled ${name} successfully!\x1b[0m`);

    // 3. Clean up empty parent directories (local only)
    if (name === 'locally') {
      const pluginsDir = path.dirname(targetDir); // <workspace>/.agents/plugins
      const agentsDir = path.dirname(pluginsDir);  // <workspace>/.agents
      
      removeEmptyDir(workflowsDir); // Clean up workflows dir if empty
      
      if (removeEmptyDir(pluginsDir)) {
        console.log(`Removed empty directory: ${pluginsDir}`);
        if (removeEmptyDir(agentsDir)) {
          console.log(`Removed empty directory: ${agentsDir}`);
        }
      }
    }
  } catch (error) {
    console.error(`\n\x1b[31mError during uninstallation: ${error.message}\x1b[0m`);
  }
}

// Resolve paths
const currentWorkspace = process.cwd();
const localTarget = path.join(currentWorkspace, '.agents', 'plugins', 'syran');
const localWorkflowsTarget = path.join(currentWorkspace, '.agents', 'workflows');

const homeDir = process.env.USERPROFILE || process.env.HOME || '';
const globalTarget = homeDir ? path.join(homeDir, '.gemini', 'config', 'plugins', 'syran') : '';
const globalWorkflowsTarget = homeDir ? path.join(homeDir, '.gemini', 'config', 'global_workflows') : '';

// Main CLI menu
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log('\n===========================================');
  console.log('    Syran Antigravity 2.0 Plugin Tool      ');
  console.log('===========================================');
  console.log('1. Install Syran Locally (current workspace)');
  console.log('2. Install Syran Globally (all workspaces)');
  console.log('3. Uninstall Syran Locally');
  console.log('4. Uninstall Syran Globally');
  console.log('5. Exit');
  console.log('===========================================');
  
  rl.question('Select an option [1-5]: ', (answer) => {
    const choice = answer.trim();
    switch (choice) {
      case '1':
        install(localTarget, localWorkflowsTarget, 'locally');
        rl.close();
        break;
      case '2':
        if (!globalTarget || !globalWorkflowsTarget) {
          console.error('\x1b[31mError: Could not resolve home directory paths for global installation.\x1b[0m');
        } else {
          install(globalTarget, globalWorkflowsTarget, 'globally');
        }
        rl.close();
        break;
      case '3':
        uninstall(localTarget, localWorkflowsTarget, 'locally');
        rl.close();
        break;
      case '4':
        if (!globalTarget || !globalWorkflowsTarget) {
          console.error('\x1b[31mError: Could not resolve home directory paths for global uninstallation.\x1b[0m');
        } else {
          uninstall(globalTarget, globalWorkflowsTarget, 'globally');
        }
        rl.close();
        break;
      case '5':
      case 'exit':
      case 'quit':
        console.log('Exiting...');
        rl.close();
        break;
      default:
        console.log('\x1b[31mInvalid option. Please choose a number between 1 and 5.\x1b[0m');
        showMenu();
        break;
    }
  });
}

showMenu();
