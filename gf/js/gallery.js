// Vent til siden er færdig med at loade
document.addEventListener('DOMContentLoaded', function () {
    // Finder det store billede og alle de små billeder
    const galleryMainImage = document.getElementById('gallery-main-image');
    const thumbnailButtons = document.querySelectorAll('.thumbnail-button');

    // Sætter det første billede som standard når siden loader
    if (thumbnailButtons.length > 0 && galleryMainImage) {
        const firstThumbnail = thumbnailButtons[0];
        const firstImageSrc = firstThumbnail.getAttribute('data-image');

        if (firstImageSrc) {
            galleryMainImage.src = firstImageSrc;
            // Marker det første billede som aktivt
            firstThumbnail.classList.add('active');
        }
    }

    // Gør alle de små billeder klikbare
    thumbnailButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Få billedets sti
            const imageSrc = this.getAttribute('data-image');

            if (imageSrc && galleryMainImage) {
                // Skift det store billede til det man klikker på
                galleryMainImage.src = imageSrc;

                // Fjern markering fra alle billeder
                thumbnailButtons.forEach(function (btn) {
                    btn.classList.remove('active');
                });

                // Marker det billede man klikkede på
                this.classList.add('active');
            }
        });
    });
});
