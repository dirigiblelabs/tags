/* globals $ */
/* eslint-env node, dirigible */
"use strict";

var tagsDAO = require("annotations/lib/tags_dao").get();
var daoService = require('arestme/data_service').asService(tagsDAO, {}, 'Tags DAO Service');

var handler = function(context, io){
	    try{
	    	//TODO: fix this to a native sql query
	    	var entities = daoService.dao.list({})
	    					.filter(function(entity){
	    						return entity.defaultLabel === context.queryParams.label;
	    					}); 
	    	io.response.println(JSON.stringify(entities, null, 2));
			io.response.setStatus(io.response.OK);
		} catch(e) {
    	    var errorCode = io.response.INTERNAL_SERVER_ERROR;
    	    this.logger.error(e.message, e);
        	this.sendError(errorCode, errorCode, e.message);
        	throw e;
		}		
	}
daoService.addResourceHandler('label', 'get', handler, undefined, ["application/json"]);
daoService.service();

/*var create = function(context, io){
	var input = io.request.readInputText();
    var entity = JSON.parse(input);
    try{
		entity[this.dao.getPrimaryKey()] = this.dao.insert(entity, context.queryParams.cascaded);
		io.response.setStatus(io.response.OK);
		io.response.setHeader('Location', $.getRequest().getRequestURL().toString() + '/' + entity[this.dao.getPrimaryKey()]);
	} catch(e) {
	    var errorCode = io.response.INTERNAL_SERVER_ERROR;
	    this.logger.error(errorCode, e.message, e.errContext);
    	this.sendError(io, errorCode, errorCode, e.message, e.errContext);
    	throw e;
	}	
};

Tag.prototype.cfg[""].post = {
	consumes: ["application/json"],
	handler: function(context, io){
		var input = io.request.readInputText();
	    try{
	    	var tags = JSON.parse(input);
	    	if(!Array.isArray(tags)){
	    		tags = [tags];
	    	}
	    	for(var i=0;i<tags.length;i++){
	    		create.apply(this, [context, io]);
	    	}
			io.response.setStatus(io.response.NO_CONTENT);
		} catch(e) {
    	    var errorCode = io.response.INTERNAL_SERVER_ERROR;
    	    this.logger.error(errorCode, e.message, e.errContext);
        	this.sendError(io, errorCode, errorCode, e.message, e.errContext);
        	throw e;
		}		
	}
};


var tag = new Tag(tagsDAO);	

var request = require("net/http/request");
var response = require("net/http/response");

tag.service(request, response);
*/
