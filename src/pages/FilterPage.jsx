import { useState, useEffect } from "react";
import { useActivity } from "../context/ActivityContext";
import ActivityCard from "../components/ActivityCard";

function FilterPage() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const { activities, loading } = useActivity();

  useEffect(() => {
    console.log("FilterPage - activities:", activities);
    console.log("FilterPage - loading:", loading);
  }, [activities, loading]);

  // Get valid activities first
  const validActivities = activities.filter((a) => {
    return (
      a.steps > 0 &&
      a.caloriesBurned > 0 &&
      a.workoutMinutes > 0 &&
      typeof a.goalAchieved === "boolean"
    );
  });

  console.log("FilterPage - validActivities:", validActivities);

  // Filter by steps
  let filteredActivities = validActivities;
  if (input) {
    const inputValue = Number(input);
    if (isNaN(inputValue)) {
      setError("Please enter a valid number");
      filteredActivities = [];
    } else if (inputValue < 0) {
      setError("Steps cannot be negative");
      filteredActivities = [];
    } else {
      setError("");
      filteredActivities = validActivities.filter((a) => a.steps >= inputValue);
    }
  } else {
    setError("");
  }

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>🔍 Filter Activities</h1>
        <p>Loading activities...</p>
      </div>
    );
  }

  if (!activities.length) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>🔍 Filter Activities</h1>
        <p>No activities available to filter</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>🔍 Filter Activities</h1>
      
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="steps-filter">Filter by minimum steps: </label>
        <input
          id="steps-filter"
          type="number"
          placeholder="Enter minimum steps (e.g., 5000)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          data-testid="filter-input"
          style={{ padding: "8px", marginLeft: "10px" }}
        />
      </div>

      {error && (
        <p style={{ color: "red", marginBottom: "20px" }} data-testid="filter-error">
          {error}
        </p>
      )}

      {!input && (
        <p style={{ marginBottom: "20px" }}>
          Showing all {validActivities.length} valid activities
        </p>
      )}

      {input && !error && (
        <p style={{ marginBottom: "20px" }}>
          Found {filteredActivities.length} activities with {input}+ steps
        </p>
      )}

      <div>
        {filteredActivities.length === 0 && input && !error ? (
          <p>No activities found with {input}+ steps</p>
        ) : filteredActivities.length === 0 && !input ? (
          <p>No valid activities available</p>
        ) : (
          <div style={{ display: "grid", gap: "15px" }}>
            {filteredActivities.map((activity) => (
              <ActivityCard key={activity.activityId} activity={activity} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterPage;