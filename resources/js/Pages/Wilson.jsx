import React, { useState } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { Cancel } from '@mui/icons-material';
import Dashboard from './Dashboard';

// src/EoqForm.js

function Wilson() {
  const [annualDemand, setAnnualDemand] = useState('');
  const [orderCost, setOrderCost] = useState('');
  const [holdingCost, setHoldingCost] = useState('');
  const [eoq, setEoq] = useState(null);

  const calculateEOQ = (annualDemand, orderCost, holdingCost) => {
    return Math.sqrt((2 * annualDemand * orderCost) / holdingCost);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eoqResult = calculateEOQ(annualDemand, orderCost, holdingCost);
    setEoq(eoqResult);
  };

  return (
    <Dashboard>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">EOQ Calculator</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="annualDemand" className="block text-sm font-medium text-gray-700">
              Annual Demand (D)
            </label>
            <input
              type="number"
              id="annualDemand"
              value={annualDemand}
              onChange={(e) => setAnnualDemand(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="orderCost" className="block text-sm font-medium text-gray-700">
              Order Cost (S)
            </label>
            <input
              type="number"
              id="orderCost"
              value={orderCost}
              onChange={(e) => setOrderCost(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="holdingCost" className="block text-sm font-medium text-gray-700">
              Holding Cost (H)
            </label>
            <input
              type="number"
              id="holdingCost"
              value={holdingCost}
              onChange={(e) => setHoldingCost(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Calculate EOQ
            </button>
          </div>
        </form>
        {eoq !== null && (
          <div className="mt-6 p-4 bg-green-100 rounded-lg">
            <h3 className="text-lg font-medium text-green-900">Optimal Order Quantity (EOQ): {eoq.toFixed(2)}</h3>
          </div>
        )}
      </div>
    </div>
    </Dashboard>
  );
}


export default Wilson;
