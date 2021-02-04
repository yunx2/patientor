/* eslint-disable no-prototype-builtins */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // use params returns match.params object

import { Patient } from '../types';
import { useStateValue } from '../state';
import { apiBaseUrl } from '../constants';

const PatientInfo: React.FC = () => {
  const [, dispatch] = useStateValue(); // comma before 'dispatch' indicates that dispatch is assigned the value of the second element of the tuple (ie the dispatch function) and not the first element (ie the state value)

  const [patientData, setPatientData] = useState<Patient>(); // the retrieved patient data is set as a local state so that it's data can be used in PatientInfo's return value
  const { id } = useParams<{ id: string }>();
  
  useEffect(() => {
    // define a function containing the side effect logic; useEffect's first argument can't be async; so in order to do async side effect things like api calls, an anonymous function is wrapped around an async function definition and call

    const fetchPatientById = async () => {
        try { // right now this try block works, the api call works, retrieved data is being set to localstate patientData
          const { data: newPatientData } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
          setPatientData(newPatientData);
          dispatch({
            type: "ADD_PATIENT",
            payload: newPatientData
          });
        } catch (e) {
          console.error(e);
        }
    };
    // call the previously defined function
    fetchPatientById();
  }, [dispatch, id]); // why did removing patientData from dependencies array make the 'can't perform a react state update on an unmounted component...' warning go away?

  if (!patientData) {
    return <div></div>;
  }
  return (
    <div>
      <div>name: {patientData.name}</div>
      <div>occupation: {patientData.occupation}</div>
      <div>ssn: {patientData.ssn}</div>
      <div>date of birth: {patientData.dateOfBirth}</div>
      <div>entries: {patientData.entries}</div>
    </div>
  );
};

export default PatientInfo;