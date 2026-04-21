import React, { useEffect } from "react";
import { useActivity } from "../context/ActivityContext";

const ActivityStats = () => {
  const { activities } = useActivity();

  // Get only valid activities (Q1 rules)
  const validActivities = activities.filter((activity) => {
    return (
      activity.steps > 0 &&
      activity.caloriesBurned > 0 &&
      activity.workoutMinutes > 0 &&
      typeof activity.goalAchieved === "boolean"
    );
  });

  // Use .reduce() to compute totals (Question 5)
  const stats = validActivities.reduce(
    (acc, activity) => {
      return {
        total: acc.total + 1,
        achieved: acc.achieved + (activity.goalAchieved ? 1 : 0),
        notAchieved: acc.notAchieved + (activity.goalAchieved ? 0 : 1),
        totalSteps: acc.totalSteps + activity.steps,
        totalCalories: acc.totalCalories + activity.caloriesBurned,
        totalMinutes: acc.totalMinutes + activity.workoutMinutes,
      };
    },
    {
      total: 0,
      achieved: 0,
      notAchieved: 0,
      totalSteps: 0,
      totalCalories: 0,
      totalMinutes: 0,
    }
  );

  useEffect(() => {
    // Expose computed values globally (Question 5)
    window.appState = {
      totalActivities: stats.total,
      "goal-achieved": stats.achieved,
      "goal-not-achieved": stats.notAchieved,
      totalSteps: stats.totalSteps,
      totalCalories: stats.totalCalories,
      totalMinutes: stats.totalMinutes,
    };
  }, [stats]);

  if (!validActivities.length)
    return <h3 data-testid="no-stats">No valid activities available</h3>;

  return (
    <div className="activity-stats fade-in" data-testid="stats-page">
      <h2>Activity Stats</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <p data-testid="total-activities">Total Activities: {stats.total}</p>
        </div>
        <div className="stat-card">
          <p data-testid="goal-achieved">Goals Achieved: {stats.achieved}</p>
        </div>
        <div className="stat-card">
          <p data-testid="goal-not-achieved">Goals Not Achieved: {stats.notAchieved}</p>
        </div>
      </div>

      <div className="stats-summary">
        <h3>Overall Metrics</h3>
        <p data-testid="total-steps">Total Steps: {stats.totalSteps.toLocaleString()}</p>
        <p data-testid="total-calories">Total Calories Burned: {stats.totalCalories} kcal</p>
        <p data-testid="total-workout-minutes">Total Workout: {stats.totalMinutes} minutes</p>
      </div>
    </div>
  );
};

export default ActivityStats;
