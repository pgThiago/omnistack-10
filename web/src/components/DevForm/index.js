import React, { useState, useEffect } from 'react';

function DevForm({ onSubmit }){

    const [ github_username, setGithub_username ] = useState('');

    const [ techs, setTechs ] = useState('');
    
    const [ longitude, setLongitude ] = useState('');
    const [ latitude, setLatitude ] = useState('');    

    useEffect(() => {
    // Pegar a localização do usuário através de uma função global do navegador
      navigator.geolocation.getCurrentPosition(
      
        (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
        },

        (err) => {
            console.log(err);
        },{
          timeout: 30000,
        }
      );

  }, []);

  async function handleSubmit(e){
    e.preventDefault();
    await onSubmit({
        github_username,
        techs,
        latitude,
        longitude,
    });

    setGithub_username('');
    setTechs('');
    setLongitude('');
    setLatitude('');

  }

    return (
        <form onSubmit={handleSubmit} >
            
              <div className="input-block">
                  <label htmlFor="techs">Usuário do GitHub</label>
                  <input 
                  name="github_username" 
                  id="github_username" 
                  value={github_username}
                  onChange={e => setGithub_username(e.target.value)}
                  required />
              </div>

              <div className="input-block">
                  <label htmlFor="techs">Tecnologias</label>
                  <input 
                  name="techs" 
                  id="techs" 
                  value={techs}
                  onChange={e => setTechs(e.target.value)}
                  required />
              </div>

            <div className="input-group">
              
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input 
                    type="number" 
                    onChange={e => setLatitude(e.target.value)} 
                    name="latitude" 
                    id="latitude" 
                    value={latitude} 
                    required />
                </div>

                <div className="input-block">
                    <label htmlFor="longitude">longitude</label>
                    <input 
                    type="number" 
                    onChange={e => setLongitude(e.target.value)} 
                    name="longitude" 
                    id="longitude" 
                    value={longitude} 
                    required />
                </div>

            </div>

            <button type="submit">Salvar</button>
          </form>
    )
}

export default DevForm;