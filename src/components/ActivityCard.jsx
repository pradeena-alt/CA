import { useActivity } from "../context/ActivityContext";

const ActivityCard = ({ activity }) => {
  const { toggleGoal } = useActivity();

  return (
    <div data-testid="activity-item">
      <h3>{activity.name}</h3>

      <p>Steps: {activity.steps}</p>
      <p>Calories: {activity.caloriesBurned}</p>
      <p>Minutes: {activity.workoutMinutes}</p>
      <p>Date: {activity.date}</p>

      <p>
        Goal: {activity.goalAchieved ? "Achieved" : "Not Achieved"}
      </p>

      <button onClick={() => toggleGoal(activity.activityId)}>
        Toggle
      </button>
    </div>
  );
};

export default ActivityCard;