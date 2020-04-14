import React from "react";
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
  deleteActivity:(id:string)=>void;
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
  deleteActivity
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} />{" "}
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
          <ActivityForm key={selectedActivity && selectedActivity.id ||0 } setEditMode={setEditMode} activity={selectedActivity!} createActivity={createActivity} editActivity={editActivity} />
        )}
      </Grid.Column>
    </Grid>
  );
};
export default ActivityDashboard;
