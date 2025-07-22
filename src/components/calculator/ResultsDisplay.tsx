import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CarbonFootprintResult, generateReductionStrategies } from '@/lib/carbonCalculations';
import { RotateCcw, TrendingDown, Target, Lightbulb } from 'lucide-react';

interface ResultsDisplayProps {
  results: CarbonFootprintResult;
  onRecalculate: () => void;
}

export function ResultsDisplay({ results, onRecalculate }: ResultsDisplayProps) {
  const strategies = generateReductionStrategies(results);
  const globalAverage = 4800; // kg CO2e per year global average
  
  const pieData = results.breakdown.map((item, index) => ({
    ...item,
    fill: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][index],
  }));

  const comparisonData = [
    { category: 'Your Footprint', emissions: Math.round(results.total) },
    { category: 'Global Average', emissions: globalAverage },
    { category: 'Paris Agreement Target', emissions: 2300 },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFootprintRating = (total: number) => {
    if (total < 3000) return { rating: 'Excellent', color: 'text-green-600', description: 'Well below global average' };
    if (total < 5000) return { rating: 'Good', color: 'text-yellow-600', description: 'Close to sustainable levels' };
    if (total < 8000) return { rating: 'Above Average', color: 'text-orange-600', description: 'Higher than global average' };
    return { rating: 'High Impact', color: 'text-red-600', description: 'Significantly above sustainable levels' };
  };

  const rating = getFootprintRating(results.total);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Target className="h-8 w-8 text-green-600" />
          Your Carbon Footprint Results
        </h2>
      </div>

      {/* Overall Results Card */}
      <Card className="border-0 bg-gradient-to-br from-white to-green-50/50 eco-shadow">
        <CardContent className="p-8 text-center space-y-6">
          <div className="space-y-2">
            <div className="text-5xl font-bold text-green-600">
              {Math.round(results.total).toLocaleString()}
            </div>
            <div className="text-lg text-muted-foreground">kg CO₂e per year</div>
          </div>
          
          <div className="flex items-center justify-center gap-2">
            <Badge className={`${rating.color} bg-transparent border-current px-4 py-2 text-lg`}>
              {rating.rating}
            </Badge>
          </div>
          
          <p className="text-muted-foreground max-w-md mx-auto">
            {rating.description}. The global average is {globalAverage.toLocaleString()} kg CO₂e per year.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {results.breakdown.map((item, index) => (
              <div key={item.category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{item.category}</span>
                  <span className="text-sm font-medium">{Math.round(item.emissions).toLocaleString()} kg</span>
                </div>
                <Progress value={item.percentage} className="h-2" />
                <span className="text-xs text-muted-foreground">{Math.round(item.percentage)}% of total</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <Tabs defaultValue="breakdown" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="strategies">Reduction Strategies</TabsTrigger>
        </TabsList>

        <TabsContent value="breakdown" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Emissions Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${Math.round(percentage)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="emissions"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`${Math.round(value)} kg CO₂e`, 'Emissions']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How You Compare</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [`${value} kg CO₂e`, 'Annual Emissions']} />
                    <Bar dataKey="emissions" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Understanding the Targets</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• <strong>Paris Agreement Target:</strong> 2.3 tons CO₂e per person by 2030</li>
                  <li>• <strong>Global Average:</strong> Current worldwide average emissions</li>
                  <li>• <strong>Your Footprint:</strong> Based on your lifestyle choices</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategies" className="space-y-6">
          <div className="grid gap-4">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-6 w-6 text-yellow-500" />
              <h3 className="text-xl font-semibold">Personalized Reduction Strategies</h3>
            </div>
            
            {strategies.slice(0, 8).map((strategy, index) => (
              <Card key={index} className="transition-all hover:shadow-md border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-lg">{strategy.action}</h4>
                        <Badge className={getDifficultyColor(strategy.difficulty)}>
                          {strategy.difficulty}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{strategy.impact}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingDown className="h-4 w-4 text-green-600" />
                        <span className="text-green-600 font-medium">
                          Could save {Math.round(strategy.savings).toLocaleString()} kg CO₂e annually
                        </span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {strategy.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-6">
              <h4 className="font-medium text-green-800 mb-3">🌍 Making a Real Impact</h4>
              <div className="text-sm text-green-700 space-y-2">
                <p>
                  If you implement the top 3 recommendations, you could reduce your footprint by{' '}
                  <strong>{Math.round(strategies.slice(0, 3).reduce((sum, s) => sum + s.savings, 0)).toLocaleString()} kg CO₂e per year</strong>
                  {' '}({Math.round((strategies.slice(0, 3).reduce((sum, s) => sum + s.savings, 0) / results.total) * 100)}% reduction).
                </p>
                <p className="mt-2">
                  Every small action counts, and collective action can drive meaningful change for our planet.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="text-center">
        <Button 
          onClick={onRecalculate} 
          variant="outline"
          size="lg"
          className="px-8"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          Recalculate
        </Button>
      </div>
    </div>
  );
}