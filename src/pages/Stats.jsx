import { useContext, useEffect } from "react";
import { ActivityContext } from "../context/ActivityContext";

function Stats() {
  const { activities } = useContext(ActivityContext);

  const stats = activities.reduce(
    (acc, a) => {
      if (
        a.steps > 0 &&
        a.caloriesBurned > 0 &&
        a.workoutMinutes > 0
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
    <div>
      <div data-testid="total-activities">{stats.total}</div>
      <div data-testid="goal-achieved">{stats.achieved}</div>
      <div data-testid="goal-not-achieved">{stats.notAchieved}</div>
    </div>
  );
}

export default Stats;