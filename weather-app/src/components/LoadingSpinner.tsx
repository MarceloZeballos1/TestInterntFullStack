import './LoadingSpinner.css';

export const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Cargando datos del clima...</p>
    </div>
  );
};
