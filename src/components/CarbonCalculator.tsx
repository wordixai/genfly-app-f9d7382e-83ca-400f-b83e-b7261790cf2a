import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TransportForm } from './calculator/TransportForm';
import { EnergyForm } from './calculator/EnergyForm';
import { DietForm } from './calculator/DietForm';
import { ConsumptionForm } from './calculator/ConsumptionForm';
import { ResultsDisplay } from './calculator/ResultsDisplay';
import { CarbonFootprintData, calculateCarbonFootprint } from '@/lib/carbonCalculations';
import { Car, Home, Utensils, ShoppingBag } from 'lucide-react';

export function CarbonCalculator() {
  const [currentTab, setCurrentTab] = useState('transport');
  const [data, setData] = useState<CarbonFootprintData>({
    transport: {
      carType: 'gasoline',
      milesPerWeek: 100,
      publicTransportMiles: 0,
      flightsPerYear: 0,
      avgFlightHours: 0,
    },
    energy: {
      electricityKwh: 900,
      heatingType: 'gas',
      heatingUsage: 150,
      homeSize: 1500,
    },
    diet: {
      type: 'average',
    },
    consumption: {
      clothingShopping: 100,
      electronicsPerYear: 0,
      recreationSpending: 500,
    },
  });

  const [showResults, setShowResults] = useState(false);

  const updateData = (section: keyof CarbonFootprintData, newData: any) => {
    setData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...newData }
    }));
  };

  const calculateResults = () => {
    setShowResults(true);
    setCurrentTab('results');
  };

  const results = showResults ? calculateCarbonFootprint(data) : null;

  const tabConfig = [
    { value: 'transport', label: 'Transport', icon: Car, color: 'text-blue-600' },
    { value: 'energy', label: 'Energy', icon: Home, color: 'text-green-600' },
    { value: 'diet', label: 'Diet', icon: Utensils, color: 'text-orange-600' },
    { value: 'consumption', label: 'Lifestyle', icon: ShoppingBag, color: 'text-purple-600' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-earth-700 to-green-600 bg-clip-text text-transparent">
          Carbon Footprint Calculator
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Calculate your environmental impact and discover personalized strategies to reduce your carbon footprint.
        </p>
      </div>

      <Card className="eco-shadow border-0 bg-gradient-to-br from-white to-earth-50/50">
        <CardContent className="p-8">
          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid w-full grid-cols-4 bg-earth-100/50 h-auto p-2">
              {tabConfig.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex flex-col items-center gap-2 py-4 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <tab.icon className={`h-5 w-5 ${tab.color}`} />
                  <span className="text-sm font-medium">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mt-8">
              <TabsContent value="transport" className="animate-fade-in">
                <TransportForm 
                  data={data.transport}
                  onChange={(newData) => updateData('transport', newData)}
                  onNext={() => setCurrentTab('energy')}
                />
              </TabsContent>

              <TabsContent value="energy" className="animate-fade-in">
                <EnergyForm 
                  data={data.energy}
                  onChange={(newData) => updateData('energy', newData)}
                  onNext={() => setCurrentTab('diet')}
                />
              </TabsContent>

              <TabsContent value="diet" className="animate-fade-in">
                <DietForm 
                  data={data.diet}
                  onChange={(newData) => updateData('diet', newData)}
                  onNext={() => setCurrentTab('consumption')}
                />
              </TabsContent>

              <TabsContent value="consumption" className="animate-fade-in">
                <ConsumptionForm 
                  data={data.consumption}
                  onChange={(newData) => updateData('consumption', newData)}
                  onCalculate={calculateResults}
                />
              </TabsContent>

              <TabsContent value="results" className="animate-fade-in">
                {results && (
                  <ResultsDisplay 
                    results={results}
                    onRecalculate={() => setCurrentTab('transport')}
                  />
                )}
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}