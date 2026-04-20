const dlForm = document.getElementById('dlForm');
const urlInput = document.getElementById('urlInput');
const preview = document.getElementById('preview');

// AUTO-PASTE
urlInput.addEventListener('focus', async () => {
    try {
        const text = await navigator.clipboard.readText();
        if (text.includes("facebook.com")) {
            urlInput.value = text;
        }
    } catch (err) {
        console.log("Clipboard blocked");
    }
});

// SUBMIT
dlForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const videoUrl = urlInput.value.trim();
    if (!videoUrl) {
        alert("Paste a link first!");
        return;
    }

    const btn = dlForm.querySelector('button');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    preview.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(`/api/info?url=${encodeURIComponent(videoUrl)}`);
        const data = await response.json();

        console.log(data);

        if (data.status === "success") {
            preview.innerHTML = `
                <div style="background:#fff;padding:15px;border-radius:12px;margin-top:20px;">
                    <img src="${data.thumbnail || 'https://via.placeholder.com/500'}" 
                         style="width:100%;border-radius:10px;">
                    
                    <h3 style="margin-top:10px;">${data.title}</h3>

                    <a href="${data.download_url}" target="_blank"
                       style="display:inline-block;margin-top:10px;padding:10px 20px;
                       background:#2d6df6;color:white;border-radius:8px;text-decoration:none;">
                       Download Video
                    </a>
                </div>
            `;
        } else {
            preview.innerHTML = `<p style="color:red;">${data.message}</p>`;
        }

    } catch (error) {
        console.error(error);
        preview.innerHTML = `<p style="color:red;">Connection error</p>`;
    } finally {
        btn.innerHTML = '<i class="fas fa-search"></i>';
    }
});