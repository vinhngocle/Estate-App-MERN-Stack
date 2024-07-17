import React, { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { WORKOUTS } from "../../utils/swoldier.js";

interface HeaderProps {
  index: number | string;
  title: string;
  description: string;
}

function Header({ index, title, description }: HeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-centers gap-2">
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400">
          {index}
        </p>
        <h4 className="text-lg sm:text-2xl md:text-3xl">{title}</h4>
      </div>
      <p>{description}</p>
    </div>
  );
}

function Generator() {
  const [showModal, setShowModal] = useState(false);
  const [poison, setPoison] = useState("individual");
  const [muscles, setMuscles] = useState([]);
  const [goals, setGoals] = useState("strength_power");

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const updateMuscles = (muscleGroup: [] | string) => {
    if (muscles.length > 2) return;

    if (poison !== "individual") {
      setMuscles([muscleGroup]);
      return;
    }

    if (muscles.includes(muscleGroup)) {
      setMuscles(muscles.filter((val) => val !== muscleGroup));
      return;
    }

    setMuscles([...muscles, muscleGroup]);
  };

  return (
    <div className="min-h-screen">
      <SectionWrapper
        header={"generate your workout"}
        title={["It's", "Huge", "o'clock"]}
      >
        <Header
          index={"01"}
          title={"Pick you poison"}
          description={"Select the workout you wish to endure"}
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 sm:mx-auto gap-2 sm:gap-4">
          {Object.keys(WORKOUTS).map((type, index) => {
            return (
              <button
                onClick={() => {
                  setPoison(type);
                }}
                className="capitalize duration-200 p-3 px-2 grid bg-slate-950 font-light text-sm sm:text-base rounded-md place-items-center border-solid border-[1.5px] border-solid  border-transparent hover:border-blue-500"
                key={index}
              >
                <p className="capitalize">{type.replaceAll("_", " ")}</p>
              </button>
            );
          })}
        </div>

        <Header
          index={"02"}
          title={"Lock on targets"}
          description={"Select the muscles judged for annihilation"}
        />
        <div className="bg-slate-950 p-3 border border-solid border-blue-400 rounded-lg flex flex-col">
          <div className="relative flex items-center justify-center">
            <button
              onClick={toggleModal}
              className="relative p-2 flex items-centers justify-center"
            >
              <p>Select muscle groups</p>
              <i className="fa-solid fa-caret-down absolute right-3 top-1/2 -translate-y-1/2"></i>
            </button>
          </div>
          {showModal && (
            <div className="flex flex-col px-3 pb-3">
              {(poison === "individual"
                ? WORKOUTS[poison]
                : Object.keys(WORKOUTS[poison])
              ).map((muscleGroup: string, index: number) => {
                return (
                  <button key={index}>
                    <p className="uppercase">{muscleGroup}</p>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </SectionWrapper>
    </div>
  );
}

export default Generator;
