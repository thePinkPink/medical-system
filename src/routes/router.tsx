import React from 'react';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';

import Patient from '../view/PatientView';
import Doctor from '../view/DoctorView';
import Admin from '../view/AdminView';

function Router(props: any & RouteComponentProps) {

	return (
    <Switch>
      <Route path="/Patient" component={Patient}/>
      <Route path="/Doctor" component={Doctor}/>
      <Route path="/Admin" component={Admin}/>
      <Redirect to='/Patient'></Redirect>
    </Switch>
	);
}

export default Router;