async function handleDownload() {
  try {
    setStatus("Fetching video from URL...");

    const res = await fetch("/api/index", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: input.value })
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    setStatus("Done!");
    console.log(data.video);

  } catch (err) {
    setStatus("Error: " + err.message);
    console.error(err);
  }
}