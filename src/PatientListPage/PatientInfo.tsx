/* eslint-disable no-prototype-builtins */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // use params returns match.params object

import { Patient } from '../types';
import { useStateValue } from '../state';
import { apiBaseUrl } from '../constants';

const PatientInfo: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();

  const [patientData, setPatientData] = useState<Patient>();
  const { id } = useParams<{ id: string }>();
  
  useEffect(() => {
  
    const fetchPatientById = async () => {

        try { // right now this try block works, the api call works, retrieved data is being set to localstate patientData
          if (patients.hasOwnProperty(id)) {
            setPatientData(patients.id);
          }
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
    fetchPatientById();
  }, [patientData] );

  if (!patientData) {
    return null;
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