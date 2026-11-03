export function ErrorMessage({ message }: { message: string }) {
  return (
    <div style={{
      backgroundColor: '#fee2e2',
      color: '#991b1b',
      padding: '12px',
      borderRadius: '6px',
      marginBottom: '16px',
      border: '1px solid #fca5a5'
    }}>
      ⚠️ {message}
    </div>
  );
}