/* eslint-disable no-prototype-builtins */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // use params returns match.params object

import { Patient } from '../types';
import { useStateValue } from '../state';
import { apiBaseUrl } from '../constants';

const PatientInfo: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();

  // const [patientId, setPatientId] = useState<string>('');
  const [patientData, setPatientData] = useState<Patient>();
  const { id } = useParams();
  
  useEffect(() => {
    // first check current state for patient data; if not found, then make api call and add update state to include new patient data
    const fetchPatientById = async () => {
      // if (patients.hasOwnProperty(id)) {
      //   setPatientData(patients.id);
      // } 
        try {
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
  }, [dispatch] );

  if (!patientData) {
    return null;
  }
  return (
    <div>
      <div>name: {patientData.name}</div>
      <div>id: {patientData.id}</div>
      <div>occupation: {patientData.occupation}</div>
      <div>ssn: {patientData.ssn}</div>
      <div>date of birth: {patientData.dateOfBirth}</div>
      <div>entries: {patientData.entries}</div>
    </div>
  );
};

export default PatientInfo;