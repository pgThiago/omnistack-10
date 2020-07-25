const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {

    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store (request, response) {
        
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);
                
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }    
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });

            // Filtrar as conexões  que estão há no máximo 10km de distância
            // e que o novo dev tenha pelo menos uma das tecnologias
            sendSocketMessageTo = findConnections(
                {latitude, longitude},
                techsArray,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }  
            
        return response.json(dev);
    
    },
    
    // Desafio do Di:
    // Criar os métodos update() techs e destroy() user
    // Não permitir q o user atualize o username pois não faz sentido NTC

    async update(request, response){

        const github_username = request.params; 
        
        const { techs } = request.body;

        const techsArray = parseStringAsArray(techs);

        const dev = await Dev.findOneAndUpdate(github_username, {
            techs: techsArray,
        },{
            returnOriginal: false
        });

        if(!dev)
            return response.status(202).json({ message: 'User not found' });


        await dev.save();

        return response.json(dev);

        /* const { id } = request.params; 
        
        const { techs } = request.body;

        const techsArray = parseStringAsArray(techs);

        const dev = await Dev.findIdAndUpdate(id, {
            techs: techsArray 
        });

        console.log(id);

        return response.json(dev); */
    },

    async destroy(request, response){
        
        const { id } = request.params; 

        const dev = await Dev.findByIdAndDelete(id, { returnOriginal: false     });

        if(!dev)
            return response.status(202).json({ message: 'User not found' });


        return response.json(dev);
    }

};

