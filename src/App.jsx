import { useForm } from 'react-hook-form';
import { useState } from 'react';
import CompleteSide from './components/completed';
import './App.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { cardCheckSchema } from './validations/cardcheck';
import { stringCardFormater } from './utils/formater';

function App() {
  const [submit, setSubmit] = useState(true);

  const { register, handleSubmit, formState, watch, setValue } = useForm({
    defaultValues: {
      cvc: 123,
      name: 'Wellouza',
      cardnumber: '1234 4123 1234 4231',
      yearexp: 24,
      monthexp: 12,
    },
    resolver: zodResolver(cardCheckSchema),
  });

  const { errors } = formState;

  const holder = watch('name');
  const cardNumber = watch('cardnumber');
  const monthExp = watch('monthexp');
  const yearExp = watch('yearexp');
  const cvc = watch('cvc');

  const onSubmit = (data) => {
    const validados = cardCheckSchema.parse(data);
    console.log(validados);
  };
  const handleCardChange = (event) => {
    const formated = stringCardFormater(event.target.value);
    setValue('cardnumber', formated);
  };
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="info_side">
              <div className="user_information">
                <div className="name_info">
                  <p>Cardholder Name</p>
                  <input
                    type="text"
                    className={errors?.name ? 'input-errors' : 'normalinput'}
                    placeholder="e.g. Jane Appleseed"
                    inputMode="text"
                    {...register('name')}
                  />
                  {errors?.name && <span className="error-message">{errors?.name?.message}</span>}
                </div>

                <div className="number_info">
                  <p>Card Number</p>
                  <input
                    type="text"
                    className={errors?.cardnumber ? 'input-errors' : 'normalinput'}
                    placeholder="e.g. 1234 5678 9123 0000"
                    inputMode="numeric"
                    value={cardNumber}
                    {...register('cardnumber')}
                    onChange={handleCardChange}
                  />

                  {errors?.cardnumber && (
                    <span className="error-message">
                      {errors?.cardnumber?.message} <br />
                    </span>
                  )}
                </div>
                <div className="sidebyside">
                  <div className="date_info">
                    <p>Exp. Date (MM/YY)</p>
                    <div>
                      <div className="column">
                        <input
                          type="text"
                          className={errors?.monthexp ? 'input-errors' : 'normalinput'}
                          placeholder="MM"
                          inputMode="numeric"
                          value={monthExp}
                          {...register('monthexp')}
                        />
                        {errors?.monthexp && <span className="error-message">{errors?.monthexp?.message}</span>}
                      </div>
                      <div className="column">
                        <input
                          type="text"
                          className={errors?.yearexp ? 'input-errors' : 'normalinput'}
                          placeholder="YY"
                          inputMode="numeric"
                          value={yearExp}
                          {...register('yearexp')}
                        />
                        {errors?.yearexp && <span className="error-message">{errors?.yearexp?.message}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="cvc_info">
                    <p>CVC</p>
                    <div className="column">
                      <input
                        type="text"
                        className={errors?.cvc ? 'input-errors' : 'normalinput'}
                        placeholder="e.g. 123"
                        inputMode="numeric"
                        {...register('cvc')}
                      />
                      {errors?.cvc && <span className="error-message">{errors?.cvc?.message}</span>}
                    </div>
                  </div>
                </div>
                <button type="submit">Confirm</button>
              </div>
            </div>
          </form>
        ) : (
          <CompleteSide setSubmit={setSubmit} />
        )}
      </div>
    </>
  );
}

export default App;
