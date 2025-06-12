
import React, { useEffect, useRef } from 'react';
import { toast } from '@/hooks/use-toast';

interface PayPalButtonProps {
  amount: string;
  currency?: string;
  description: string;
  onSuccess?: (details: any) => void;
  onError?: (error: any) => void;
}

declare global {
  interface Window {
    paypal: any;
  }
}

const PayPalButton: React.FC<PayPalButtonProps> = ({
  amount,
  currency = "USD",
  description,
  onSuccess,
  onError
}) => {
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load PayPal script
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=AbbCtePdaGiT_0SyfFgLjcJxR75XjaoF5ODOPMbYb-du_QDalqRkIVuj85laQmc0ceYnkjwYoAtN4xwP&currency=${currency}`;
    script.async = true;
    
    script.onload = () => {
      if (window.paypal && paypalRef.current) {
        window.paypal.Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: amount,
                  currency_code: currency
                },
                description: description
              }]
            });
          },
          onApprove: async (data: any, actions: any) => {
            try {
              const details = await actions.order.capture();
              toast({
                title: "تم الدفع بنجاح",
                description: "شكراً لك! تم استلام الدفعة بنجاح",
              });
              if (onSuccess) {
                onSuccess(details);
              }
            } catch (error) {
              console.error('PayPal capture error:', error);
              toast({
                title: "خطأ في الدفع",
                description: "حدث خطأ أثناء معالجة الدفع",
                variant: "destructive",
              });
              if (onError) {
                onError(error);
              }
            }
          },
          onError: (error: any) => {
            console.error('PayPal error:', error);
            toast({
              title: "خطأ في الدفع",
              description: "حدث خطأ في نظام الدفع",
              variant: "destructive",
            });
            if (onError) {
              onError(error);
            }
          }
        }).render(paypalRef.current);
      }
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [amount, currency, description, onSuccess, onError]);

  return <div ref={paypalRef} className="paypal-button-container"></div>;
};

export default PayPalButton;
