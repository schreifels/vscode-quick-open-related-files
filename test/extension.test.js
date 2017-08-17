/* global suite, test */

const assert = require('assert');
const extension = require('../extension');

suite('extension tests', function() {
    function buildPrefix(levelsToPreserve, workspaceFolder = undefined) {
        return extension.buildPrefix('/Users/mike/projects/example-project/app/models/person.rb', workspaceFolder, '/', {
            levelsToPreserve
        });
    }

    test('respects levelsToPreserve', function() {
        assert.strictEqual(buildPrefix(-10), 'person.rb');
        assert.strictEqual(buildPrefix(0), 'person.rb');
        assert.strictEqual(buildPrefix(1), 'models/person.rb');
        assert.strictEqual(buildPrefix(2), 'app/models/person.rb');
        assert.strictEqual(buildPrefix(6), 'Users/mike/projects/example-project/app/models/person.rb');
        assert.strictEqual(buildPrefix(10), 'Users/mike/projects/example-project/app/models/person.rb');
    });

    test('respects workspaceFolder', function() {
        assert.strictEqual(buildPrefix(0, '/Users/mike/projects/example-project'), 'person.rb');
        assert.strictEqual(buildPrefix(10, '/Users/mike/projects/example-project'), 'app/models/person.rb');
        assert.strictEqual(buildPrefix(6, '/some/unrelated/path'), 'Users/mike/projects/example-project/app/models/person.rb');
        assert.strictEqual(buildPrefix(6, '/app/models'), 'Users/mike/projects/example-project/app/models/person.rb');
    });
});
