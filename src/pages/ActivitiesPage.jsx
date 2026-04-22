import React, { useEffect } from "react";
import { useActivity } from "../context/ActivityContext";
import { Link } from "react-router-dom";
import ActivityCard from "../components/ActivityCard";

const ActivitiesPage = () => {
  const { activities, loading, error } = useActivity();

  // Filter valid activities using .filter()
  const validActivities = activities.filter((activity) => {
    return (
      activity.steps > 0 &&
      activity.caloriesBurned > 0 &&
      activity.workoutMinutes > 0 &&
      typeof activity.goalAchieved === "boolean"
    );
  });

  // Compute stats using .map() and .reduce()
  const totalValidActivities = validActivities.length;
  const goalAchievedCount = validActivities
    .map((a) => a.goalAchieved ? 1 : 0)
    .reduce((sum, val) => sum + val, 0);
  const goalNotAchievedCount = totalValidActivities - goalAchievedCount;

  useEffect(() => {
    // Expose computed values
    window.appState = {
      totalActivities: totalValidActivities,
      "goal-achieved": goalAchievedCount,
      "goal-not-achieved": goalNotAchievedCount,
    };
  }, [validActivities]);

  if (loading) {
    return (
      <div className="app-container" data-testid="activities-page">
        <h1>Valid Activities</h1>
        <p>Loading activities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container" data-testid="activities-page">
        <h1>Valid Activities</h1>
        <p style={{ color: "red" }}>Error: {error}</p>
      </div>
    );
  }

  if (!activities.length) {
    return (
      <div className="app-container" data-testid="activities-page">
        <h1>Valid Activities</h1>
        <p>No activities fetched from API</p>
      </div>
    );
  }

  if (!validActivities.length) {
    return (
      <div className="app-container" data-testid="activities-page">
        <h1>Valid Activities</h1>
        <p data-testid="no-activities">No valid activities found (raw count: {activities.length})</p>
      </div>
    );
  }

  return (
    <div className="app-container" data-testid="activities-page">
      <h1>Valid Activities</h1>
      <p data-testid="total-activities">Total Valid: {totalValidActivities}</p>

      <div className="activities-grid">
        {validActivities.map((activity) => (
          <div
            key={activity.activityId}
            className="activity-card-wrapper"
            data-testid="activity-item"
          >
            <ActivityCard activity={activity} />
            <Link
              to={`/activities/${activity.activityId}`}
              className="view-details-link"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesPage;
