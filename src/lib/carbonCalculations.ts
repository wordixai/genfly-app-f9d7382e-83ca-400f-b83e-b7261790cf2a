export interface EmissionFactors {
  // Transport (kg CO2e per unit)
  car: {
    gasoline: 0.411; // per mile
    diesel: 0.457;
    hybrid: 0.206;
    electric: 0.089;
  };
  publicTransport: {
    bus: 0.089; // per mile
    train: 0.045;
    subway: 0.056;
  };
  aviation: {
    domestic: 0.255; // per mile
    international: 0.298;
  };

  // Energy (kg CO2e per kWh/therm)
  electricity: 0.424; // per kWh (US average)
  naturalGas: 5.3; // per therm
  heating: {
    gas: 5.3;
    oil: 10.15;
    electric: 0.424;
  };

  // Diet (kg CO2e per serving/year)
  diet: {
    meatHeavy: 3287; // per year
    average: 2224;
    vegetarian: 1608;
    vegan: 1449;
  };

  // Consumption (kg CO2e per item/year)
  consumption: {
    clothing: 442; // average per year
    electronics: 300;
    furniture: 200;
    recreation: 184;
  };
}

export const EMISSION_FACTORS: EmissionFactors = {
  car: {
    gasoline: 0.411,
    diesel: 0.457,
    hybrid: 0.206,
    electric: 0.089,
  },
  publicTransport: {
    bus: 0.089,
    train: 0.045,
    subway: 0.056,
  },
  aviation: {
    domestic: 0.255,
    international: 0.298,
  },
  electricity: 0.424,
  naturalGas: 5.3,
  heating: {
    gas: 5.3,
    oil: 10.15,
    electric: 0.424,
  },
  diet: {
    meatHeavy: 3287,
    average: 2224,
    vegetarian: 1608,
    vegan: 1449,
  },
  consumption: {
    clothing: 442,
    electronics: 300,
    furniture: 200,
    recreation: 184,
  },
};

export interface CarbonFootprintData {
  transport: {
    carType: string;
    milesPerWeek: number;
    publicTransportMiles: number;
    flightsPerYear: number;
    avgFlightHours: number;
  };
  energy: {
    electricityKwh: number;
    heatingType: string;
    heatingUsage: number;
    homeSize: number;
  };
  diet: {
    type: string;
  };
  consumption: {
    clothingShopping: number;
    electronicsPerYear: number;
    recreationSpending: number;
  };
}

export interface CarbonFootprintResult {
  transport: number;
  energy: number;
  diet: number;
  consumption: number;
  total: number;
  breakdown: {
    category: string;
    emissions: number;
    percentage: number;
  }[];
}

export function calculateCarbonFootprint(data: CarbonFootprintData): CarbonFootprintResult {
  // Transport calculations
  const carEmissions = data.transport.milesPerWeek * 52 * 
    EMISSION_FACTORS.car[data.transport.carType as keyof typeof EMISSION_FACTORS.car] || 0;
  
  const publicTransportEmissions = data.transport.publicTransportMiles * 52 * 
    EMISSION_FACTORS.publicTransport.bus;
  
  const flightEmissions = data.transport.flightsPerYear * 
    data.transport.avgFlightHours * 500 * // 500 miles per flight hour average
    EMISSION_FACTORS.aviation.domestic;
  
  const totalTransport = carEmissions + publicTransportEmissions + flightEmissions;

  // Energy calculations
  const electricityEmissions = data.energy.electricityKwh * 12 * 
    EMISSION_FACTORS.electricity;
  
  const heatingEmissions = data.energy.heatingUsage * 
    EMISSION_FACTORS.heating[data.energy.heatingType as keyof typeof EMISSION_FACTORS.heating] || 0;
  
  const totalEnergy = electricityEmissions + heatingEmissions;

  // Diet calculations
  const dietEmissions = EMISSION_FACTORS.diet[data.diet.type as keyof typeof EMISSION_FACTORS.diet] || 
    EMISSION_FACTORS.diet.average;

  // Consumption calculations
  const clothingEmissions = (data.consumption.clothingShopping / 100) * 
    EMISSION_FACTORS.consumption.clothing;
  
  const electronicsEmissions = data.consumption.electronicsPerYear * 
    EMISSION_FACTORS.consumption.electronics;
  
  const recreationEmissions = (data.consumption.recreationSpending / 1000) * 
    EMISSION_FACTORS.consumption.recreation;
  
  const totalConsumption = clothingEmissions + electronicsEmissions + recreationEmissions;

  // Total emissions
  const total = totalTransport + totalEnergy + dietEmissions + totalConsumption;

  // Breakdown
  const breakdown = [
    { category: 'Transport', emissions: totalTransport, percentage: (totalTransport / total) * 100 },
    { category: 'Energy', emissions: totalEnergy, percentage: (totalEnergy / total) * 100 },
    { category: 'Diet', emissions: dietEmissions, percentage: (dietEmissions / total) * 100 },
    { category: 'Consumption', emissions: totalConsumption, percentage: (totalConsumption / total) * 100 },
  ];

  return {
    transport: totalTransport,
    energy: totalEnergy,
    diet: dietEmissions,
    consumption: totalConsumption,
    total,
    breakdown,
  };
}

export interface ReductionStrategy {
  category: string;
  action: string;
  impact: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  savings: number; // kg CO2e per year
}

export function generateReductionStrategies(result: CarbonFootprintResult): ReductionStrategy[] {
  const strategies: ReductionStrategy[] = [];

  // Transport strategies
  if (result.transport > 2000) {
    strategies.push({
      category: 'Transport',
      action: 'Switch to electric or hybrid vehicle',
      impact: 'Reduce transport emissions by 50-75%',
      difficulty: 'Hard',
      savings: result.transport * 0.6,
    });
  }
  
  strategies.push({
    category: 'Transport',
    action: 'Use public transport 2 days per week',
    impact: 'Reduce car emissions by 30%',
    difficulty: 'Medium',
    savings: result.transport * 0.3,
  });

  strategies.push({
    category: 'Transport',
    action: 'Work from home 1-2 days per week',
    impact: 'Reduce commute emissions by 20-40%',
    difficulty: 'Easy',
    savings: result.transport * 0.25,
  });

  // Energy strategies
  if (result.energy > 3000) {
    strategies.push({
      category: 'Energy',
      action: 'Install solar panels',
      impact: 'Reduce electricity emissions by 80%',
      difficulty: 'Hard',
      savings: result.energy * 0.8,
    });
  }

  strategies.push({
    category: 'Energy',
    action: 'Switch to LED bulbs and efficient appliances',
    impact: 'Reduce electricity use by 20%',
    difficulty: 'Easy',
    savings: result.energy * 0.2,
  });

  strategies.push({
    category: 'Energy',
    action: 'Improve home insulation',
    impact: 'Reduce heating emissions by 30%',
    difficulty: 'Medium',
    savings: result.energy * 0.3,
  });

  // Diet strategies
  if (result.diet > 2500) {
    strategies.push({
      category: 'Diet',
      action: 'Reduce meat consumption by half',
      impact: 'Lower diet emissions by 30-40%',
      difficulty: 'Medium',
      savings: result.diet * 0.35,
    });
  }

  strategies.push({
    category: 'Diet',
    action: 'Choose local and seasonal produce',
    impact: 'Reduce food transport emissions by 15%',
    difficulty: 'Easy',
    savings: result.diet * 0.15,
  });

  // Consumption strategies
  strategies.push({
    category: 'Consumption',
    action: 'Buy second-hand clothes and electronics',
    impact: 'Reduce consumption emissions by 50%',
    difficulty: 'Easy',
    savings: result.consumption * 0.5,
  });

  strategies.push({
    category: 'Consumption',
    action: 'Repair instead of replacing items',
    impact: 'Extend product lifespan and reduce waste',
    difficulty: 'Easy',
    savings: result.consumption * 0.3,
  });

  return strategies.sort((a, b) => b.savings - a.savings);
}