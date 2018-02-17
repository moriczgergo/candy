var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var { getReference, getItems } = require('./../lib/reffs');

describe('reffs:getReference', function() {
	it('should return a reference file\'s contents', function() {
		var manualRead = fs.readFileSync(path.join(__dirname, '../ref/helloWorld.md'), 'utf8');
		var reffsRead = getReference("/helloWorld");
		expect(reffsRead).to.equal(manualRead);
	});

	it('should return undefined if the reference doesn\'t exist', function() {
		var reffsRead = getReference("/?--!/_____"); // invalid path
		expect(reffsRead).to.be.undefined;
	});
});

describe('reffs:getItems', function() {
	it('should return a catalog\'s items', function() {
		var reffsList = getItems("/helloCatalog");
		expect(reffsList).to.have.property("catalogs").that.is.empty;
		expect(reffsList).to.have.property("references").that.length(1);
		expect(reffsList.references).to.contain("helloWorld");
	});

	it('should return undefined if the catalog doesn\'t exist', function() {
		var reffsRead = getItems("/?--!/_____"); // invalid path
		expect(reffsRead).to.be.undefined;
	});
});