const extendTimeoutMiddleware = (req, res, next) => {
  const space = ' ';
  let isFinished = false;
  let isDataSent = false;

  console.log(`isFinished: ${isFinished} & isDataSent: ${isDataSent}`)
  // Only extend the timeout for API requests
  if (!req.url.includes('/api')) {
    next();
    return;
  }

  res.once('finish', () => {
    isFinished = true;
  });

  res.once('end', () => {
    isFinished = true;
  });
    
  const waitAndSend = () => {
    setTimeout(() => {
        
  console.log(`inside isFinished: ${isFinished} & isDataSent: ${isDataSent} res.headersSent: ${res.headersSent}`)
      // If the response hasn't finished and hasn't sent any data back....
      if (!isFinished && !isDataSent) {
      //   Need to write the status code/headers if they haven't been sent yet.
        if (!res.headersSent) {
          res.writeHead(202);
        }

        res.write(space);
        // Wait another 15 seconds
        waitAndSend();
      }
    }, 15000);
  };

  waitAndSend();
  next();
};

module.exports = extendTimeoutMiddleware;