
export const cloudinaryUploadFile = async (file) => {

    // Upload the file to Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'qvwhpboq');

    const response = await fetch('https://api.cloudinary.com/v1_1/dgbujfxvt/image/upload', {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        const result = await response.json();

        // Set the Cloudinary URL to the selectedImage state
        return (result.secure_url);
    }
};

