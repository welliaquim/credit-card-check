import "./App.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import CompleteSide from "./components/completed";
import ErrorMessage from "./components/ErrorMessage";
import { stringCardFormater } from "./utils/formater";
import { classNamerHelper } from "./utils/helpers";
import { cardCheckSchema } from "./validations/cardcheck";

function onSubmit(data) {
  const validados = cardCheckSchema.parse(data);

  console.log(validados);
}

function App() {
  const [submit, setSubmit] = useState(true);

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm(
    useMemo(
      () => ({
        defaultValues: {
          cardnumber: "1234 4123 1234 4231",
          cvc: 123,
          monthexp: 12,
          name: "Wellouza",
          yearexp: 24,
        },

        resolver: zodResolver(cardCheckSchema),
      }),
      [],
    ),
  );

  const holder = watch("name");
  const cardNumber = watch("cardnumber");
  const monthExp = watch("monthexp");
  const yearExp = watch("yearexp");
  const cvc = watch("cvc");

  function handleCardChange(event) {
    const formated = stringCardFormater(event.target.value);

    setValue("cardnumber", formated);
  }

  return (
    <div className="container">
      <div className="bg_side">
        <div className="front_card">
          <div className="select_side">
            <button className="front" type="button" />
            <button className="back" type="button" />
          </div>
          <div className="card_details">
            <p>{cardNumber || "0000 0000 0000 0000"}</p>
            <div className="card_info">
              <span>{holder || "JANE APPLESEED"}</span>
              {monthExp || "00"}/{yearExp || "00"}
            </div>
          </div>
        </div>
        <div className="back_card">
          <p>{cvc || "000"}</p>
        </div>
      </div>
      {submit ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="info_side">
            <div className="user_information">
              <div className="name_info">
                <p>Cardholder Name</p>
                <input
                  className={errors?.name ? "input-errors" : "normalinput"}
                  inputMode="text"
                  placeholder="e.g. Jane Appleseed"
                  type="text"
                  {...register("name")}
                />
                <ErrorMessage message={errors?.name?.message} />
              </div>
              <div className="number_info">
                <p>Card Number</p>
                <input
                  className={classNamerHelper(errors?.cardnumber, "input-errors", "normalinput")}
                  inputMode="numeric"
                  placeholder="e.g. 1234 5678 9123 0000"
                  type="text"
                  value={cardNumber}
                  {...register("cardnumber")}
                  onChange={handleCardChange}
                />
                <ErrorMessage message={errors?.cardnumber?.message} />
              </div>
              <div className="sidebyside">
                <div className="date_info">
                  <p>Exp. Date (MM/YY)</p>
                  <div className="column">
                    <input
                      className={classNamerHelper(errors?.monthexp, "input-errors", "normalinput")}
                      inputMode="numeric"
                      placeholder="MM"
                      type="text"
                      {...register("monthexp")}
                    />
                    <ErrorMessage message={errors?.monthexp?.message} />
                  </div>
                  <div className="column">
                    <input
                      className={classNamerHelper(errors?.yearexp, "input-errors", "normalinput")}
                      inputMode="numeric"
                      placeholder="YY"
                      type="text"
                      {...register("yearexp")}
                    />
                    <ErrorMessage message={errors?.yearexp?.message} />
                  </div>
                </div>
                <div className="cvc_info">
                  <p>CVC</p>
                  <div className="column">
                    <input
                      className={classNamerHelper(errors?.cvc, "input-errors", "normalinput")}
                      inputMode="numeric"
                      placeholder="e.g. 123"
                      type="text"
                      {...register("cvc")}
                    />
                    <ErrorMessage message={errors?.cvc?.message} />
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
  );
}

export default App;
