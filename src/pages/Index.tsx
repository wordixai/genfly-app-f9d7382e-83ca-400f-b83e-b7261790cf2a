import { CarbonCalculator } from '@/components/CarbonCalculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 via-white to-green-50">
      <div className="container mx-auto py-8">
        <CarbonCalculator />
      </div>
    </div>
  );
};

export default Index;