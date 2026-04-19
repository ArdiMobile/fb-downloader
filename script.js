document.getElementById('dlForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const urlInput = document.getElementById('urlInput');
    const url = urlInput.value.trim();

    if (!url) return alert("Please paste a Facebook link!");

    // Show loading state
    alert("Fetching video data...");

    try {
        // This MUST match your vercel.json source path
        const response = await fetch(`/api/info?url=${encodeURIComponent(url)}`);
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        console.log("Server Response:", data);

        if (data.status === "success") {
            // Logic to handle the download goes here
            alert("Success! Server received: " + data.received_url);
        } else {
            alert("Server Error: " + data.message);
        }
    } catch (error) {
        console.error("Fetch error:", error);
        alert("Fetching video error. Check connection.");
    }
});
