import axios from 'axios';
import {showAlert} from './alerts';
var stripe = Stripe('pk_test_VKYyQEFuclaXfk2j0BfCgdOR00K96WoS0M');

export const payment = async (tourId) => {
  try {
    const session = await axios.get(
      `/api/v1/booking/checkout-session/${tourId}`
    );
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
