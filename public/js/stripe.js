import axios from "axios";
import { showAlert } from "./alerts";

// Public stripe key
const stripe = Stripe(
  "pk_test_51NoyDIGn2Y7gh3TNDtWIKx7G6kOgaIGAgC6q9QhQR9fliO7Dl7ZkVXAx7rzbjhyueMYZtJsHGfWrV1Jn9BGFXV5a00rmj0By7E"
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    "error", showAlert(err);
  }
};
