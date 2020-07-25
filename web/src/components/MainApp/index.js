import React, { useState, useEffect } from 'react';

import './styles.css';
import '../../global.css';
import '../../Sidebar.css';
import '../../Main.css';

import api from '../../services/api';

import DevItem from '../DevItem';
import DevForm from '../DevForm';


function MainApp() {

  const [ devs, setDevs ] = useState([]);  

  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs')
      setDevs(response.data);
    }
    loadDevs();
  }, []);  
  

  async function handleAddDev(data){

    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }
  
  
  
  return (  
    <div id="app">
      <aside>
          <strong>Cadastrar</strong>
          <DevForm onSubmit={handleAddDev}/>
      </aside>
      
      <main>
       
        <ul>
          {
            devs.map(dev => (
              <DevItem key={dev._id} dev={dev} />
            ))
          }
        </ul>

      </main>

    </div>
  );

}

export default MainApp;
