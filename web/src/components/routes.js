import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MainApp from './MainApp';
import DevForm from './DevForm';
import DevItem from './DevItem';
import UpdateTechs from './UpdateTechs';


function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={MainApp} />
                <Route exact path="/update/:username" component={UpdateTechs} />
                <Route path="/devform" component={DevForm} />
                <Route path="/devItem" component={DevItem} />
            </Switch>   
        </BrowserRouter>
    )
}

export default Routes;