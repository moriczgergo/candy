var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var { getReference, getItems, createCatalog, createReference, editReference } = require('./../lib/reffs');

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

describe('reffs:createReference', function() {
	var result1 = createReference("/testRef");
	var result2 = createReference("/testCat/testRef");
	var result3 = createReference("/testRef2", "# HW\n");

	it('should return the reference\'s path', function() {
		expect(result1).to.equal("/testRef");
	});

	it('should create an empty reference file', function() {
		expect(fs.existsSync("ref/testRef.md")).to.be.true;
		expect(fs.readFileSync("ref/testRef.md", "UTF-8")).to.equal("");
		fs.unlinkSync("ref/testRef.md");
	});

	it('should return undefined if the base directory doesn\'t exist', function() {
		expect(result2).to.be.undefined;
	});

	it('should write the data in the second argument to the reference file', function() {
		expect(result3).to.equal("/testRef2");
		var manualRead = fs.readFileSync("ref/testRef2.md", "UTF-8");
		expect(manualRead).to.equal("# HW\n");
		fs.unlinkSync("ref/testRef2.md");
	});
});

describe('reffs:createCatalog', function() {
	var result1 = createCatalog("/testCat");
	var result2 = createCatalog("/testCatA/testCat");

	it('should return the catalog\'s path', function() {
		expect(result1).to.equal("/testCat");
		fs.rmdirSync("ref/testCat");
	});

	it('should return undefined if the base directory doesn\'t exist', function() {
		expect(result2).to.be.undefined;
	});
});

describe('reffs:editReference', function() {
	createReference("/testRefE");
	var result1 = editReference("/testRefE", "# HW \n");
	var result2 = editReference("/testRefE2", "# HW \n");

	it('should return the reference\'s path', function() {
		expect(result1).to.equal("/testRefE");
	});

	it('should modify an existing reference file', function() {
		expect(fs.existsSync("ref/testRefE.md")).to.be.true;
		expect(fs.readFileSync("ref/testRefE.md", "UTF-8")).to.equal("# HW \n");
		fs.unlinkSync("ref/testRefE.md");
	});

	it('should return undefined if the reference doesn\'t exist', function() {
		expect(result2).to.be.undefined;
	});
});