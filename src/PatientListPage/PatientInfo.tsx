/* eslint-disable no-prototype-builtins */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // use params returns match.params object

import { Patient } from '../types';
import { useStateValue, addPatient } from '../state';
import { apiBaseUrl } from '../constants';
// import PatientEntry from './PatientEntry';

const PatientInfo: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue(); // patients looks
  // like this {patient1.id: {patient1object}, patient2.id: {patient2object}}
  const { id } = useParams<{ id: string }>();
  const [patientData, setPatientData] = useState<Patient>(); // the retrieved patient data is set as a local state so that it's data can be used in PatientInfo's return value
  
  useEffect(() => {
    // define a function containing the side effect logic; useEffect's first argument can't be async; so in order to do async side effect things like api calls, an anonymous function is wrapped around an async function definition and call

    const fetchPatientById = async () => {
        const patientsArr = Object.values(patients); // type Patient[]
        const foundPatient = patientsArr.find((patient: Patient) => patient.id === id); // array.find either returns the found value or returns undefined
        setPatientData(foundPatient);
        if (foundPatient) { // if patient with matching id found, set as local state
          setPatientData(foundPatient);
        } else { // other wise make api call
          try { // right now this try block works, the api call works, retrieved data is being set to localstate patientData
            const { data: newPatientData } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            setPatientData(newPatientData);
            dispatch(addPatient(newPatientData));
          } catch (e) {
            console.error(e);
          }
        } 
    };
    // call the previously defined function
    fetchPatientById();
  }, [dispatch, id]); // why did removing patientData from dependencies array make the 'can't perform a react state update on an unmounted component...' warning go away?
  if (!patientData) {
    return <div></div>;
  }
  const { entries } = patientData;
  return (
    <div>
      <div><h3>{patientData.name}</h3></div>
      <br />
      <div>ssn: {patientData.ssn}</div>
      <div>occupation: {patientData.occupation}</div>
      <br />
      <div>
        <h3>Entries</h3>
        <div>date of birth: {patientData.dateOfBirth} </div>
      </div>
      
    </div>
  );
};

export default PatientInfo;