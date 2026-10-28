"use client";

import React from "react";
import DogAgeCalculator from "./DogAgeCalculator";
import DogNameGenerator from "./DogNameGenerator";
import DogCrateSizeCalculator from "./DogCrateSizeCalculator";
import CatAgeCalculator from "./CatAgeCalculator";
import CatNameGenerator from "./CatNameGenerator";
import CatYearsToHumanCalculator from "./CatYearsToHumanCalculator";
import PetNameGenerator from "./PetNameGenerator";
import DogChocolateToxicityCalculator from "./DogChocolateToxicityCalculator";
import PuppyVaccinationSchedule from "./PuppyVaccinationSchedule";
import DogPregnancyCalculator from "./DogPregnancyCalculator";
import CatPregnancyCalculator from "./CatPregnancyCalculator";
import CatFoodCalculatorWetAndDry from "./CatFoodCalculatorWetAndDry";
import MixingWetAndDryCatFoodCalculator from "./MixingWetAndDryCatFoodCalculator";
import HomemadeDogFoodCalculator from "./HomemadeDogFoodCalculator";
import PuppyWeightCalculator from "./PuppyWeightCalculator";
import FishTankCalculator from "./FishTankCalculator";
import AquariumVolumeCalculator from "./AquariumVolumeCalculator";
import BassWeightCalculator from "./BassWeightCalculator";
import HorseWeightCalculator from "./HorseWeightCalculator";

interface Props {
  slug: string;
}

export default function CalculatorRenderer({ slug }: Props) {
  switch (slug) {
    case "dog-age-calculator":
      return <DogAgeCalculator />;
    case "dog-name-generator":
      return <DogNameGenerator />;
    case "dog-crate-size-calculator":
      return <DogCrateSizeCalculator />;
    case "cat-age-calculator":
      return <CatAgeCalculator />;
    case "cat-name-generator":
      return <CatNameGenerator />;
    case "cat-years-to-human-calculator":
      return <CatYearsToHumanCalculator />;
    case "pet-name-generator":
      return <PetNameGenerator />;
    case "dog-chocolate-toxicity-calculator":
      return <DogChocolateToxicityCalculator />;
    case "puppy-vaccination-schedule":
      return <PuppyVaccinationSchedule />;
    case "dog-pregnancy-calculator":
      return <DogPregnancyCalculator />;
    case "cat-pregnancy-calculator":
      return <CatPregnancyCalculator />;
    case "cat-food-calculator-wet-and-dry":
      return <CatFoodCalculatorWetAndDry />;
    case "mixing-wet-and-dry-cat-food-calculator":
      return <MixingWetAndDryCatFoodCalculator />;
    case "homemade-dog-food-calculator":
      return <HomemadeDogFoodCalculator />;
    case "puppy-weight-calculator":
      return <PuppyWeightCalculator />;
    case "fish-tank-calculator":
      return <FishTankCalculator />;
    case "aquarium-volume-calculator":
      return <AquariumVolumeCalculator />;
    case "bass-weight-calculator":
      return <BassWeightCalculator />;
    case "horse-weight-calculator":
      return <HorseWeightCalculator />;
    default:
      return <div>Calculator not found</div>;
  }
}
