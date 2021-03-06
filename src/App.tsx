import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList } from "./state";

import { Patient } from "./types";

import PatientListPage from "./PatientListPage/index";
import PatientInfo from './PatientListPage/PatientInfo';

const App: React.FC = () => {
  const [, dispatch] = useStateValue(); // comma before 'dispatch' indicates that dispatch is assigned the value of the second element of the tuple (ie the dispatch function) and not the first element (ie the state value)
  React.useEffect(() => { // side effects
    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>( 
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi)); // patientListFromApi is an array of Patients
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id"> <PatientInfo /> 
            </Route>
            <Route path="/" render={() => <PatientListPage />} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
