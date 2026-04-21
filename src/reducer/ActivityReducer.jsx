export default function ActivityReducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, activities: action.payload };

    case "TOGGLE_GOAL":
      return {
        ...state,
        activities: state.activities.map((a) => {
          if (a.activityId === action.payload) {
            if (a.steps >= 8000) {
              return { ...a, goalAchieved: true };
            }
            return { ...a, goalAchieved: !a.goalAchieved };
          }
          return a;
        }),
      };

    default:
      return state;
  }
}