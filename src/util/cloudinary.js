import axios from "axios";
import { clpudinary_name, cloudinary_upload_preset } from "../constant";

export const cloudinaryUploadFile = async (file) => {
    // Upload the file to Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinary_upload_preset);


    const response = await fetch(`https://api.cloudinary.com/v1_1/${clpudinary_name}/image/upload`, {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        const result = await response.json();
        // Set the Cloudinary URL to the selectedImage state
        return (result.secure_url);
    }
};


export const cloudinaryMiltifilesUpload = async (files) => {
    const urls = []

    const uploaderPromise = () => new Promise((resolve, reject) => {
        files.forEach(async (file, index) => {
            // Initial FormData
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", cloudinary_upload_preset); // Replace the preset name with your own

            // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
            await axios.post(`https://api.cloudinary.com/v1_1/${clpudinary_name}/image/upload`, formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(response => {
                const data = response.data;// You should store this URL for future references in your app
                urls.push(data.secure_url);
                console.log(data.secure_url);

                if (index === files.length - 1) {
                    resolve()
                }
            }).catch((error) => {
                console.log(error);
                reject(error)
            })
        });
    })

    await uploaderPromise().catch((error) => {
        throw new Error(error)
    });

    return urls;
}

