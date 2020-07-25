import React from 'react';

import { useHistory } from "react-router-dom";

import api from '../../services/api';

import './styles.css';

function DevItem({ dev }){    

    const history = useHistory();

    function goToUpdatePage(){
        history.push(`/update/${dev.github_username}`, {
            dev
        });  
    } 

    async function handleDelete(){
        try{
            await api.delete(`/delete/${dev._id}`);  
            window.location.reload()           ;
        }

        catch(error){
            console.log(error);
        }
    }

    return(
        <li className="dev-item">
            <header>
                <img src={dev.avatar_url} alt={dev.name}/>
                <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.bio}</span>
                </div>
            </header>
            <div className="buttons">            
                <p>{dev.description}</p>
                <button className="link-button"><a target="_blank" rel="noopener noreferrer" href={`https://github.com/${dev.github_username}`}>Acessar perfil</a></button>
                <button onClick={goToUpdatePage} className="updateButton">Atualizar perfil</button>
                <button onClick={handleDelete} className="deleteButton">Excluir perfil</button>
            </div>
        </li>
    )
}

export default DevItem;

