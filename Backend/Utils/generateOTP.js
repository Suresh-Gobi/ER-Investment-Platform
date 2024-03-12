const generateOTP = (length) => {
    const charset = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      otp += charset[randomIndex];
    }
    console.log('Generated OTP:', otp); // Log the generated OTP
    return otp;
  };
  
  const otp = generateOTP(6);
  console.log('OTP:', otp); // Log the generated OTP
  
  module.exports = { generateOTP };
  