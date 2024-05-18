function Cvc({ cvc, handleCvcChange, handleBlankInput, blankCvcError }) {
  return (
    <>
      <div className="cvc_info">
        <p>CVC</p>
        <div className="column">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]"
            maxLength={3}
            className="cvc"
            placeholder="e.g. 123"
            value={cvc}
            onChange={handleCvcChange}
            onBlur={handleBlankInput}
            required
          />
          {blankCvcError ? <span className="cardError">Can't be blank</span> : <span></span>}
        </div>
      </div>
    </>
  );
}

export default Cvc;
