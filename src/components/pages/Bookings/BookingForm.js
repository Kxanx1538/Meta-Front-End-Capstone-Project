/*import { text } from '@fortawesome/fontawesome-svg-core'; */
import FormField from './FormField';
import { useState } from 'react';



const BookingForm = ({
  availableTimes,
  dispatchOnDateChange,
  submitData
}) => {
  const invalidNameErrorMessage = 'Please enter a valid name';
  const invalidEmailErrorMessage = 'Please enter a valid email address';
  const minimumDate = new Date().toISOString().split('T')[0];
  const defaultTime = availableTimes[0];
  const minimumNumberOfGuests = 1;
  const maximumNumberOfGuests = 200;
  const occasions = ['Birthday', 'Engagement', 'Wedding', 'Mothers Day', 'Graduation', 'Anniversary'];
  const invalidDateErrorMessage = 'Please choose a valid date';
  const invalidTimeErrorMessage = 'Please choose a valid time';
  const invalidOccasionErrorMessage = 'Please choose a valid occasion';
  const invalidNumberOfGuestsErrorMessage = 'Please enter your number of guest';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(minimumDate);
  const [time, setTime] = useState(defaultTime);
  const [
    numberOfGuests, 
    setNumberGuests
  ] = useState(minimumNumberOfGuests);
  const [occasion, setOccasion] = useState(occasions[0]);
  const [comments, setComment] = useState ('');

  const isDateValid = () => date !== '';
  const isTimeValid = () => time !== '';
  const isNumberOfGuestsValid = () => {
  const guests = Number(numberOfGuests);
    return guests >= minimumNumberOfGuests 
    && guests <= maximumNumberOfGuests;
  };
  
  const isOccasionValid = () => occasion !== '';

  const isFormValid = () => 
    isNameValid()
    && isEmailValid()
    && isDateValid() 
    && isTimeValid() 
    && isNumberOfGuestsValid() 
    && isOccasionValid();

  const handleDateChange = e => {
    setDate(e.target.value);
    dispatchOnDateChange(e.target.value);
  };

  const handleTimeChange = e => setTime(e.target.value);

  const handleFormSubmit = e => {
    e.preventDefault();
    submitData({ name, email, date, time, numberOfGuests, occasion, comments});
  };
  const isNameValid = () => name !== '';
  const isEmailValid = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


  return (
    <form onSubmit={handleFormSubmit}>

      <div className="dining-options">
        <div className="option">
          <input
          type="radio"
          id="indoor-dining"
          name="dining-option"
          value="Indoor Dining"
          checked={occasion === 'Indoor Dining'}
          onChange={(e) => setOccasion(e.target.value)}
          />
          <label htmlFor="indoor-dining">Indoor Dining</label>
        </div>
        <div className="option">
          <input
          type="radio"
          id="outdoor-dining"
          name="dining-option"
          value="Outdoor Dining"
          checked={occasion === 'Outdoor Dining'}
          onChange={(e) => setOccasion(e.target.value)}/>
          <label htmlFor="outdoor-dining">Outdoor Dining</label>
        </div>
      </div>

      <FormField
        label="Name"
        htmlFor="booking-name"
        hasError={!isNameValid()}
        errorMessage={invalidNameErrorMessage}
      >
        <input
          type="text"
          id="booking-name"
          name="booking-name"
          value={name}
          required={true}
          onChange={(e) => setName(e.target.value)}
        />
      </FormField>

      <FormField
        label="Email"
        htmlFor="booking-email"
        hasError={!isEmailValid()}
        errorMessage={invalidEmailErrorMessage}
      >
        <input
          type="email"
          id="booking-email"
          name="booking-email"
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormField>
      
      <FormField 
        label="Date" 
        htmlFor="booking-date" 
        hasError={!isDateValid()} 
        errorMessage={invalidDateErrorMessage}
      >
        <input 
          type="date" 
          id="booking-date" 
          name="booking-date" 
          min={minimumDate} 
          value={date} 
          required={true} 
          onChange={handleDateChange}
        />
      </FormField>

      <FormField 
        label="Time" 
        htmlFor="booking-time" 
        hasError={!isTimeValid()} 
        errorMessage={invalidTimeErrorMessage}
      >
        <select 
          id="booking-time" 
          name="booking-time" 
          value={time} 
          required={true} 
          onChange={handleTimeChange}
        >
          {availableTimes.map(times => 
            <option data-testid="booking-time-option" key={times}>
              {times}
            </option>
          )}
        </select>
      </FormField>
      <FormField 
        label="Number of Diners" 
        htmlFor="booking-number-guests" 
        hasError={!isNumberOfGuestsValid()} 
        errorMessage={invalidNumberOfGuestsErrorMessage}
      >
        <input 
          type="number" 
          id="booking-number-guests" 
          name="booking-number-guests" 
          value={numberOfGuests} 
          min={minimumNumberOfGuests} 
          max={maximumNumberOfGuests} 
          required={true} 
          onChange={e => setNumberGuests(e.target.value)}
        />
      </FormField>
      <FormField 
        label="Occasion" 
        htmlFor="booking-occasion" 
        hasError={!isOccasionValid()} 
        errorMessage={invalidOccasionErrorMessage}
      >
        <select 
          id="booking-occasion" 
          name="booking-occasion" 
          value={occasion} 
          required={true} 
          onChange={e => setOccasion(e.target.value)}
        >
          {occasions.map(occasion => 
            <option data-testid="booking-occasion-option" key={occasion}>
              {occasion}
            </option>
          )}
        </select>
      </FormField>

      <FormField
        label="Special Request"
        htmlFor="booking-comments"
        hasError={false}
        errorMessage={''}
      >
        <textarea
          id="booking-comments"
          name="booking-comments"
          value={comments}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </FormField>

      <button 
        className="button-primary" 
        type="submit" 
        disabled={!isFormValid()}
      >
        Submit your reservation
      </button>
    </form>
  );
};

export default BookingForm;
