import { Calendar } from './Calendar';
export function Widget() {
  return (
    <div style={{ padding: '20px' }}>
      <h1
        style={{
          textAlign: 'center',
          color: '#333',
          fontSize: '24px',
        }}
      >
        My Widget 12
      </h1>
      <Calendar />
    </div>
  );
}
