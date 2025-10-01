'use client';

import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const CAR_COST = 14_25_000;
const MIN_DOWN = 0;
const INTEREST_RATE = 9.5; // Annual interest %
const MIN_DURATION = 12;
const MAX_DURATION = 84;
const MIN_LOAN = 1_00_000;

function formatCurrency(value: number) {
  return `₹${value.toLocaleString('en-IN')}`;
}

function calculateEMI(principal: number, duration: number, rate: number) {
  const monthlyRate = rate / 12 / 100;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, duration)) /
    (Math.pow(1 + monthlyRate, duration) - 1)
  );
}

export default function EMICalculatorChartJS() {
  const [downPayment, setDownPayment] = useState(2_50_500);
  const [loanAmount, setLoanAmount] = useState(CAR_COST - 2_50_500);
  const [duration, setDuration] = useState(46);

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const onDownPaymentChange = (val: number) => {
    if (val > CAR_COST - MIN_LOAN) val = CAR_COST - MIN_LOAN;
    setDownPayment(val);
    setLoanAmount(CAR_COST - val);
  };

  const onLoanAmountChange = (val: number) => {
    if (val < MIN_LOAN) val = MIN_LOAN;
    if (val > CAR_COST) val = CAR_COST;
    setLoanAmount(val);
    setDownPayment(CAR_COST - val);
  };

  const emi = calculateEMI(loanAmount, duration, INTEREST_RATE);
  const totalPayable = emi * duration;
  const totalInterest = totalPayable - loanAmount;

  // Update Chart every time loanAmount or totalInterest changes
  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.data.datasets[0].data = [loanAmount, totalInterest];
      chartInstance.current.update();
    } else {
      chartInstance.current = new Chart(chartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Principal Loan Amount', 'Total Interest Payable'],
          datasets: [
            {
              data: [loanAmount, totalInterest],
              backgroundColor: ['#a7f3d0', '#14b8a6'],
              hoverOffset: 30,
              borderWidth: 0,
            },
          ],
        },
        options: {
          circumference: 180,
          rotation: 270,
          cutout: '75%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#4b5563', // Tailwind gray-600
                font: { size: 14, weight: 'bold' },
              },
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.parsed || 0;
                  return `${label}: ${formatCurrency(value)}`;
                },
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, [loanAmount, totalInterest]);

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left: EMI & Chart */}
      <div className="flex flex-col justify-center items-center space-y-6">
        <div className="text-purple-700 font-semibold text-xl mb-2">EMI starting from</div>
        <div className="text-6xl font-extrabold text-purple-700">
          {formatCurrency(Math.round(emi))}
          <span className="text-3xl font-normal text-gray-600 ml-2">per month</span>
        </div>
        <div className="w-64 h-40 relative">
          <canvas ref={chartRef}></canvas>
          
        </div>

        <div className="mt-5 bottom-5 w-full text-center font-semibold text-gray-800 text-lg">
            Total Amount Payable: {formatCurrency(Math.round(totalPayable))}
          </div>
      </div>

      {/* Right: Controls */}
      <div className="flex flex-col justify-center space-y-8">
        {/* Loan Amount */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-800 font-semibold">Loan Amount</span>
            <span className="font-bold text-purple-700">{formatCurrency(loanAmount)}</span>
          </div>
          <input
            type="range"
            min={MIN_LOAN}
            max={CAR_COST}
            step={1000}
            value={loanAmount}
            onChange={(e) => onLoanAmountChange(Number(e.target.value))}
            className="slider w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{formatCurrency(MIN_LOAN)}</span>
            <span>{formatCurrency(CAR_COST)}</span>
          </div>
        </div>

        {/* Down Payment */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-800 font-semibold">Down Payment*</span>
            <span className="font-bold text-purple-700">{formatCurrency(downPayment)}</span>
          </div>
          <input
            type="range"
            min={MIN_DOWN}
            max={CAR_COST - MIN_LOAN}
            step={1000}
            value={downPayment}
            onChange={(e) => onDownPaymentChange(Number(e.target.value))}
            className="slider w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{formatCurrency(MIN_DOWN)}</span>
            <span>{formatCurrency(CAR_COST)}</span>
          </div>
        </div>

        {/* Duration */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-800 font-semibold">Duration of Loan</span>
            <span className="font-bold text-purple-700">{duration} Months</span>
          </div>
          <input
            type="range"
            min={MIN_DURATION}
            max={MAX_DURATION}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="slider w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{MIN_DURATION} Months</span>
            <span>{MAX_DURATION} Months</span>
          </div>
        </div>

        <button className="bg-purple-700 text-white font-semibold py-4 rounded-xl hover:bg-purple-800 transition-colors w-full">
          <span className="mr-2">₹</span>CHECK ELIGIBILITY
        </button>
      </div>
    </div>
  );
}
