import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    step:0,
    Category:"",
    Name:"",
    ElectionName:"",
    Candidate_id:"",
    Surveyid :""
}

const servicesStepSlice = createSlice({
    name:"Steps",
    initialState:initialState,
    reducers:{
        setStep(state,value){
            state.step = value.payload
        },
        setCategory(state,value){
            state.Category = value.payload
        },
        setName(state,value){
            state.Name = value.payload
        },
        setElectionName(state,value){
            state.ElectionName = value.payload
        },
        setCandidate_id(state,value){
            state.Candidate_id = value.payload
        },
        setSurveyid(state,value){
            state.Surveyid = value.payload
        }
    }
})
export const { step,setStep,Name,Category,setCategory,setName,setElectionName,ElectionName,setCandidate_id,Candidate_id,setSurveyid,Surveyid} = servicesStepSlice.actions;
export default servicesStepSlice.reducer;