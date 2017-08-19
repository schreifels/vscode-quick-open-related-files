/* global suite, test */

const assert = require('assert');
const extension = require('../extension');
const packageJson = require('../package.json');

suite('extension tests', function() {
    function buildPrefix(
        directoryLevelsToPreserve,
        {
            currentFilename = '/Users/mike/projects/example-project/app/models/person_spec.rb',
            workspaceFolder = undefined,
            patternsToStrip = undefined
        } = {}
    ) {
        return extension.buildPrefix(
            currentFilename,
            workspaceFolder,
            '/',
            {
                directoryLevelsToPreserve,
                patternsToStrip
            }
        );
    }

    test('respects directoryLevelsToPreserve', function() {
        assert.strictEqual(buildPrefix(-10), 'person_spec.rb');
        assert.strictEqual(buildPrefix(0), 'person_spec.rb');
        assert.strictEqual(buildPrefix(1), 'models/person_spec.rb');
        assert.strictEqual(buildPrefix(2), 'app/models/person_spec.rb');
        assert.strictEqual(buildPrefix(6), 'Users/mike/projects/example-project/app/models/person_spec.rb');
        assert.strictEqual(buildPrefix(10), 'Users/mike/projects/example-project/app/models/person_spec.rb');

        assert.strictEqual(buildPrefix(0, { currentFilename: '' }), '');
    });

    test('respects workspaceFolder', function() {
        assert.strictEqual(buildPrefix(0, { workspaceFolder: '/Users/mike/projects/example-project' }),
            'person_spec.rb');
            assert.strictEqual(buildPrefix(2, { workspaceFolder: '/Users/mike/projects/example-project' }),
            'app/models/person_spec.rb');
        assert.strictEqual(buildPrefix(10, { workspaceFolder: '/Users/mike/projects/example-project' }),
            'app/models/person_spec.rb');
        assert.strictEqual(buildPrefix(10, { workspaceFolder: '/some/unrelated/path' }),
            'Users/mike/projects/example-project/app/models/person_spec.rb');
        assert.strictEqual(buildPrefix(10, { workspaceFolder: '/app/models' }),
            'Users/mike/projects/example-project/app/models/person_spec.rb');
    });

    test('respects patternsToStrip', function() {
        assert.strictEqual(buildPrefix(1, { currentFilename: '/dir/person.html.erb', patternsToStrip: [] }), 'dir/person.html.erb');
        assert.strictEqual(buildPrefix(1, { currentFilename: '/dir/person.html.erb', patternsToStrip: ['{EXTENSION}'] }), 'dir/person');
        assert.strictEqual(buildPrefix(1, { currentFilename: '/dir/person.rb', patternsToStrip: ['{EXTENSION}'] }), 'dir/person');
        assert.strictEqual(buildPrefix(1, { currentFilename: '/dir/.gitignore', patternsToStrip: ['{EXTENSION}'] }), 'dir/.gitignore');

        assert.strictEqual(buildPrefix(1, { currentFilename: '/dir/person.test.rb', patternsToStrip: ['.test'] }), 'dir/person.rb');
        assert.strictEqual(buildPrefix(10, { currentFilename: '/dir/ignored_dir/person.test.rb', patternsToStrip: ['.test', 'ignored_dir/'] }), 'dir/person.rb');
        assert.strictEqual(buildPrefix(10, { currentFilename: '/a/b/c/d.html', patternsToStrip: ['b/', 'c/'] }), 'a/d.html');
    });
});
