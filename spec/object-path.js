if (typeof require !== 'undefined') {
    var Validator = require('../src/validator.js');
    var expect = require('chai').expect;
} else {
    var Validator = window.Validator;
    var expect = window.chai.expect;
}

describe('Validator', function () {
    context('_objectPath', function() {
        it('should return correct value preserving type', function() {
            var obj = {
                foo: "bar",
                "foo.bar": true,
                fizz : {
                    buzz : {
                        foo : "bar"
                    }
                }
            };
            var asserts = [
                ["foo", "string", "bar"],
                ["foo.bar","boolean", true],
                ["fizz.buzz", "object", "{\"foo\":\"bar\"}"]
            ];
            var validator = new Validator({}, {});

            asserts.forEach(function (assert) {
                var val = validator._objectPath(obj, assert[0]);
                expect(val).to.be.a(assert[1]);
                if (assert[1] === "object") {
                    val = JSON.stringify(val)
                }
                expect(val).to.be.eql(assert[2]);
            });
        });
    });
}); // Page constructor
