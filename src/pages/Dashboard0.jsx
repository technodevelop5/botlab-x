import React from 'react';
import '../styles/dashboard.css';
import PolygonMap from '../components/PolygonMap';


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
  { country: 'USA', value: 120 },
  { country: 'UK', value: 90 },
  { country: 'Germany', value: 75 },
  { country: 'France', value: 60 },
  { country: 'Japan', value: 50 }
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
            <option>All</option>
          </select>
        </div>
      </div>

      <div className="cards-grid">
        <div className="stat-card">
          <p>Total Population (count)</p>
          <h2>25.2k</h2>
          <span className="change positive">Previous Period 22.8k (+10.5%)</span>
        </div>

        <div className="stat-card">
          <p>Average Age (years)</p>
          <h2>36.7</h2>
          <span className="change positive">Previous Period 35.2 (+4.3%)</span>
        </div>

        <div className="stat-card">
          <p>Gender Ratio (ratio)</p>
          <h2>1.05</h2>
          <span className="change positive">Previous Period 1.02 (+3%)</span>
        </div>

        <div className="stat-card">
          <p>Top Countries (count)</p>
          <h2>5</h2>
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
        innerRadius={40} // ثقب الدونات
        outerRadius={80}
        dataKey="value"
        label={({ index }) => genderData[index].name} // أسماء الجنسين
        paddingAngle={3} // مسافة بين الأقسام
      >
        {genderData.map((entry, index) => {
          const color =
            entry.name === 'Male'
              ? `rgba(59, 130, 246, 0.7)` // أزرق متدرج للذكور
              : `rgba(236, 72, 153, 0.7)`; // زهري متدرج للإناث
          return <Cell key={`cell-${index}`} fill={color} />;
        })}
      </Pie>
      <Tooltip formatter={(value) => `${value}%`} />
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
        innerRadius={40} // هذا الثقب الداخلي
        outerRadius={80} // نصف قطر الخارجي
        dataKey="value"
        label={({ index }) => ageGroupData[index].group} // يعرض الأعمار على كل جزء
        paddingAngle={3} // المسافة بين الأقسام
      >
        {ageGroupData.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={`rgba(59, 130, 246, ${0.3 + index * 0.15})`} // أزرق متدرج
          />
        ))}
      </Pie>
      <Tooltip 
        formatter={(value, name, props) => `${value}`} 
      />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
</div>





<div className="chart-card">
  <h3>Age Density Distribution</h3>
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={ageDensityData}>
      <defs>
        <linearGradient id="ageDensityGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#bfdbfe" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="age" />
      <YAxis />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="density"
        stroke="#3b82f6"
        fill="url(#ageDensityGradient)"
        fillOpacity={1}
      />
    </AreaChart>
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
  <ResponsiveContainer width="100%" height={280}>
    <BarChart
      data={topCountriesData}
      layout="vertical"
      margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
    >
      <defs>
        <linearGradient id="blueGradientVertical" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#93c5fd" stopOpacity={1}/>
          <stop offset="100%" stopColor="#2563eb" stopOpacity={1}/>
        </linearGradient>
      </defs>

      <XAxis type="number" />
      <YAxis type="category" dataKey="country" />
      <Tooltip />

      <Bar dataKey="value" barSize={20} fill="url(#blueGradientVertical)" />
    </BarChart>
  </ResponsiveContainer>
</div>

</div>


    </div>
  );
}
