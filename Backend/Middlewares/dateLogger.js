const dateLogger = (req, res, next) => {
    const date = new Date();
  //this date logger middleware is used to log the date where ever we want for any model in indian timezone
    const options={
        timeZone:"Asia/Kolkata",
        year:"numeric",
        month:"long",
        day:"numeric",
        hour:"numeric",
        minute:"numeric",
        second:"numeric"
    }
  
    const indianTime = date.toLocaleString("en-IN", options);
  
    req.body.date = indianTime;
    next();//after that by next moving to next route
  };
  
  module.exports = { dateLogger };