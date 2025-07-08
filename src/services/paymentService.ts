declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  keyId?: string;
}

interface PaymentVerification {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface UserData {
  name?: string;
  email?: string;
  phone?: string;
}

interface PaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

class PaymentService {
  private readonly API_BASE_URL = 'http://localhost:3000/api/payment'; // Update this to your backend URL

  async createOrder(amount: number, currency: string = 'INR'): Promise<PaymentOrder> {
    try {
      // Convert rupees to paise for Razorpay
      const amountInRupees = Math.round(amount);
      console.log('PaymentService: Converting', amount, 'rupees to', amountInRupees, 'rupees');
      
      const response = await fetch(`${this.API_BASE_URL}/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountInRupees, // Send rupees to backend
          currency: currency,
          receipt: `receipt_${Date.now()}`,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create order: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      // Handle your backend's response format
      if (data.success && data.order) {
        console.log('Order created successfully:', data.order);
        return {
          id: data.order.id,
          amount: data.order.amount,
          currency: data.order.currency,
          receipt: data.order.receipt,
          keyId: data.key_id // Get the key from backend
        };
      } else {
        console.error('Failed to create order:', data);
        throw new Error(data.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to payment server. Please check your internet connection.');
      }
      throw error;
    }
  }

  async verifyPayment(paymentData: PaymentVerification): Promise<boolean> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Payment verification failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      // Handle your backend's response format
      if (data.success) {
        return true;
      } else {
        console.error('Payment verification failed:', data.message);
        return false;
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to verify payment. Please check your internet connection.');
      }
      throw error;
    }
  }

  loadRazorpayScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      if (window.Razorpay) {
        resolve();
        return;
      }

      // Check if script is already being loaded
      const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (existingScript) {
        // Wait for existing script to load
        const checkRazorpay = () => {
          if (window.Razorpay) {
            resolve();
          } else {
            setTimeout(checkRazorpay, 100);
          }
        };
        checkRazorpay();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        // Double check that Razorpay is available
        if (window.Razorpay) {
          resolve();
        } else {
          reject(new Error('Razorpay script loaded but not available'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load Razorpay script'));
      document.head.appendChild(script);
    });
  }

  async initializePayment(orderData: PaymentOrder, userData: UserData): Promise<{ success: boolean; paymentId?: string; orderId?: string; error?: string }> {
    try {
      await this.loadRazorpayScript();

      // Validate that we have a key
      if (!orderData.keyId) {
        throw new Error('Payment key not provided by backend');
      }

      return new Promise((resolve, reject) => {
        console.log('PaymentService: Initializing Razorpay with amount:', orderData.amount, 'rupees');
        const options = {
          key: orderData.keyId, // Use only the key from backend
          amount: orderData.amount, // Razorpay expects amount in paise
          currency: orderData.currency,
          name: "Pitta's Organic Dairy",
          description: "Fresh Organic Milk Subscription",
          order_id: orderData.id,
          handler: async (response: PaymentResponse) => {
            try {
              console.log('Payment response received:', response);
              
              // Validate required fields
              if (!response.razorpay_order_id || !response.razorpay_payment_id || !response.razorpay_signature) {
                console.error('Invalid payment response:', response);
                resolve({ success: false, error: 'Invalid payment response' });
                return;
              }

              const verified = await this.verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });

              if (verified) {
                // Payment successful
                console.log('Payment successful:', response);
                resolve({ 
                  success: true, 
                  paymentId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id
                });
              } else {
                // Payment verification failed
                console.error('Payment verification failed');
                resolve({ success: false, error: 'Payment verification failed' });
              }
            } catch (error) {
              console.error('Payment verification error:', error);
              resolve({ success: false, error: 'Payment verification error' });
            }
          },
          prefill: {
            name: userData.name || '',
            email: userData.email || '',
            contact: userData.phone || '',
          },
          theme: {
            color: "#3B82F6",
          },
          modal: {
            ondismiss: () => {
              console.log('Payment modal dismissed');
              resolve({ success: false, error: 'Payment cancelled' });
            },
          },
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      });
    } catch (error) {
      console.error('Error initializing payment:', error);
      throw error;
    }
  }
}

export default new PaymentService(); 