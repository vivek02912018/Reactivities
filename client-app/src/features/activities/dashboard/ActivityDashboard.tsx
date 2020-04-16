import React,{SyntheticEvent} from "react";
import { Grid,} from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import ActivityList from "../../activities/dashboard/ActivityList";
import ActivityDetails from "../../activities/details/ActivityDetails";
import ActivityForm from "../../activities/form/ActivityForm";
interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  selectedActivity: IActivity | null;
  editMode: boolean;
  setEditMode: (
    editMode: boolean
  ) => void /*'setEditMode' is a function which accepts parameter 'editMode' of type boolean and this function returns void */;
  setSelectedActivity: (activity: IActivity | null) => void;
  createActivity:(activity:IActivity)=>void;
  editActivity:(activity:IActivity)=>void;
  deleteActivity:(e: SyntheticEvent<HTMLButtonElement>,id:string)=>void;
  submitting:boolean;
  target:string
}
const ActivityDashboard: React.FC<IProps> = ({
  activities,
  selectActivity,
  selectedActivity,
  editMode,
  setEditMode,
  setSelectedActivity,
  createActivity,
  editActivity,
  deleteActivity,
  submitting,
  target
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList activities={activities} 
        selectActivity={selectActivity} 
        deleteActivity={deleteActivity} 
        submitting={submitting}
        target={target}
        />{" "}
        {/*here we are sending 'activities' which we got from 'App.tsx' to ActivityList*/}
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}
            
          />
        )}{" "}
        {/*means whatever on the right side of '&&' will get executed only if 'selectedActivity' is not null */}
        {editMode && (
          <ActivityForm key={selectedActivity && selectedActivity.id || 0 } setEditMode={setEditMode} activity={selectedActivity!} createActivity={createActivity} editActivity={editActivity} submitting={submitting} />
        )}
      </Grid.Column>
    </Grid>
  );
};
export default ActivityDashboard;
