/* global suite, test */

const assert = require('assert');
const extension = require('../extension');
const packageJson = require('../package.json');

suite('extension tests', function() {
    function buildPrefix(
        levelsToPreserve,
        {
            currentFilename = '/Users/mike/projects/example-project/app/models/person_spec.rb',
            workspaceFolder = undefined,
            transformations = undefined
        } = {}
    ) {
        return extension.buildPrefix(
            currentFilename,
            workspaceFolder,
            '/',
            {
                levelsToPreserve,
                transformations
            }
        );
    }

    test('respects levelsToPreserve', function() {
        assert.strictEqual(buildPrefix(-10), 'person_spec.rb');
        assert.strictEqual(buildPrefix(0), 'person_spec.rb');
        assert.strictEqual(buildPrefix(1), 'models/person_spec.rb');
        assert.strictEqual(buildPrefix(2), 'app/models/person_spec.rb');
        assert.strictEqual(buildPrefix(6), 'Users/mike/projects/example-project/app/models/person_spec.rb');
        assert.strictEqual(buildPrefix(10), 'Users/mike/projects/example-project/app/models/person_spec.rb');
    });

    test('respects workspaceFolder', function() {
        assert.strictEqual(buildPrefix(0, { workspaceFolder: '/Users/mike/projects/example-project' }),
            'person_spec.rb');
        assert.strictEqual(buildPrefix(10, { workspaceFolder: '/Users/mike/projects/example-project' }),
            'app/models/person_spec.rb');
        assert.strictEqual(buildPrefix(6, { workspaceFolder: '/some/unrelated/path' }),
            'Users/mike/projects/example-project/app/models/person_spec.rb');
        assert.strictEqual(buildPrefix(6, { workspaceFolder: '/app/models' }),
            'Users/mike/projects/example-project/app/models/person_spec.rb');
    });

    test('respects transformations', function() {
        assert.strictEqual(buildPrefix(1, { currentFilename: '/dir/person.html.erb', transformations: [] }), 'dir/person.html.erb');
        assert.strictEqual(buildPrefix(1, { currentFilename: '/dir/person.html.erb', transformations: ['{EXTENSION}'] }), 'dir/person');
        assert.strictEqual(buildPrefix(1, { currentFilename: '/dir/.gitignore', transformations: ['{EXTENSION}'] }), 'dir/.gitignore');
    });
});
