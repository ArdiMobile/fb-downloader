document.getElementById('dlForm').addEventListener('submit', async (e) => {
    e.preventDefault(); 
    
    const urlInput = document.getElementById('urlInput');
    const btn = e.target.querySelector('button');
    const videoUrl = urlInput.value.trim();

    if (!videoUrl) return alert("Please paste a Facebook link!");

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    try {
        // Calling the API route defined in your vercel.json
        const res = await fetch(`/api/info?url=${encodeURIComponent(videoUrl)}`);
        const data = await res.json();

        // FIX: We check for "download_url" to match the Python code above
        if (data.status === "success" && data.download_url) {
            const a = document.createElement('a');
            a.href = data.download_url;
            a.download = `${data.title || 'video'}.mp4`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            alert("Download started!");
        } else {
            alert("Server Error: " + (data.message || "Video link not found"));
        }
    } catch (err) {
        alert("Connection error. Ensure your Vercel deployment is 'Ready'.");
    } finally {
        btn.innerHTML = '<i class="fas fa-search"></i>';
    }
});
