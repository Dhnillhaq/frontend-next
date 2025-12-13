import { fetchOperations } from "@/services/operationService";
import DashboardCharts from "./components/DashboardCharts";

export default async function DashboardPage() {
  const operations = await fetchOperations();

  // Hitung statistik untuk seluruh data
  const total = operations.length;
  const qualityOK = operations.filter(op => op.quality === 'OK').length;
  const qualityRate = total > 0 ? ((qualityOK / total) * 100).toFixed(1) : 0;
  
  const avgTemp = total > 0 
    ? (operations.reduce((sum, op) => sum + op.temperature, 0) / total).toFixed(1)
    : 0;
  
  const avgWeight = total > 0
    ? (operations.reduce((sum, op) => sum + op.weight, 0) / total).toFixed(2)
    : 0;

  return (
    <div className="groups-container">
      <h1 className="groups-title">Dashboard Produksi</h1>
      <p className="groups-subtitle">Ringkasan data operasi produksi keseluruhan</p>

      {/* Summary Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {/* Total Produksi */}
        <div style={{
          background: 'linear-gradient(135deg, #10b981 0%, #036143 100%)',
          padding: '1.5rem',
          borderRadius: '12px',
          color: 'white',
          boxShadow: '0 4px 6px rgba(5, 150, 105, 0.2)'
        }}>
          <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>
            Total Produksi
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
            {total}
          </div>
          <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
            operasi tercatat
          </div>
        </div>

        {/* Quality Rate */}
        <div style={{
          background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
          padding: '1.5rem',
          borderRadius: '12px',
          color: 'white',
          boxShadow: '0 4px 6px rgba(16, 185, 129, 0.2)'
        }}>
          <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>
            Quality Rate
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
            {qualityRate}%
          </div>
          <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
            {qualityOK} OK dari {total} total
          </div>
        </div>

        {/* Rata-rata Suhu */}
        <div style={{
          background: 'linear-gradient(135deg, #6ee7b7 0%, #34d399 100%)',
          padding: '1.5rem',
          borderRadius: '12px',
          color: 'white',
          boxShadow: '0 4px 6px rgba(52, 211, 153, 0.2)'
        }}>
          <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>
            Rata-rata Suhu
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
            {avgTemp}°C
          </div>
          <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
            temperatur produksi
          </div>
        </div>

        {/* Rata-rata Berat */}
        <div style={{
          background: 'linear-gradient(135deg, #036143 0%, #047857 100%)',
          padding: '1.5rem',
          borderRadius: '12px',
          color: 'white',
          boxShadow: '0 4px 6px rgba(4, 120, 87, 0.2)'
        }}>
          <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>
            Rata-rata Berat
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
            {avgWeight}
          </div>
          <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
            kg per operasi
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <DashboardCharts operations={operations} />

      {/* Recent Operations */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
          10 Operasi Terbaru
        </h3>
        {operations.length === 0 ? (
          <div style={{ color: '#6b7280', fontSize: '0.875rem', textAlign: 'center', padding: '2rem' }}>
            Belum ada data operasi
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="groups-table">
              <thead>
                <tr>
                  <th>Group</th>
                  <th>Shift</th>
                  <th>Line</th>
                  <th>Suhu</th>
                  <th>Berat</th>
                  <th>Kualitas</th>
                  <th>Input</th>
                </tr>
              </thead>
              <tbody>
                {operations.slice(0, 10).map((op) => (
                  <tr key={op.id}>
                    <td>{op.group?.name || '-'}</td>
                    <td>Shift {op.shift?.shiftNumber || '-'}</td>
                    <td>{op.productionLine?.lineCode || '-'}</td>
                    <td>{op.temperature}°C</td>
                    <td>{op.weight} kg</td>
                    <td>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        backgroundColor: op.quality === 'OK' ? '#10b981' : '#ef4444',
                        color: 'white'
                      }}>
                        {op.quality}
                      </span>
                    </td>
                    <td>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        backgroundColor: op.inputMethod === 'MANUAL' ? '#3b82f6' : '#a855f7',
                        color: 'white'
                      }}>
                        {op.inputMethod}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
