import React from 'react';
import '../styles/dashboard.css';
import PolygonMap from '../components/PolygonMap';
import countries from '../data/countries.json';
import countriesList from '../data/countriesList.json';


// Leaflet
import 'leaflet/dist/leaflet.css';

// Recharts – all in one import, no duplicates
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  CartesianGrid
} from 'recharts';




// Default map marker
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Gender data
const genderData = [
  { name: 'Male', value: 52 },
  { name: 'Female', value: 48 }
];

const PIE_COLORS = ['#2563eb', '#9333ea'];

// Top 5 countries data
const topCountriesData = [
  { country: "USA", population: 120, percentage: 30 },
  { country: "UK", population: 90, percentage: 22 },
  { country: "Germany", population: 75, percentage: 18 },
  { country: "France", value: 60, percentage: 15 },
  { country: "Japan", population: 50, percentage: 12 },
];

const BAR_COLORS = ['#2563eb', '#9333ea', '#f59e0b', '#10b981', '#ef4444'];

// Age Group Data
const ageGroupData = [
  { group: '18-25', value: 4200 },
  { group: '26-35', value: 6800 },
  { group: '36-45', value: 5100 },
  { group: '46-60', value: 2900 },
  { group: '60+', value: 1200 },
];

const AGE_COLORS = ['#2563eb', '#9333ea', '#14b8a6', '#f59e0b', '#ef4444'];

const ageDensityData = [
  { age: '18-24', density: 400 },
  { age: '25-34', density: 900 },
  { age: '35-44', density: 700 },
  { age: '45-54', density: 500 },
  { age: '55-64', density: 300 },
  { age: '65+', density: 150 }
];


export default function Dashboard() {
  return (
    <div className="dashboard container fade-in">

      <header className="dashboard-header">
        <h1>Comprehensive Demographic Profile Analytics</h1>
        <div className="date-updated">Data Last Updated on | 01/01/2025</div>
      </header>

      <div className="filters-grid">
        <div className="filter-card">
          <label>Start date</label>
          <input type="date" defaultValue="2023-01-01" />
        </div>

        <div className="filter-card">
          <label>End date</label>
          <input type="date" defaultValue="2024-12-31" />
        </div>

        <div className="filter-card">
          <label>Select Region</label>
          <select>
    <option value="">All</option>
    {countriesList.map((country) => (
      <option key={country.code} value={country.code}>
        {country.name}
      </option>
    ))}
  </select>
        </div>
      </div>

      <div className="cards-grid">
        <div className="stat-card">
  <p>Total Population (count)</p>
  <h2>
    25.2k
    <span className="arrow-up"></span> {/* هذا السهم الأخضر */}
  </h2>
  <span className="change positive">Previous Period 22.8k (+10.5%)</span>
</div>


        <div className="stat-card">
  <p>Average Age (years)</p>
  <h2>
    36.7
    <span className="arrow-up"></span>
  </h2>
  <span className="change positive">Previous Period 35.2 (+4.3%)</span>
</div>


        <div className="stat-card">
  <p>Gender Ratio (ratio)</p>
  <h2>
    1.05
    <span className="arrow-up"></span> {/* استخدم arrow-down إذا انخفض */}
  </h2>
  <span className="change positive">Previous Period 1.02 (+3%)</span>
</div>


        <div className="stat-card">
  <p>Top Countries (count)</p>
  <h2>
    5
    <span className="arrow-up"></span> {/* استخدم arrow-down إذا انخفض */}
  </h2>
  <span className="change positive">Previous Period 4 (+25%)</span>
</div>

      </div>

      <div className="charts-grid">
        <div className="chart-card">
  <h3>Gender Distribution</h3>
  <ResponsiveContainer width="100%" height={250}>
  <PieChart>
    <Pie
      data={genderData}
      cx="50%"
      cy="50%"
      innerRadius={50}
      outerRadius={80}
      dataKey="value"
      label={({ name, value, percent }) =>
        `${name}: ${(percent * 100).toFixed(1)}%`
      }
    >
      {/* Male (Blue Gradient) */}
      <Cell
        fill="url(#maleGradient)"
      />

      {/* Female (Pink Gradient) */}
      <Cell
        fill="url(#femaleGradient)"
      />
    </Pie>

    {/* Gradients */}
    <defs>
      <linearGradient id="maleGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#93c5fd" />
      </linearGradient>

      <linearGradient id="femaleGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#f9a8d4" />
      </linearGradient>
    </defs>

    <Tooltip />
    <Legend />
  </PieChart>
</ResponsiveContainer>
</div>



<div className="chart-card">
  <h3>Age Group Composition</h3>
  <ResponsiveContainer width="100%" height={250}>
  <PieChart>
    <Pie
      data={ageGroupData}
      cx="50%"
      cy="50%"
      innerRadius={40}
      outerRadius={80}
      dataKey="value"
      paddingAngle={3}
      label={({ index, percent }) =>
        `${ageGroupData[index].group} (${(percent * 100).toFixed(1)}%)`
      }
      labelLine={false}
    >
      {ageGroupData.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={`rgba(59, 130, 246, ${0.3 + index * 0.15})`}
        />
      ))}
    </Pie>

    <Tooltip formatter={(value) => `${value}`} />
    <Legend />
  </PieChart>
</ResponsiveContainer>


</div>





<div className="chart-card">
  <h3>Age Density Distribution</h3>
  <ResponsiveContainer width="100%" height={300}>
   <ResponsiveContainer width="100%" height={300}>
  <BarChart data={ageDensityData} margin={{ top: 20, right: 20, left: 50, bottom: 50 }}>

    {/* Gradient */}
    <defs>
      <linearGradient id="ageDensityGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
        <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.8} />
      </linearGradient>
    </defs>

    <CartesianGrid strokeDasharray="3 3" />

    {/* محور X */}
    <XAxis dataKey="age" />

    {/* عنوان محور X */}
    <text
      x="50%"
      y={300 - 20}   // مكان مضبوط داخل الإطار
      textAnchor="middle"
      style={{ fontSize: 14, fill: "#1e293b", fontWeight: 500 }}
    >
      Age (years)
    </text>

    {/* محور Y */}
    <YAxis />

    {/* عنوان محور Y */}
    <text
      x={15}         // يمين شوي حتى يصير واضح
      y={150}
      textAnchor="middle"
      transform="rotate(-90, 15, 150)"
      style={{ fontSize: 14, fill: "#1e293b", fontWeight: 500 }}
    >
      Population Density (persons)
    </text>

    <Tooltip formatter={(value) => `${value} persons`} />

    <Bar
      dataKey="density"
      barSize={35}
      fill="url(#ageDensityGradient)"
      radius={[8, 8, 0, 0]}
    />
  </BarChart>
</ResponsiveContainer>



  </ResponsiveContainer>
</div>

      </div>

      <div className="bottom-grid">
  <div className="chart-card large">
    <h3>Geographic Distribution</h3>
    <PolygonMap />
  </div>

  <div className="chart-card large">
  <h3>Top 5 Countries of Origin</h3>
  <ResponsiveContainer width="100%" height={300}>
  <BarChart data={topCountriesData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>

    {/* Gradient */}
    <defs>
      <linearGradient id="populationGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.95} />
        <stop offset="100%" stopColor="#c4b5fd" stopOpacity={0.85} />
      </linearGradient>

      <linearGradient id="percentageGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.95} />
        <stop offset="100%" stopColor="#7dd3fc" stopOpacity={0.85} />
      </linearGradient>
    </defs>

    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="country" />
    <YAxis />
    <Tooltip />

    {/* Population Column */}
    <Bar
      dataKey="population"
      name="Population"
      barSize={30}
      fill="url(#populationGradient)"
      radius={[8, 8, 0, 0]}
    />

    {/* Percentage Column */}
    <Bar
      dataKey="percentage"
      name="Percentage"
      barSize={30}
      fill="url(#percentageGradient)"
      radius={[8, 8, 0, 0]}
    />
  </BarChart>
</ResponsiveContainer>

</div>

</div>


    </div>
  );
}
