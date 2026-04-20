document.getElementById('dlForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const urlInput = document.getElementById('urlInput');
    const btn = e.target.querySelector('button');
    const originalBtn = btn.innerHTML;

    if (!urlInput.value) return alert("Paste a link first!");

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; // Loading state

    try {
        const res = await fetch(`/api/info?url=${encodeURIComponent(urlInput.value)}`);
        const data = await res.json();

        if (data.status === "success") {
            // Create a hidden link and click it to start the download
            const a = document.createElement('a');
            a.href = data.download_url;
            a.download = `${data.title}.mp4`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            alert("Download started!");
        } else {
            alert("Error: " + data.message);
        }
    } catch (err) {
        alert("Connection error. Check Vercel logs.");
    } finally {
        btn.innerHTML = originalBtn;
    }
});
