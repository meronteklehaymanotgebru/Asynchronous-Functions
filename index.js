async function sendReminder() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Sending reminder...");
        resolve("Reminder sent to user!");
      }, 3000);
    });
  }
  
  (async () => {
    const message = await sendReminder();
    console.log(message);
  })();


let callCount = 0;

async function checkServer() {
  callCount++;
  if (callCount % 2 === 0) {
    return Promise.resolve("Server is running");
  } else {
    return Promise.reject(new Error("Server down"));
  }
}
function monitorServer() {
    const intervalId = setInterval(() => {
      checkServer()
        .then((status) => console.log(status))
        .catch((error) => console.error(error.message));
    }, 5000);
  
    setTimeout(() => {
      clearInterval(intervalId);
      console.log("Stopped monitoring server");
    }, 30000);
  }

  monitorServer();
  async function showNotifications(messages) {
    for (const message of messages) {
      await new Promise((resolve) => {
        setTimeout(() => {
          console.log(`Notification: ${message}`);
          resolve();
        }, 1000);
      });
    }
    console.log("All notifications sent");
  }
  

  const messages = ["Update available", "New message received", "Task due soon"];
  showNotifications(messages);
  async function fetchDataWithRetry() {
    const maxAttempts = 3;
  
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await new Promise((_, reject) =>
          setTimeout(() => reject(new Error("API failure")), 1000)
        );
        return "Data fetched";
      } catch (error) {
        console.log(`Attempt ${attempt} failed: ${error.message}`);
        if (attempt === maxAttempts) {
          console.log("Failed after 3 attempts");
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
  }
  

  (async () => {
    await fetchDataWithRetry();
  })();
  async function launchProduct() {
    return Promise.resolve("Product Launched!");
  }
  
  function startCountdown(n) {
    let count = n;
    const intervalId = setInterval(() => {
      console.log(`Countdown: ${count}`);
      count--;
      if (count < 0) {
        clearInterval(intervalId);
        launchProduct().then((message) => console.log(message));
      }
    }, 1000);
  }
  

  startCountdown(5);