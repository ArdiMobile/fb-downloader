// This connects the button to the Vercel backend
document.getElementById('dlForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.getElementById('urlInput').value.trim();
    
    if (!url) return alert("Please paste a Facebook link!");

    try {
        // MUST use /api/info as defined in your vercel.json rewrite
        const response = await fetch(`/api/info?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (data.status === "success") {
            alert("Connection successful! Server received your link.");
            console.log("Backend response:", data);
        } else {
            alert("Backend Error: " + data.message);
        }
    } catch (error) {
        console.error("Fetch error:", error);
        alert("Error fetching video. Check your Vercel deployment logs.");
    }
});
