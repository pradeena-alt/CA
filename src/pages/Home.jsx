import React from "react";
import ActivityList from "../components/ActivityList";
import ActivityForm from "./ActivityForm";

const Home = () => (
  <div className="app-container" data-testid="home-page">
    <h1 className="main-title" data-testid="app-title">
      🏃 Fitness Tracker Activities
    </h1>
    <ActivityForm />
    <ActivityList />
  </div>
);

export default Home;
