import React from 'react';

const SummaryStatisticsSection = ({ stats }) => {
  return (
    <div className="bg-white shadow rounded-md p-5 mb-8">
      <h2 className="text-xl font-semibold mb-4">Summary Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Total Sessions</p>
          <p className="text-2xl font-bold text-gray-800">{stats.totalSessions}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Completed Sessions</p>
          <p className="text-2xl font-bold text-gray-800">{stats.totalCompletedSessions}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Avg. Sessions/Day</p>
          <p className="text-2xl font-bold text-gray-800">{stats.averageSessionsPerDay}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Most Active College</p>
          <p className="text-2xl font-bold text-gray-800">{stats.mostActiveCollege}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Least Active College</p>
          <p className="text-2xl font-bold text-gray-800">{stats.leastActiveCollege}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Most Common Remark</p>
          <p className="text-2xl font-bold text-gray-800">{stats.mostCommonRemark}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryStatisticsSection;