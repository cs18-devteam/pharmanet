module.exports = function generateOTP(){
    const timeStamp = Date.now();
    const randomNumber = Number.parseInt(Math.random() * 1000000);
    const otp = timeStamp % randomNumber;
    return +String(otp).padStart(6 , '0');
}