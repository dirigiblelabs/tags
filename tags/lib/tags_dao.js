/* globals $ */
/* eslint-env node, dirigible */
"use strict";

var tagsORMDef = exports.tagsORMDef = {
	table: "ANN_TAG",
	properties: [
		{
			name: "id",
			column: "ANN_ID",
			id: true,
			required: true,
			type: "BIGINT"
		},{ 
			name: "defaultLabel",
			column: "ANN_DEFAULT_LABEL",
			type: "VARCHAR",
			size: 100,
		},{ 
			name: "description",
			column: "ANN_DESCR",
			type: "VARCHAR",
			size: 200,
		},{ 
			name: "namespace",
			column: "ANN_NS",
			type: "VARCHAR",
			size: 100,
		},{
			name: "uri",
			column: "ANN_URI",
			type: "VARCHAR",
			size: 255,
		}	
	]
};

var daos = require('db/dao');
exports.create = function(){
	return daos.dao(tagsORMDef, 'Tags DAO');
};