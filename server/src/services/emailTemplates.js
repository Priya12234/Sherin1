const allTemplates = {
  /**
   * @desc Template for new user registration
   * @param {string} name - Name of the user
   */
  registerTemplate: (name) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Sherin Shop</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f7f7f7;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 50px auto;
                background-color: #ffffff;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            h1 {
                color: #333333;
            }
            p {
                color: #555555;
                line-height: 1.6;
            }
            .btn {
                display: inline-block;
                padding: 10px 20px;
                margin-top: 20px;
                background-color: #ff6b6b;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
            }
            .footer {
                margin-top: 30px;
                font-size: 12px;
                color: #999999;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome, ${name}!</h1>
            <p>Thank you for registering at <b>Sherin Shop</b>. We are thrilled to have you on board.</p>
            <p>You can now explore our collection of clothing, jewelry, and combos.</p>
            <a href="https://yourshop.com" class="btn">Visit Sherin Shop</a>
            <div class="footer">
                &copy; ${new Date().getFullYear()} Sherin Shop. All rights reserved.
            </div>
        </div>
    </body>
    </html>
    `;
  },

  // Placeholder for future templates
  forgotPasswordTemplate: (name, resetLink) => {
    return `
      <h1>Hello ${name}</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
    `;
  },

  orderConfirmationTemplate: (name, orderId) => {
    return `
      <h1>Thank you for your order, ${name}!</h1>
      <p>Your order <b>#${orderId}</b> has been confirmed.</p>
      <p>We will notify you once your order is shipped.</p>
    `;
  },
};

export default allTemplates;

