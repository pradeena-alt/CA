import React from "react";
import { useActivity } from "../context/ActivityContext";
import ActivityCard from "../components/ActivityCard";

const Achievements = () => {
  const { activities } = useActivity();
  
  const achievements = activities.filter((a) => a.goalAchieved === true);

  return (
    <div className="app-container" data-testid="achievements-page">
      <h1 className="main-title" data-testid="achievements-title">
        Achievements
      </h1>

      <div className="achievements-list" data-testid="achievements-list">
        {achievements.length === 0 ? (
          <p data-testid="no-achievements">No achievements yet</p>
        ) : (
          achievements.map((activity) => (
            <ActivityCard key={activity.activityId} activity={activity} />
          ))
        )}
      </div>
    </div>
  );
};

export default Achievements;
