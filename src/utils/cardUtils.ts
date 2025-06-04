
/**
 * Generates a random card number of 12 digits
 * @returns formatted card number string (e.g., "1234 5678 9012")
 */
export const generateCardNumber = (): string => {
  let cardNumber = "";
  for (let i = 0; i < 12; i++) {
    cardNumber += Math.floor(Math.random() * 10).toString();
    if (i === 3 || i === 7) {
      cardNumber += " ";
    }
  }
  return cardNumber;
};

/**
 * Generates a 3-digit CVV code
 * @returns CVV code string (e.g., "123")
 */
export const generateCVV = (): string => {
  let cvv = "";
  for (let i = 0; i < 3; i++) {
    cvv += Math.floor(Math.random() * 10).toString();
  }
  return cvv;
};

/**
 * Calculates an expiry date 3 months from current date
 * @returns formatted expiry date string (e.g., "06/24")
 */
export const calculateExpiryDate = (): string => {
  const today = new Date();
  today.setMonth(today.getMonth() + 3);
  
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear().toString().substr(-2);
  
  return `${month}/${year}`;
};
