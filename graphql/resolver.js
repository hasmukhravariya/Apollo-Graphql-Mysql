const { where, returning, plain } = require('sequelize');
const { users, sequelize} = require('../models');
const initModels = require("../models/init-models");

var models = initModels(sequelize);


const Query = {
	getUserDetails: async () => {
		try {
			const authors = await users.findAll();
			return authors;
		}catch(err){
			console.log(err);
		}
	},
	getUser: async (root, { id }) => {
    	try {
      		const auth = await users.findByPk(id)
      		return auth;
    	} catch (err) {
      		console.log(err);
    	}
  	},
}

const Mutation = {
	createuser: async (_ , {
		name,
		email,
		username,
		password,
		image,
		address,
		phone,
		gender
	}) =>  {
		try {
			const response=await users && users.create({
				name,
				email,
				username,
				password,
				image,
				address,
				phone,
				gender		
			});
			return response																							
		}catch(error){
			console.error(error);
			// return error
		}
	},

	updateuser: async (_ , {
		id,
		name,
		email,
		username,
		password,
		image,
		address,
		phone,
		gender
	}) => {
		try {
			let auth
			await users && users.update({
				id,
				name,
				email,
				username,
				password,
				image,
				address,
				phone,
				gender
			} ,{ where: { id: id }, returning: true, raw: true })
			auth = await users.findByPk(id)
			auth = await users.findByPk(id)
			return auth
			
		}catch (err) {
			console.error(err);
  		}	
	},

	deleteuser: async(_ , { id }) => {
		await users.destroy({ where: { id: id }})
		return "user Deleted";
	},

}

module.exports = { Query, Mutation }