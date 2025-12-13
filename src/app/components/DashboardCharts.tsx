"use client";

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Operation = {
  id: number;
  operationDate: string;
  temperature: number;
  weight: number;
  quality: 'OK' | 'NOT_OK';
  inputMethod: 'MANUAL' | 'OCR';
  group?: { name: string };
  shift?: { shiftNumber: number };
  productionLine?: { lineCode: string };
};

type DashboardChartsProps = {
  operations: Operation[];
};

const COLORS = {
  primary: '#059669',
  secondary: '#10b981',
  tertiary: '#34d399',
  ok: '#10b981',
  notOk: '#ef4444',
  manual: '#3b82f6',
  ocr: '#a855f7',
  shift1: '#059669',
  shift2: '#10b981',
  shift3: '#34d399'
};

export default function DashboardCharts({ operations }: DashboardChartsProps) {
  // Data untuk Quality Rate Pie Chart
  const qualityData = [
    { name: 'OK', value: operations.filter(op => op.quality === 'OK').length, color: COLORS.ok },
    { name: 'NOT OK', value: operations.filter(op => op.quality === 'NOT_OK').length, color: COLORS.notOk }
  ];

  // Data untuk Input Method Pie Chart
  const inputMethodData = [
    { name: 'MANUAL', value: operations.filter(op => op.inputMethod === 'MANUAL').length, color: COLORS.manual },
    { name: 'OCR', value: operations.filter(op => op.inputMethod === 'OCR').length, color: COLORS.ocr }
  ];

  // Data untuk Produksi per Shift Bar Chart
  const shiftStats = operations.reduce((acc, op) => {
    if (!op.shift) return acc;
    const shiftNum = op.shift.shiftNumber;
    if (!acc[shiftNum]) {
      acc[shiftNum] = { shift: `Shift ${shiftNum}`, total: 0, ok: 0, notOk: 0 };
    }
    acc[shiftNum].total++;
    if (op.quality === 'OK') {
      acc[shiftNum].ok++;
    } else {
      acc[shiftNum].notOk++;
    }
    return acc;
  }, {} as Record<number, { shift: string; total: number; ok: number; notOk: number }>);

  const shiftChartData = Object.values(shiftStats).sort((a, b) => {
    const shiftA = parseInt(a.shift.replace('Shift ', ''));
    const shiftB = parseInt(b.shift.replace('Shift ', ''));
    return shiftA - shiftB;
  });

  // Data untuk Temperature & Weight Trend (last 20 operations)
  const trendData = operations.slice(-20).map((op, index) => ({
    index: `#${index + 1}`,
    temperature: op.temperature,
    weight: op.weight,
  }));

  // Data untuk Produksi per Group
  const groupStats = operations.reduce((acc, op) => {
    if (!op.group) return acc;
    const groupName = op.group.name;
    if (!acc[groupName]) {
      acc[groupName] = { group: groupName, count: 0 };
    }
    acc[groupName].count++;
    return acc;
  }, {} as Record<string, { group: string; count: number }>);

  const groupChartData = Object.values(groupStats).sort((a, b) => b.count - a.count);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Row 1: Quality & Input Method Pie Charts */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        {/* Quality Distribution */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
            Distribusi Kualitas
          </h3>
          {qualityData.some(d => d.value > 0) ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={qualityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {qualityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
              Belum ada data
            </div>
          )}
        </div>

        {/* Input Method Distribution */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
            Metode Input
          </h3>
          {inputMethodData.some(d => d.value > 0) ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={inputMethodData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {inputMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
              Belum ada data
            </div>
          )}
        </div>
      </div>

      {/* Row 2: Shift Production Bar Chart */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
          Produksi per Shift
        </h3>
        {shiftChartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={shiftChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="shift" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ok" name="OK" fill={COLORS.ok} />
              <Bar dataKey="notOk" name="NOT OK" fill={COLORS.notOk} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
            Belum ada data
          </div>
        )}
      </div>

      {/* Row 3: Group Production Bar Chart */}
      {groupChartData.length > 0 && (
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
            Produksi per Group
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={groupChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="group" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" name="Jumlah Operasi" fill={COLORS.primary} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      </div>

      {/* Row 4: Temperature & Weight Trend */}
      {trendData.length > 0 && (
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
            Tren Suhu & Berat (20 Operasi Terakhir)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="index" />
              <YAxis yAxisId="left" label={{ value: 'Suhu (°C)', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'Berat (kg)', angle: 90, position: 'insideRight' }} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="temperature" name="Suhu (°C)" stroke={COLORS.notOk} strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="weight" name="Berat (kg)" stroke={COLORS.primary} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
