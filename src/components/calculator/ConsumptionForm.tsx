import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShoppingBag, Smartphone, Calculator } from 'lucide-react';

interface ConsumptionData {
  clothingShopping: number;
  electronicsPerYear: number;
  recreationSpending: number;
}

interface ConsumptionFormProps {
  data: ConsumptionData;
  onChange: (data: Partial<ConsumptionData>) => void;
  onCalculate: () => void;
}

export function ConsumptionForm({ data, onChange, onCalculate }: ConsumptionFormProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold flex items-center justify-center gap-2">
          <ShoppingBag className="h-6 w-6 text-purple-600" />
          Lifestyle & Consumption
        </h2>
        <p className="text-muted-foreground">Your purchasing habits and lifestyle choices</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-pink-200 bg-pink-50/30">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-pink-600" />
              Clothing & Fashion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clothing">Monthly Spending ($)</Label>
              <Input
                id="clothing"
                type="number"
                value={data.clothingShopping}
                onChange={(e) => onChange({ clothingShopping: Number(e.target.value) })}
                placeholder="e.g., 100"
              />
              <p className="text-sm text-muted-foreground">
                Average spending on new clothes per month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/30">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-blue-600" />
              Electronics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="electronics">New Devices Per Year</Label>
              <Input
                id="electronics"
                type="number"
                value={data.electronicsPerYear}
                onChange={(e) => onChange({ electronicsPerYear: Number(e.target.value) })}
                placeholder="e.g., 1"
              />
              <p className="text-sm text-muted-foreground">
                Phones, laptops, tablets, etc.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-purple-200 bg-purple-50/30">
        <CardHeader>
          <CardTitle className="text-lg">Entertainment & Recreation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="recreation">Monthly Spending ($)</Label>
            <Input
              id="recreation"
              type="number"
              value={data.recreationSpending}
              onChange={(e) => onChange({ recreationSpending: Number(e.target.value) })}
              placeholder="e.g., 500"
            />
            <p className="text-sm text-muted-foreground">
              Dining out, entertainment, hobbies, sports
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
        <h3 className="font-medium text-green-800 mb-2">🌱 Sustainability Tips</h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Choose quality over quantity when purchasing new items</li>
          <li>• Consider second-hand options for electronics and clothing</li>
          <li>• Repair items when possible instead of replacing them</li>
          <li>• Share or rent items you use infrequently</li>
        </ul>
      </div>

      <div className="text-center">
        <Button 
          onClick={onCalculate} 
          size="lg"
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
        >
          <Calculator className="mr-2 h-5 w-5" />
          Calculate My Carbon Footprint
        </Button>
      </div>
    </div>
  );
}