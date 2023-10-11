if(typeof window !== 'undefined'){
  const refreshTimer = document.getElementById('refresh-timer');
  const refreshStart = document.getElementById('refresh-start');
  const refreshQRCOde = document.getElementById('refresh-qr-code');
  // const axios = require('axios')

  let timerInSeconds = 10;

  setInterval(() => {
    timerInSeconds -= 1;

    refreshTimer.innerHTML = `Refreshing page in: ${timerInSeconds} seconds`;
    refreshStart.innerHTML = ''

    if (timerInSeconds < 1 ) {
      window.location.reload ()
      window.onload = async () => {
        console.log("THIS IS CLIENT SIDE !!!");
        refreshStart.innerHTML = 'This Is The Begining'
      //   // Example usage:
      //   // const qrCodeFetch = await axios.get(
      //   //   process.env.BASE_URL+'/movies/generate-qr-code'
      //   // )
      //   // refreshQRCOde.src = qrCodeFetch?.data.data
      //   // console.log('fetch QR Code', qrCodeFetch);
      }
    }
  }, 1000);
  console.log("THIS IS CLIENT SIDE");
} else {
  console.log("THIS IS SERVER SIDE");
}
