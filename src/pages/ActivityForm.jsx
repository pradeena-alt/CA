import React, { useState, useContext } from "react";
import { ActivityContext } from "../contexts/ActivityContext";
import { v4 as uuidv4 } from "uuid";

const ActivityForm = () => {
  const { addActivity } = useContext(ActivityContext);
  const [activity, setActivity] = useState({
    name: "",
    steps: "",
    caloriesBurned: "",
    workoutMinutes: "",
    goalAchieved: false,
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setActivity((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameRegex = /^[A-Za-z\s]{2,}$/;

    if (!nameRegex.test(activity.name)) {
      alert("Please enter a valid activity name (at least 2 letters)");
      return;
    }

    const newActivity = {
      activityId: uuidv4(),
      ...activity,
      steps: Math.max(0, Number(activity.steps) || 0),
      caloriesBurned: Math.max(0, Number(activity.caloriesBurned) || 0),
      workoutMinutes: Math.max(0, Number(activity.workoutMinutes) || 0),
    };

    addActivity(newActivity);
    setActivity({
      name: "",
      steps: "",
      caloriesBurned: "",
      workoutMinutes: "",
      goalAchieved: false,
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="activity-form"
      data-testid="activity-form"
    >
      <input
        type="text"
        placeholder="Activity Name"
        name="name"
        value={activity.name}
        onChange={handleChange}
        data-testid="input-name"
      />
      <input
        type="number"
        placeholder="Steps"
        name="steps"
        value={activity.steps}
        onChange={handleChange}
        data-testid="input-steps"
      />
      <input
        type="number"
        placeholder="Calories Burned"
        name="caloriesBurned"
        value={activity.caloriesBurned}
        onChange={handleChange}
        data-testid="input-calories"
      />
      <input
        type="number"
        placeholder="Workout Minutes"
        name="workoutMinutes"
        value={activity.workoutMinutes}
        onChange={handleChange}
        data-testid="input-workout"
      />
      <input
        type="date"
        name="date"
        value={activity.date}
        onChange={handleChange}
        data-testid="input-date"
      />
      <label>
        <input
          type="checkbox"
          name="goalAchieved"
          checked={activity.goalAchieved}
          onChange={handleChange}
          data-testid="input-goal"
        />
        Goal Achieved
      </label>
      <button type="submit" data-testid="add-activity-btn">
        Add Activity
      </button>
    </form>
  );
};

export default ActivityForm;
