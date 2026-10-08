/**
 * Switch tabs between Adobe Illustrator and Adobe Photoshop portfolio grids
 */
function switchTab(tab) {
    const illGal = document.getElementById('gallery-illustrator');
    const psGal = document.getElementById('gallery-photoshop');
    const illBtn = document.getElementById('tab-illustrator');
    const psBtn = document.getElementById('tab-photoshop');

    if (tab === 'illustrator') {
        illGal.classList.remove('hidden');
        psGal.classList.add('hidden');
        illBtn.className = "px-6 py-2.5 rounded-xl font-semibold border transition border-sky-500 bg-sky-500 text-white shadow-lg shadow-sky-500/20";
        psBtn.className = "px-6 py-2.5 rounded-xl font-semibold border border-slate-700 bg-slate-800 text-slate-300 hover:border-sky-500 transition";
    } else {
        psGal.classList.remove('hidden');
        illGal.classList.add('hidden');
        psBtn.className = "px-6 py-2.5 rounded-xl font-semibold border transition border-sky-500 bg-sky-500 text-white shadow-lg shadow-sky-500/20";
        illBtn.className = "px-6 py-2.5 rounded-xl font-semibold border border-slate-700 bg-slate-800 text-slate-300 hover:border-sky-500 transition";
    }
}

/**
 * Universal PDF Modal Controls (removes editing toolbar & shrinks to fit screen)
 */
function openPdfModal(pdfPath, title) {
    document.getElementById('pdfTitle').innerText = title;
    
    // Add parameters to disable browser editing toolbar and force shrink-to-fit view
    const cleanPdfUrl = pdfPath + "#toolbar=0&navpanes=0&view=FitH";
    document.getElementById('pdfFrame').src = cleanPdfUrl;
    
    document.getElementById('pdfModal').classList.remove('hidden');
}

function closePdfModal() {
    document.getElementById('pdfModal').classList.add('hidden');
    document.getElementById('pdfFrame').src = '';
}

/**
 * Profile Picture Lightbox Modal Controls (Shrink to fit responsive)
 */
function openImageModal(imgSrc) {
    document.getElementById('imageModalSrc').src = imgSrc;
    document.getElementById('imageModal').classList.remove('hidden');
}

function closeImageModal() {
    document.getElementById('imageModal').classList.add('hidden');
    document.getElementById('imageModalSrc').src = '';
}

// Close modals when pressing the Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closePdfModal();
        closeImageModal();
    }
});

// Click on profile picture to enlarge
document.addEventListener('DOMContentLoaded', function () {
    const profileImg = document.querySelector('.profile-pic');
    if (profileImg) {
        profileImg.addEventListener('click', function () {
            openImageModal(this.src);
        });
    }
});
// Add or replace at the bottom of js/main.js
function openPdfModal(pdfPath, title) {
    window.open(pdfPath, '_blank');
}