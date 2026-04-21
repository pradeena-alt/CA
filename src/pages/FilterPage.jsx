import { useState, useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

function FilterPage() {
  const [input, setInput] = useState("");
  const { activities } = useContext(ActivityContext);

  const filtered = activities.filter((a) => a.steps > Number(input));

  return (
    <div>
      <input
        data-testid="filter-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {filtered.map((a) => (
        <div key={a.activityId}>{a.name}</div>
      ))}
    </div>
  );
}

export default FilterPage;