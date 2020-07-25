import React, { useState } from 'react';

import './styles.css';

import api from '../../services/api';

import { useHistory } from "react-router-dom";

function UpdateTechs({ location }){

    const history = useHistory();
    
    const [ techs, setTechs ] = useState([]);
    const { github_username, name, avatar_url } = location.state.dev;
    
    async function handleUpdate(){
        
        try{
            await api.put(`/update/${github_username}`, {
                techs
            });
        }

        catch(error){
            alert('User not found');
        }

        history.push('/');
    }
    

    return(
        <div className="update-container">
            <h1>Atualizar tecnologias</h1>
            
            <img src={avatar_url} alt="avatar"/>
            
            <h3>Vamos lá, {name}?</h3>
            
            <span>Digite suas novas tecnologias abaixo</span>
            <h4>Irá sobrescrever as techs já cadastradas</h4>
            
            <input name="techs" value={techs} onChange={e => setTechs(e.target.value)} />
            
            <button onClick={handleUpdate} className="updateBtn">Atualizar</button>
        </div>
    )
}

export default UpdateTechs;

