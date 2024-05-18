export default function ErrorMessage({ message }) {
  return message && <span className="error-message">{message}</span>;
}
