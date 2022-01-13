function sendVisit() {
  fetch(`${process.env.NEXT_PUBLIC_HORU}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ referer: document.referrer }),
  })
}

function sendEvent(title) {
  fetch(`${process.env.NEXT_PUBLIC_HORU}/event`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  })
}

export { sendVisit, sendEvent }
