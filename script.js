// Mobile Menu Toggle
document.getElementById('menuBtn').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('active');
});

// Auto-Paste on Focus
const urlInput = document.getElementById('urlInput');
urlInput.addEventListener('focus', async () => {
    try {
        const text = await navigator.clipboard.readText();
        if (text.startsWith('http')) { urlInput.value = text; }
    } catch (err) { console.log('Clipboard permission denied'); }
});

// Form Submission
document.getElementById('dlForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = urlInput.value;
    if (!url) return alert("Please paste a link!");

    alert("Fetching video from: " + url); // Matches your screenshot test

    try {
        // Updated to use the new route from your vercel.json
        const response = await fetch(`/api/info?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Download failed:", error);
    }
});
