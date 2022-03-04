function sendVisit() {
  fetch(`${process.env.NEXT_PUBLIC_HORU}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ referer: document.referrer }),
  })
}

export default sendVisit
