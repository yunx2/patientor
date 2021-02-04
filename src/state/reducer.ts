import { State } from "./state";
import { Patient } from "../types";
// import { PatientFormValues } from '../AddPatientModal/AddPatientForm';

export type Action = // type definition
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => { // define reducer function
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state, // current state
        patients: {
          ...action.payload.reduce(  // action.payload is an array of patients. array.reduce is called on the array
            (memo, patient) => ({ ...memo, [patient.id]: patient }), // memo is the accumulator parameter of the reducer function, patient is currentValue parameter
            {} // initial value of accumulator 
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patientList: Patient[]): Action => { // action creator
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList
  };
};

// export const addPatient = (data: PatientFormValues): Action => {
//   return {
//     type: 'ADD_PATIENT',
//     payload: data
//   };
// };