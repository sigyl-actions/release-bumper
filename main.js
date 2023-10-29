
const core = require('@actions/core');

const addRelease = (
  component,
  amount,
) => `${component.replace(/\d/g,'')}${Number(component.replace(/\D/g,'') || 0) + amount}`

const versionUp = (current, level, amount) => {
  // from https://raw.githubusercontent.com/okunishinishi/node-versionup/master/lib/_next_version.js
  // get id of prerelease
  const [value] = String(current).split('-')
  const components = value.split(/\./)
  const major = components[0] || 0;
  const minor = Number(components[1]) || 0;
  const patch = Number(components[2]) || 0;
  switch (level) {
    case 'major':
      return [addRelease(major,amount), 0, 0].join('.')
    case 'minor':
      return [major, minor + amount, 0].join('.')
    case 'patch':
    default:
      return [major, minor, patch + amount].join('.')
  }
}

if (core.getInput('release')) {
  core.setOutput(
    'release',
    versionUp(
      core.getInput('release'),
      core.getInput('level') || 'patch',
      1,
    )
  );
} else {
  core.setOutput(
    'release',
    core.getInput('default-release'),
  );
}