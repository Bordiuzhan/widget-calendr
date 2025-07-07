import { Calendar } from './Calendar';
export function Widget() {
  return (
    <div
      style={{
        padding: '20px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          color: '#333',
          fontSize: '24px',
        }}
      >
        My Widget Exampl
      </h1>
      <Calendar />
    </div>
  );
}
