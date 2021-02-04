import React from 'react';
import { Entry } from '../types'; 

const PatientEntry: React.FC<{ key: string; entry: Entry}> = ({ entry }) => {
  return (
    <div>{entry.description}</div>
  );
};

export default PatientEntry;