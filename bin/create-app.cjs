#!/usr/bin/env node

const degit = require('degit');
const fs = require('fs');
const path = require('path');

const repo = 'r3zafa/ngx-app-starter-kit';
const target = process.argv[2] || 'my-angular-app';
const targetPath = path.join(process.cwd(), target);

console.log(`\n🚀 Creating a new project in '${targetPath}'...`);

const emitter = degit(repo, {
  cache: false,
  force: true,
  verbose: true,
});

emitter.clone(target).then(() => {
  console.log(`\n✅ Project created in '${target}'`);

  // Remove dependencies from package.json
  const packageJsonPath = path.join(targetPath, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    delete packageJson.dependencies.degit; // Remove degit from dependencies
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }

  console.log(`\n👉 Next steps:`);
  console.log(`cd ${target}`);
  console.log(`npm install`);
  process.exit(0);
}).catch((err) => {
  console.error(`\n❌ Failed to create project: ${err.message}`);
  process.exit(1);
});