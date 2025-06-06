
const FormField = ({ children, label, htmlFor, hasError, errorMessage, errorTestId }) => {
  return (
    <div className="form-field">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {hasError && errorMessage ? 
        <p data-testid={errorTestId || "error-message"}>{errorMessage}</p> : null}
    </div>
  );
};

export default FormField;
