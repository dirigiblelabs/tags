/* globals $ */
/* eslint-env node, dirigible */
"use strict";

var TagORM = {
	dbName: "ANN_TAG",
	properties: [
		{
			name: "id",
			dbName: "ANN_ID",
			id: true,
			required: true,
			type: "Long"
		},{ 
			name: "defaultLabel",
			dbName: "ANN_DEFAULT_LABEL",
			type: "String"
		},{
			name: "uri",
			dbName: "ANN_URI",
			type: "String"
		}	
	]
};

var DAO = require('daoism/dao').DAO;
var TagDAO  = exports.TagDAO = function(orm){
	orm = orm || TagORM;
	DAO.call(this, orm, 'Tag DAO');
};
TagDAO.prototype = Object.create( DAO.prototype );

// Reads a single entity by id, parsed into JSON object 
TagDAO.prototype.findByTagValue = function(tag) {

	this.$log.info('Finding '+this.orm.dbName+' entity with label[' + tag + ']');

	if(tag=== undefined || tag === null){
		throw new Error('Illegal argument for tag parameter:' + tag);
	}

    var connection = this.datasource.getConnection();
    try {
        var entity;
        var sql = "SELECT * FROM ANN_TAG WHERE ANN_DEFAULT_LABEL = ?";
     
        var statement = connection.prepareStatement(sql);
        statement.setString(1, tag);

        var resultSet = statement.executeQuery();
        if (resultSet.next()) {
        	entity = this.createEntity(resultSet);
        	this.$log.info(this.orm.dbName+'[' + entity.id + '] entity with label[' + tag + '] found');
        } else {
        	this.$log.info(this.orm.dbName+'[' + entity.id + '] entity with label[' + tag + '] not found');
        }
        return entity;
    } finally {
        connection.close();
    }
};


exports.get = function(){
	return new TagDAO(TagORM);
};