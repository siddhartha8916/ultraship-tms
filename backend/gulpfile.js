import gulp from 'gulp';
// Read Gulp@4 support: https://www.npmjs.com/package/gulp-run-command#faq
import gulpRunCommand from 'gulp-run-command';
import os from 'os';

const { src, dest, watch, parallel } = gulp;
const run = gulpRunCommand.default;

const PATHS = {
  srcTsFiles: [
    'src/**/*.ts',
    // Ignore auto generated files by other tooling
    '!src/generated/**/*',
  ],
  srcGraphqlFiles: ['src/**/*.graphql'],
  srcNonTsFiles: ['src/**', '!src/**/*.ts'],
  configFiles: ['package.json', 'pnpm-lock.yaml', '.env', 'LICENSE'],
  destinationDir: 'build',
};

const isProduction = process.argv.includes('--prod');
const isWindowsPlatform = os.platform() === 'win32';

async function compileTsFiles() {
  console.info('Compiling TypeScript...');
  let command = 'npx tsc';

  if (!isProduction) {
    command = `${command} --sourceMap --incremental`;
  }

  return run(command)();
}

async function compileTsPaths() {
  return run('npx tsc-alias')();
}

async function tscCheck() {
  const command = 'npx tsc --noEmit';

  return run(command)();
}

async function cleanBuildDir() {
  return run('npx rimraf build')();
}

async function lint() {
  const command = 'eslint --cache .';

  return run(command)();
}

async function copyConfigFiles() {
  return src(PATHS.configFiles, { base: '.', dot: true, allowEmpty: true }).pipe(dest(PATHS.destinationDir));
}

async function copyNonTypeScriptFiles() {
  return src(PATHS.srcNonTsFiles, { base: '.', dot: true }).pipe(dest(PATHS.destinationDir));
}

async function generateGqlTsFiles() {
  let command = 'npx graphql-codegen';

  if (isProduction) {
    command = `${command} -e`;
  }

  return run(command)();
}

async function runApp() {
  const command = 'tsx watch -r tsconfig-paths/register --inspect=0.0.0.0:9229 ./src/app.ts';

  run(command)();
  return;
}

// PUBLIC COMMANDS //

export async function dev() {
  await generateGqlTsFiles();

  watch(PATHS.srcGraphqlFiles, { ignoreInitial: true, usePolling: isWindowsPlatform }, generateGqlTsFiles);
  watch(PATHS.srcTsFiles, { ignoreInitial: false, usePolling: isWindowsPlatform }, parallel(lint, tscCheck));

  runApp();
}
export default dev;

export async function build() {
  await cleanBuildDir();
  await copyConfigFiles();

  await lint();
  await generateGqlTsFiles();
  await compileTsFiles();
  await compileTsPaths();
  await copyNonTypeScriptFiles();
}
