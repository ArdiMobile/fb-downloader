const dlForm = document.getElementById('dlForm');
const urlInput = document.getElementById('urlInput');
const preview = document.getElementById('preview');

dlForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const url = urlInput.value.trim();
    if (!url) return alert("Paste a link");

    preview.innerHTML = "Loading...";

    try {
        const res = await fetch(`/api/info?url=${encodeURIComponent(url)}`);
        const data = await res.json();

        if (data.status !== "success") {
            preview.innerHTML = `<p style="color:red">${data.message}</p>`;
            return;
        }

        // VIDEO PLAYER + GREEN PLAY BUTTON
        const firstVideo = data.formats[0]?.url;

        let formatButtons = data.formats.map(f => `
            <a href="${f.url}" target="_blank"
               style="display:block;margin:5px 0;padding:10px;
               background:#1877f2;color:#fff;border-radius:6px;text-decoration:none;">
               Download ${f.quality}
            </a>
        `).join("");

        preview.innerHTML = `
            <div style="background:#fff;padding:20px;border-radius:15px;">

                <div style="position:relative;">
                    <video controls style="width:100%;border-radius:10px;">
                        <source src="${firstVideo}">
                    </video>

                    <!-- GREEN PLAY OVERLAY -->
                    <div style="
                        position:absolute;
                        top:50%;
                        left:50%;
                        transform:translate(-50%,-50%);
                        background:#00c853;
                        width:70px;
                        height:70px;
                        border-radius:50%;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        font-size:30px;
                        color:white;
                        pointer-events:none;
                    ">
                        ▶
                    </div>
                </div>

                <h3>${data.title}</h3>

                <div>${formatButtons}</div>

                <button onclick="resetDownloader()" 
                    style="margin-top:15px;padding:10px 20px;
                    border:none;background:#333;color:#fff;border-radius:8px;">
                    Download Another Video
                </button>
            </div>
        `;

    } catch (err) {
        preview.innerHTML = "Error loading video";
    }
});

// RESET FUNCTION
function resetDownloader() {
    preview.innerHTML = "";
    urlInput.value = "";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}