var fs = require('fs');
var path = require('path');

function getReference(refPath) {
	var fullRefPath = path.join(__dirname, '../ref/', refPath + ".md");
	if(fs.existsSync(fullRefPath)) {
		var ref = fs.readFileSync(fullRefPath, "UTF-8");
		return ref;
	} else {
		return;
	}
}

function getItems(catalogPath) {
	var fullCatalogPath = path.join(__dirname, '../ref/', catalogPath);
	if (fs.existsSync(fullCatalogPath)) {
		var itemList = fs.readdirSync(fullCatalogPath, "UTF-8");
		var itemObj = {
			catalogs: [],
			references : []
		};
		itemList.forEach(function (element) {
			if (fs.statSync(path.join(fullCatalogPath, element)).isDirectory()) {
				itemObj.catalogs.push(element);
			} else {
				itemObj.references.push(element.split(".")[0]);
			}
		});
		return itemObj;
	} else {
		return;
	}
}

module.exports = {
    getItems,
    getReference
};