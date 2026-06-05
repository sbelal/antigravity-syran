#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

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

function install(targetDir, name) {
  console.log(`Installing Syran plugin to ${targetDir}...`);
  try {
    // Determine source directory (template subfolder)
    const srcRoot = path.join(__dirname, '..', 'template');
    
    if (!fs.existsSync(srcRoot)) {
      throw new Error(`Template directory not found at ${srcRoot}`);
    }

    // Ensure clean install
    if (fs.existsSync(targetDir)) {
      console.log(`Target directory already exists. Removing older installation...`);
      fs.rmSync(targetDir, { recursive: true, force: true });
    }
    
    copyDir(srcRoot, targetDir);
    
    console.log(`\n\x1b[32mSuccess: Syran plugin installed ${name} successfully!\x1b[0m`);
    console.log(`Please reload/restart the Antigravity agent to load the new plugin.`);
  } catch (error) {
    console.error(`\n\x1b[31mError during installation: ${error.message}\x1b[0m`);
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

function uninstall(targetDir, name) {
  console.log(`Uninstalling Syran plugin from ${targetDir}...`);
  try {
    if (fs.existsSync(targetDir)) {
      fs.rmSync(targetDir, { recursive: true, force: true });
      console.log(`\n\x1b[32mSuccess: Syran plugin uninstalled ${name} successfully!\x1b[0m`);
      
      // If uninstalled locally, clean up empty parent directories (.agents/plugins and .agents)
      if (name === 'locally') {
        const pluginsDir = path.dirname(targetDir);
        const agentsDir = path.dirname(pluginsDir);
        
        if (removeEmptyDir(pluginsDir)) {
          console.log(`Removed empty directory: ${pluginsDir}`);
          if (removeEmptyDir(agentsDir)) {
            console.log(`Removed empty directory: ${agentsDir}`);
          }
        }
      }
    } else {
      console.log(`Syran plugin is not installed ${name}.`);
    }
  } catch (error) {
    console.error(`\n\x1b[31mError during uninstallation: ${error.message}\x1b[0m`);
  }
}

// Resolve paths
const currentWorkspace = process.cwd();
const localTarget = path.join(currentWorkspace, '.agents', 'plugins', 'syran');

const homeDir = process.env.USERPROFILE || process.env.HOME || '';
const globalTarget = homeDir ? path.join(homeDir, '.gemini', 'config', 'plugins', 'syran') : '';

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
        install(localTarget, 'locally');
        rl.close();
        break;
      case '2':
        if (!globalTarget) {
          console.error('\x1b[31mError: Could not resolve home directory for global installation.\x1b[0m');
        } else {
          install(globalTarget, 'globally');
        }
        rl.close();
        break;
      case '3':
        uninstall(localTarget, 'locally');
        rl.close();
        break;
      case '4':
        if (!globalTarget) {
          console.error('\x1b[31mError: Could not resolve home directory for global uninstallation.\x1b[0m');
        } else {
          uninstall(globalTarget, 'globally');
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
