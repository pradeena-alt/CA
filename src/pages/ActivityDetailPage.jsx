import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useActivity } from "../context/ActivityContext";

const ActivityDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activities } = useActivity();

  // Find activity by ID
  const activity = activities.find((a) => a.activityId.toString() === id);

  if (!activity) {
    return (
      <div className="app-container" data-testid="activity-detail-page">
        <h1>Activity Not Found</h1>
        <p>The activity you're looking for doesn't exist.</p>
        <button onClick={() => navigate("/activities")}>
          Back to Activities
        </button>
      </div>
    );
  }

  // Compute efficiency dynamically: efficiency = caloriesBurned / workoutMinutes
  const efficiency =
    activity.workoutMinutes > 0
      ? (activity.caloriesBurned / activity.workoutMinutes).toFixed(2)
      : 0;

  return (
    <div className="app-container" data-testid="activity-detail-page">
      <button onClick={() => navigate("/activities")} className="back-btn">
        ← Back to Activities
      </button>

      <div className="activity-detail-card">
        <h1 data-testid="activity-detail-name">{activity.name || "Unknown"}</h1>

        <div className="detail-info">
          <p data-testid="activity-detail-date">
            <strong>Date:</strong> {activity.date || "No Date"}
          </p>

          <p data-testid="activity-detail-steps">
            <strong>Steps:</strong> {activity.steps.toLocaleString()}
          </p>

          <p data-testid="activity-detail-calories">
            <strong>Calories Burned:</strong> {activity.caloriesBurned} kcal
          </p>

          <p data-testid="activity-detail-workout">
            <strong>Workout Duration:</strong> {activity.workoutMinutes} minutes
          </p>

          <p data-testid="activity-detail-goal">
            <strong>Goal Status:</strong>{" "}
            {activity.goalAchieved ? "✅ Achieved" : "❌ Not Achieved"}
          </p>
        </div>

        <div className="efficiency-section">
          <h2>Efficiency Score</h2>
          <p data-testid="activity-efficiency">
            <strong>{efficiency} kcal/min</strong>
          </p>
          <p className="efficiency-description">
            This is the calories burned per minute of workout
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailPage;
