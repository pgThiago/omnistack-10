const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

    async index(request, response){
        // Buscar devs num raio de 10km
        // Filtrar por tecnologias
        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        })

        return response.json({ devs });

    },

    // Desafio do Di:
    // Criar os métodos update() e destroy()
    // Não permitir q o user atualize o username pois não faz sentido NTC

    /* async update(){

    },

    async destroy(){
        
    } */
}
