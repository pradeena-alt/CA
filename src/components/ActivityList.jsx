import { useActivity } from "../contexts/ActivityContext";
import ActivityCard from "./ActivityCard";

const ActivityList = () => {
  const { activities, loading } = useActivity();

  if (loading) {
    return <p data-testid="loading">Loading activities...</p>;
  }

  if (activities.length === 0) {
    return (
      <p className="no-activities" data-testid="no-activities">
        No activities available
      </p>
    );
  }

  return (
    <div className="activity-list" data-testid="activity-list">
      {activities.map((activity) => (
        <ActivityCard key={activity.activityId} activity={activity} />
      ))}
    </div>
  );
};

export default ActivityList;
