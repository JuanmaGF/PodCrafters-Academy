import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "../../styles/popupPay.css";

const PopupPay = ({ handleClosePopup }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { store, actions } = useContext(Context);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isMounted, setIsMounted] = useState(true);

    useEffect(() => {
        return () => {
            setIsMounted(false);
        };
    }, []);

    const handlePagar = async () => {
        try {
            const { sessionId } = await actions.createPayment();
            stripe.redirectToCheckout({
                sessionId: sessionId
            });
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error al procesar el pago');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement
        });

        if (error) {
            console.error(error);
            setErrorMessage(error.message);
        } else {
            console.log(paymentMethod);
            if (isMounted) {
                handleClosePopup();
                setShowSuccessMessage(true);
            }
        }
    };

    return (
        <div className="popup-container">
            <div className="popup-pay">
                <div className="close-icon" onClick={handleClosePopup}></div>
                <h2>Completa tu pago</h2>
                <form onSubmit={handleSubmit}>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <button className="btn-pay" onClick={handlePagar}>Pagar</button>
                </form>
            </div>
            {showSuccessMessage && (
                <div className="payment-success-message">
                    <h2>¡Pago completado con éxito!</h2>
                    <p>Tu pago ha sido procesado correctamente.</p>
                </div>
            )}
        </div>
    );
};

export default PopupPay;
