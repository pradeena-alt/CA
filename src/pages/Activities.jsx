import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

function Activities() {
  const { activities } = useContext(ActivityContext);

  const validActivities = activities.filter(
    (a) =>
      a.steps > 0 &&
      a.caloriesBurned > 0 &&
      a.workoutMinutes > 0 &&
      typeof a.goalAchieved === "boolean"
  );

  return (
    <div>
      {validActivities.map((a) => (
        <div key={a.activityId} data-testid="activity-item">
          {a.name || "Unknown"}
        </div>
      ))}
    </div>
  );
}

export default Activities;