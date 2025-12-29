import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <p className="error-message">{message}</p>
    </div>
  );
};
