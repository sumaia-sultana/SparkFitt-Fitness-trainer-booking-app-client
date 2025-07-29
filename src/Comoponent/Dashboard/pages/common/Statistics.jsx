import React from 'react';

const Statistics = () => {
    return (
         <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white shadow p-4 rounded">Total Members: 140</div>
        <div className="bg-white shadow p-4 rounded">Total Classes: 22</div>
        <div className="bg-white shadow p-4 rounded">Total Bookings: 324</div>
      </div>
    </div>
    );
};

export default Statistics;