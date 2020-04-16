import React, { useState, useEffect, Fragment,SyntheticEvent} from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import NavBar from "../../features/navbar/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "../../app/layout/LoadingComponent";
import agent from "../../app/api/agent";
import axios, { AxiosResponse } from 'axios';
const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  {
    /* here 'activities' is a variable and 'setActivities' is a function through which we can set value for 'activities'. React Hooks-refer*/
  }
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [target,setTarget]=useState('');

  const [editMode, setEditMode] = useState(false); //initial value of editMode is false(automatically editMode is initialized to boolean)
  const[loading,setLoading]=useState(true);
  const [submitting,setSubmitting]=useState(false);
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };
  const handleOpenCreateForm = () => {
    //This is a function.means this function takes 0 arguments
    setSelectedActivity(null);
    setEditMode(true);
  };
  const handleCreateActivity = (activity: IActivity) => {
    console.log(activity);
    setSubmitting(true);   
  
   agent.Activities.create(activity)
     .then((data:any) => {
      setActivities([...activities, activity]);// ... means spread operator in react
      setSelectedActivity(activity);
     setEditMode(false);
   })
  .catch((err)=>{
    console.log(err);
    }).then(()=> setSubmitting(false))
   
  };
  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true); 
    console.log(activity);
        agent.Activities.update(activity)
     .then(() => {
       setActivities([...activities.filter((a) => a.id!== activity.id),
         activity,
       ]);
      setSelectedActivity(activity);
     setEditMode(false);
    })
    .catch((err)=>{
     console.log(err);
      }).then(()=> setSubmitting(false));
  };
  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement> ,id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id)
     .then(() => {
      setActivities([...activities.filter((a) => a.id!== id)]);
     })
     .catch((err)=>{
      console.log(err);
       }).then(()=> setSubmitting(false));
   
  };
  useEffect(() => {
    agent.Activities.list().then((response) => {
      console.log(response);
      let activities: IActivity[] = [];
      response.forEach((activity) => {
       
        activity.date = activity.date.split(".")[0];
        activities.push(activity);
      });
      setActivities(activities);
    }).then(()=>setLoading(false));
  }, []); //empty array is given bcz to prevent calling api again and again

  if(loading) return <LoadingComponent content='Loading activities...'/>


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
          submitting={submitting}
          target={target}
        />
        {/* here we are passing activities to activitydashboard.tsx .. ! means it can also be a null*/}
      </Container>
    </Fragment>
  );
  //}
};

export default App;
