import React from "react";
import Hero from "../components/GymApp/Hero";
import Generator from "../components/GymApp/Generator";
import Workout from "../components/GymApp/Workout";

function NasaAppPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base">
      <Hero />
      <Generator />
      <Workout />
    </main>
  );
}

export default NasaAppPage;
