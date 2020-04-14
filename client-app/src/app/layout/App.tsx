import React, { useState, useEffect, Fragment } from "react";
//import './App.css';
import axios from "axios";
import {  Container } from "semantic-ui-react";
//import { start } from 'repl';
import { IActivity } from "../models/activity";
import NavBar from "../../features/navbar/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

//interface IState{
//  activities:IActivity[] // activities is a variable, which is an array of type  IActivity
//}
//class App extends Component<{},IState>{
const App = () => {
  // readonly state:IState={
  //  activities:[],
  const [activities, setActivities] = useState<IActivity[]>([]);
  {
    /* here 'activities' is a variable and 'setActivities' is a function through which we can set value for 'activities'. React Hooks-refer*/
  }
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode,setEditMode]=useState(false);//initial value of editMode is false(automatically editMode is initialized to boolean)
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };
  const handleOpenCreateForm=()=>{ //This is a function.means this function takes 0 arguments
    setSelectedActivity(null);
    setEditMode(true);
  }
const handleCreateActivity=(activity:IActivity)=>{
  setActivities([...activities,activity]) //... means spread operator in react
  setSelectedActivity(activity);
  setEditMode(false);
}
const handleEditActivity=(activity:IActivity)=>{
  setActivities([...activities.filter(a=>a.id!==activity.id),activity])
  setSelectedActivity(activity);
  setEditMode(false);
}
const handleDeleteActivity=(id:string)=>{
  setActivities([...activities.filter(a=>a.id!==id)])
}
  useEffect(() => {
    axios
      .get<IActivity[]>("https://localhost:5001/api/Activities/List") //get<IActivity[]> here means, we are going to get an array of IActivity[].
      .then((response) => {
        let activities:IActivity[]=[];
        response.data.forEach(activity=> {activity.date=activity.date.split('.')[0];
        activities.push(activity);
      })
        setActivities(activities);
      });
  }, []); //empty array is given bcz to prevent calling api again and again


  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />
        {/* here we are passing activities to activitydashboard.tsx .. ! means it can also be a null*/}
      </Container>
    </Fragment>
  );
  //}
};

export default App;
