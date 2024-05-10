import { useState } from 'react';
import CompleteSide from './assets/components/completed';
import './App.css';

function App() {
  const [holder, setHolder] = useState('');
  const [monthExp, setMonthExp] = useState('');
  const [yearExp, setYearExp] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardError, setCardError] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [blankNumError, setBlankNumError] = useState(false);
  const [blankNameError, setBlankNameError] = useState(false);
  const [blankMonthError, setBlankMonthError] = useState(false);
  const [blankYError, setBlankYError] = useState(false);
  const [blankCvcError, setBlankCvcError] = useState(false);
  const [submit, setSubmit] = useState(true);

  const handleHolderChange = (event) => {
    const letter = event.target.value;
    if (!Number(letter)) setHolder(event.target.value);
  };

  const handleCardError = () => {
    setCardError(!/^[0-9 ]*$/.test(cardNumber));
  };
  const handleCardSizeError = () => {
    setSizeError(cardNumber.length !== 19);
    console.log(cardNumber.length);
  };
  const handleBlankInput = () => {
    setBlankNumError(cardNumber.length === 0);
    setBlankNameError(holder.length === 0);
    setBlankMonthError(monthExp.length === 0);
    setBlankYError(yearExp.length === 0);
    setBlankCvcError(cvc.length === 0);
  };
  const handleCardChange = (event) => {
    let input = event.target.value;
    input = input.replace(/(\d{4})(\d{1})/g, '$1 $2').trim();
    setCardNumber(input);
  };
  const handleMonthExpChange = (event) => {
    let monthInput = event.target.value;
    if (monthInput >= 0 && monthInput <= 12) setMonthExp(monthInput);
  };
  const handleYearExpChange = (event) => {
    let yearInput = event.target.value;
    setYearExp(yearInput);
    // let yearInputS = event.target.value;
    // const yearInputArr = yearInputS.split('');
    // if (yearInputArr.length >= 2) {
    //   const firstNum = yearInputArr[0];
    //   const secNum = yearInputArr[1];

    //   const totalNum = firstNum * 10 + secNum;
    //   if (totalNum >= 24) setYearExp(totalNum);
    // }
  };
  const handleCvcChange = (event) => setCvc(event.target.value);

  return (
    <>
      <div className="container">
        <div className="bg_side">
          <div className="front_card">
            <div className="select_side">
              <button className="front"></button>
              <button className="back"></button>
            </div>
            <div className="card_details">
              <p>{cardNumber || '0000 0000 0000 0000'}</p>
              <div className="card_info">
                <span>{holder || 'JANE APPLESEED'}</span>
                <span>
                  {monthExp || '00'}/{yearExp || '00'}
                </span>
              </div>
            </div>
          </div>
          <div className="back_card">
            <p>{cvc || '000'}</p>
          </div>
        </div>
        {submit ? (
          <div className="info_side">
            <div className="user_information">
              <div className="name_info">
                <p>Cardholder Name</p>
                <input
                  type="text"
                  className="user_name"
                  maxLength={24}
                  placeholder="e.g. Jane Appleseed"
                  value={holder}
                  onChange={handleHolderChange}
                  onBlur={(e) => {
                    handleBlankInput(e);
                  }}
                  required
                />
                {blankNameError ? <span className="cardError">Can't be blank</span> : <span></span>}
              </div>
              <div className="number_info">
                <p>Card Number</p>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]"
                  maxLength={19}
                  className={cardError || sizeError || blankNumError ? 'card_number cardError2' : 'card_number'}
                  placeholder="e.g. 1234 5678 9123 0000"
                  value={cardNumber}
                  onChange={handleCardChange}
                  onBlur={(event) => {
                    handleCardError(event);
                    handleCardSizeError(event);
                    handleBlankInput(event);
                  }}
                  required
                />

                {cardError ? (
                  <span className="cardError">
                    Wrong format, numbers only <br />
                  </span>
                ) : (
                  <span></span>
                )}
                {sizeError ? <span className="cardError">Invalid size, must have 16 numbers</span> : <span></span>}
                {blankNumError ? <span className="cardError">Can't be blank</span> : <span></span>}
              </div>
              <div className="sidebyside">
                <div className="date_info">
                  <p>Exp. Date (MM/YY)</p>
                  <div>
                    <div className="column">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]"
                        maxLength={2}
                        className="exp_date"
                        placeholder="MM"
                        value={monthExp}
                        onChange={handleMonthExpChange}
                        onBlur={handleBlankInput}
                        required
                      />
                      {blankMonthError ? <span className="cardError">Can't be blank</span> : <span></span>}
                    </div>
                    <div className="column">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]"
                        maxLength={2}
                        className="exp_date"
                        placeholder="YY"
                        value={yearExp}
                        onChange={handleYearExpChange}
                        onBlur={handleBlankInput}
                        required
                      />
                      {blankYError ? <span className="cardError">Can't be blank</span> : <span></span>}
                    </div>
                  </div>
                </div>
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
              </div>
              <button
                type="submit"
                disabled={cvc === '' || monthExp === '' || yearExp === '' || cardNumber === '' || holder === ''}
                onClick={() => {
                  setSubmit(false);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        ) : (
          <CompleteSide />
        )}
      </div>
    </>
  );
}

export default App;
