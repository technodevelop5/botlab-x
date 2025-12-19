import React, { useState, useEffect } from 'react';
import '../styles/dashboard.css';
import PolygonMap from '../components/PolygonMap';
import countriesList from '../data/countriesList.json';

// Leaflet
import 'leaflet/dist/leaflet.css';

// Recharts
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
  CartesianGrid
} from 'recharts';

// ===== بيانات افتراضية يمكن استبدالها بالـ backend لاحقًا =====
const defaultGenderData = [
  { name: 'Male', value: 45 },
  { name: 'Female', value: 40 },
  { name: 'Non-binary', value: 10 },
  { name: 'Prefer not to say', value: 5 },
];

const defaultTopCountriesData = [
  { country: "USA", population: 120, percentage: 30 },
  { country: "UK", population: 90, percentage: 22 },
  { country: "Germany", population: 75, percentage: 18 },
  { country: "France", population: 60, percentage: 15 },
  { country: "Japan", population: 50, percentage: 12 },
];

const defaultAgeGroupData = [
  { group: '18-25', value: 4200 },
  { group: '26-35', value: 6800 },
  { group: '36-45', value: 5100 },
  { group: '46-60', value: 2900 },
  { group: '60+', value: 1200 },
];

const defaultAgeDensityData = [
  { age: '18-24', density: 400 },
  { age: '25-34', density: 900 },
  { age: '35-44', density: 700 },
  { age: '45-54', density: 500 },
  { age: '55-64', density: 300 },
  { age: '65+', density: 150 }
];

export default function Dashboard() {
  // 🔹 States
  const [lastUpdated, setLastUpdated] = useState("01/01/2025"); // يمكن استبداله بتاريخ من backend
  const [genderData, setGenderData] = useState(defaultGenderData);
  const [topCountriesData, setTopCountriesData] = useState(defaultTopCountriesData);
  const [ageGroupData, setAgeGroupData] = useState(defaultAgeGroupData);
  const [ageDensityData, setAgeDensityData] = useState(defaultAgeDensityData);

  // 🔹 useEffect لتحميل البيانات من الـ backend لاحقًا
  useEffect(() => {
    // مثال: جلب البيانات من API
    // fetch('/api/dashboard-data')
    //   .then(res => res.json())
    //   .then(data => {
    //     setGenderData(data.genderData);
    //     setTopCountriesData(data.topCountriesData);
    //     setAgeGroupData(data.ageGroupData);
    //     setAgeDensityData(data.ageDensityData);
    //     setLastUpdated(data.lastUpdated);
    //   });

    // حالياً محاكاة: تحديث التاريخ تلقائيًا
    const simulatedDate = new Date().toLocaleDateString("en-GB");
    setLastUpdated(simulatedDate);
  }, []);

  return (
    <div className="dashboard container fade-in">

      <header className="dashboard-header">
        <h1>Comprehensive Demographic Profile Analytics</h1>
        <div className="date-updated">
          Data Last Updated on | {lastUpdated}
        </div>
      </header>

      {/* ===== Filters ===== */}
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

      {/* ===== Stat Cards ===== */}
      <div className="cards-grid">
        <div className="stat-card">
          <p>Total Population (count)</p>
          <h2>25.2k <span className="arrow-up"></span></h2>
          <span className="change positive">Previous Period 22.8k (+10.5%)</span>
        </div>

        <div className="stat-card">
          <p>Average Age (years)</p>
          <h2>36.7 <span className="arrow-up"></span></h2>
          <span className="change positive">Previous Period 35.2 (+4.3%)</span>
        </div>

        <div className="stat-card">
          <p>Gender Ratio (ratio)</p>
          <h2>1.05 <span className="arrow-up"></span></h2>
          <span className="change positive">Previous Period 1.02 (+3%)</span>
        </div>

        <div className="stat-card">
          <p>Top Countries (count)</p>
          <h2>5 <span className="arrow-up"></span></h2>
          <span className="change positive">Previous Period 4 (+25%)</span>
        </div>
      </div>

      {/* ===== Charts ===== */}
      <div className="charts-grid">

        {/* Gender Distribution */}
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
                labelLine={false}
                label={false}
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`url(#gradient${index})`} />
                ))}
              </Pie>

              <defs>
                <linearGradient id="gradient0" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#93c5fd" />
                </linearGradient>
                <linearGradient id="gradient1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#f9a8d4" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#fcd34d" />
                </linearGradient>
                <linearGradient id="gradient3" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#6ee7b7" />
                </linearGradient>
              </defs>

              <Tooltip />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                formatter={(value, entry, index) =>
                  `${value}: ${genderData[index].value}%`
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Age Group Composition */}
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
        label={({ index }) => ageGroupData[index].group} // فقط الاسم على الرسم
      >
        {ageGroupData.map((entry, index) => {
          // ألوان متدرجة وواضحة
          const colors = ['#3b82f6', '#9333ea', '#f59e0b', '#10b981', '#ef4444'];
          return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
        })}
      </Pie>

      <Tooltip formatter={(value) => `${value} persons`} />
      <Legend
        verticalAlign="bottom"
        align="center"
        layout="horizontal"
        formatter={(value, entry, index) => ageGroupData[index].group} // فقط الاسم في Legend
      />
    </PieChart>
  </ResponsiveContainer>
</div>



        {/* Age Density Distribution */}
        <div className="chart-card">
  <h3>Age Density Distribution</h3>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart
      data={ageDensityData}
      margin={{ top: 20, right: 20, left: 50, bottom: 50 }}
    >
      {/* Gradient */}
      <defs>
        <linearGradient id="ageDensityGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
          <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.8} />
        </linearGradient>
      </defs>

      <CartesianGrid strokeDasharray="3 3" />

      {/* محور X */}
      <XAxis dataKey="age" label={{ value: "Age (years)", position: 'insideBottom', offset: 0, style: { fontSize: 12 } }} />

      {/* محور Y مع Label */}
      <YAxis
        label={{
          value: "Population Density (persons)",
          angle: -90,
          position: 'insideLeft',
          offset: 10,
          style: { textAnchor: 'middle', fontSize: 12 }
        }}
      />

      <Tooltip formatter={(value) => `${value} persons`} />

      <Bar
        dataKey="density"
        barSize={35}
        fill="url(#ageDensityGradient)"
        radius={[8, 8, 0, 0]}
      />
    </BarChart>
  </ResponsiveContainer>
</div>

      </div>

      {/* ===== Bottom Grid ===== */}
      <div className="bottom-grid">
        <div className="chart-card large">
          <h3>Geographic Distribution</h3>
          <PolygonMap />
        </div>

        <div className="chart-card large">
          <h3>Top 5 Countries of Origin</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topCountriesData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
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
              <Bar dataKey="population" name="Population" barSize={30} fill="url(#populationGradient)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="percentage" name="Percentage" barSize={30} fill="url(#percentageGradient)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
