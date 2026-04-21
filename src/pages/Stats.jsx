import { useEffect } from "react";
import { useActivity } from "../context/ActivityContext";

function Stats() {
  const { activities } = useActivity();

  const stats = activities.reduce(
    (acc, a) => {
      if (
        a.steps > 0 &&
        a.caloriesBurned > 0 &&
        a.workoutMinutes > 0 &&
        typeof a.goalAchieved === "boolean"
      ) {
        acc.total++;

        if (a.goalAchieved) acc.achieved++;
        else acc.notAchieved++;
      }

      return acc;
    },
    { total: 0, achieved: 0, notAchieved: 0 }
  );

  useEffect(() => {
    window.appState = {
      totalActivities: stats.total,
      goalAchievedCount: stats.achieved,
      goalNotAchievedCount: stats.notAchieved,
    };
  }, [stats]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Activity Stats</h1>
      <div style={{ fontSize: "18px", marginTop: "20px" }}>
        <p data-testid="total-activities">Total Activities: <strong>{stats.total}</strong></p>
        <p data-testid="goal-achieved">Goals Achieved: <strong>{stats.achieved}</strong></p>
        <p data-testid="goal-not-achieved">Goals Not Achieved: <strong>{stats.notAchieved}</strong></p>
      </div>
    </div>
  );
}

export default Stats;