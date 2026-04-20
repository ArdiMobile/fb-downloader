document.getElementById('dlForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevents page reload
    
    const urlInput = document.getElementById('urlInput');
    const btn = e.target.querySelector('button');
    const videoUrl = urlInput.value.trim();

    if (!videoUrl) return alert("Please paste a Facebook link!");

    // Show loading state
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    try {
        // Fetch from the endpoint defined in vercel.json
        const res = await fetch(`/api/info?url=${encodeURIComponent(videoUrl)}`);
        const data = await res.json();

        if (data.status === "success" && data.download_url) {
            // Success! Create a hidden link to trigger the actual download
            const a = document.createElement('a');
            a.href = data.download_url;
            a.download = `${data.title || 'video'}.mp4`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            alert("Download started!");
        } else {
            alert("Error: " + (data.message || "Could not find video link"));
        }
    } catch (err) {
        console.error(err);
        alert("Connection error. Check your Vercel deployment logs.");
    } finally {
        btn.innerHTML = '<i class="fas fa-search"></i>';
    }
});
