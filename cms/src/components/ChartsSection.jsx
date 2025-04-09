import React from 'react';
import { Chart } from 'primereact/chart';

const ChartsSection = ({
  studentsPerCollegeData,
  sessionTypesData,
  counselingSessionsData,
  yearPerCollegesData,
  remarksDistributionData,
  chartOptions
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Counseling Sessions Over Time (Line Chart) */}
      <ChartCard 
        title="Counseling Sessions Over Time"
        type="line"
        data={counselingSessionsData}
        options={chartOptions}
      />

      {/* Students per College (Pie Chart) */}
      <ChartCard 
        title="Students per College"
        type="pie"
        data={studentsPerCollegeData}
        options={chartOptions}
      />

      {/* Session Types (Bar Chart) */}
      <ChartCard 
        title="Session Types"
        type="bar"
        data={sessionTypesData}
        options={chartOptions}
      />

      {/* Year per Colleges (Bar Chart) */}
      <ChartCard 
        title="Year Distribution"
        type="bar"
        data={yearPerCollegesData}
        options={chartOptions}
      />

      {/* Remarks Distribution (Pie Chart) */}
      <ChartCard 
        title="Remarks Distribution"
        type="pie"
        data={remarksDistributionData}
        options={chartOptions}
        className="md:col-span-2 lg:col-span-2"
      />
    </div>
  );
};

// Helper component for individual charts
const ChartCard = ({ title, type, data, options, className = '' }) => {
  return (
    <div className={`bg-white border p-4 rounded-lg shadow-md mx-2 ${className}`}>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {data.labels?.length > 0 ? (
        <Chart type={type} data={data} options={options} style={{ width: '100%', height: '200px' }} />
      ) : (
        <div className="flex justify-center items-center h-[200px] text-gray-500">No data available</div>
      )}
    </div>
  );
};

export default ChartsSection;