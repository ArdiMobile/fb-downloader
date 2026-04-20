const urlInput = document.getElementById('urlInput');

// 1. AUTO-PASTE
urlInput.addEventListener('focus', async () => {
    try {
        const text = await navigator.clipboard.readText();
        if (text.includes("facebook.com")) {
            urlInput.value = text;
        }
    } catch (err) { console.log("Clipboard access blocked"); }
});

// 2. DOWNLOAD FETCH
document.getElementById('dlForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const videoUrl = urlInput.value.trim();
    if (!videoUrl) return alert("Please paste a link!");

    alert("Fetching video...");

    try {
        // Must match the source in vercel.json
        const response = await fetch(`/api/info?url=${encodeURIComponent(videoUrl)}`);
        const data = await response.json();
        
        if (data.status === "success") {
            alert("Success! Backend received: " + data.received_url);
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        alert("Fetching video error. Check your Vercel logs.");
    }
});
