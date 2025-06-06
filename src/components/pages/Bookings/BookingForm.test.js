import { fireEvent, render, screen } from '@testing-library/react';
import BookingForm from './BookingForm';



describe('Booking form', () => {
  const availableTimes = ['17:00', '17:30'];
  const today = new Date().toISOString().split('T')[0];
  const dispatchOnDateChange = jest.fn();
  const submitData = jest.fn();

 test('should correctly render all fields and their default values', async () => {
  render(
    <BookingForm availableTimes={availableTimes} submitData={submitData} />
  );

  // Fill required fields to pass form validation
  fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'Ash' } });
  fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'ash@example.com' } });
  fireEvent.change(screen.getByLabelText(/Phone Number/), { target: { value: '123-456-7890' } });

  const dateInput = screen.getByLabelText(/Date/);
  const timeSelect = screen.getByLabelText(/Time/);
  const timeOptions = await screen.findAllByTestId('booking-time-option');
  const numberOfGuestsInput = screen.getByLabelText(/Number of Diners/);
  const occasionSelect = screen.getByLabelText(/Occasion/);
  const occasionOptions = await screen.findAllByTestId(`booking-occasion-option`);
  const submitButton = screen.getByRole('button');

  expect(dateInput).toBeInTheDocument();
  expect(dateInput).toHaveValue(today);
  expect(timeOptions.length).toBe(2);
  expect(numberOfGuestsInput).toHaveValue(1);
  expect(occasionOptions.length).toBe(6);
  expect(submitButton).toBeEnabled(); // ✅ will now pass
 });




 test('should successfully submit form with default values', async () => {
  render(<BookingForm availableTimes={availableTimes} submitData={submitData} />);

  // Step 1: Fill in the required inputs with valid values
  fireEvent.change(screen.getByLabelText(/Name/i), {
    target: { value: 'Ash' },
  });
  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: 'ash@example.com' },
  });
  fireEvent.change(screen.getByLabelText(/Phone Number/i), {
    target: { value: '123-456-7890' },
  });

  // Step 2: Now the submit button should be enabled, click it
  const submitButton = screen.getByRole('button');
  fireEvent.click(submitButton);

  // Step 3: Assert the submit function was called with the expected data
  expect(submitData).toHaveBeenCalledWith({
  name: 'Ash',
  email: 'ash@example.com',
  phoneNumber: '123-456-7890',
  comments: '', // default value
  date: today,
  time: availableTimes[0],
  numberOfGuests: 1,
  occasion: 'Birthday',
  });
 });






 //test('should successfully submit form with default values', () => {
  //  render(
 //     <BookingForm availableTimes={availableTimes} submitData={submitData} />
  //  );

 //   const submitButton = screen.getByRole('button');
 //    fireEvent.click(submitButton);

  //  expect(submitData).toHaveBeenCalledWith({ 
  //    date: today, 
  //    time: availableTimes[0], 
  //    numberOfGuests: 1, 
  //    occasion: 'Birthday', 
  //  });
  //});

  
  test(
    `should display an error message and disable sumbit button when date 
    field's value is empty`, () => {
    render(
      <BookingForm 
        availableTimes={availableTimes} 
        dispatchOnDateChange={dispatchOnDateChange} 
        submitData={submitData} 
      />
    );

    const dateInput = screen.getByLabelText(/Date/);
    fireEvent.change(dateInput, { target: { value: '' } });
    fireEvent.blur(dateInput);
    const errorMessage = screen.getByTestId('error-message-date'); // For the date test
    const submitButton = screen.getByRole('button');

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('Please choose a valid date');
    expect(submitButton).toBeDisabled();
  });

  test(
    `should display an error message and disable sumbit button when number of  
    guests field's value is empty`, () => {
    render(
      <BookingForm 
        availableTimes={availableTimes} 
        dispatchOnDateChange={dispatchOnDateChange} 
        submitData={submitData} 
      />
    );

    const numberOfGuestsInput = screen.getByLabelText(/Number of Diners/);
    fireEvent.change(numberOfGuestsInput, { target: { value: '' } });
    fireEvent.blur(numberOfGuestsInput);
    const errorMessage = screen.getByTestId('error-message-number-of-diners');// For the guests test
    const submitButton = screen.getByRole('button');

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('Please enter your number of guest');
    expect(submitButton).toBeDisabled();
  });
});
