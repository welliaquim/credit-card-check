import Completeicon from './icon';

function completeSide() {
  return (
    <>
      <div className="info_side">
        <div className="info_side_center">
          <div className="user_information">
            <Completeicon />
            <h1>Thank you!</h1>
            <span className="completeSpan">We've added your card details</span>
            <button
              type="submit"
              onClick={() => {
                setSubmit(true);
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default completeSide;
