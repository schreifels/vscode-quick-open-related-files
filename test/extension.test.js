/* global suite, test */

const assert = require('assert');
const extension = require('../extension');

suite('extension tests', function() {
    function buildPrefix(levelsToPreserve) {
        return extension.buildPrefix('/Users/mike/projects/example-project/app/models/person.rb', '/', {
            levelsToPreserve
        });
    }

    test('preserves the correct number of levels', function() {
        assert.strictEqual(buildPrefix(-10), 'person.rb');
        assert.strictEqual(buildPrefix(0), 'person.rb');
        assert.strictEqual(buildPrefix(1), 'models/person.rb');
        assert.strictEqual(buildPrefix(2), 'app/models/person.rb');
        assert.strictEqual(buildPrefix(6), 'Users/mike/projects/example-project/app/models/person.rb');
        assert.strictEqual(buildPrefix(10), 'Users/mike/projects/example-project/app/models/person.rb');
    });
});
