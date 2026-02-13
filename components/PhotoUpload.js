import React, { useState, useEffect } from 'react';

const PhotoUpload = ({ photos, onChange }) => {
    const [previews, setPreviews] = useState([]);

    // Cleanup object URLs to avoid memory leaks
    useEffect(() => {
        return () => {
            previews.forEach(url => URL.revokeObjectURL(url));
        };
    }, [previews]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        // In a real app, we'd upload these to a server and get URLs back.
        // For now, we simulate by storing the File objects and creating local previews.
        const newPhotos = [...photos, ...files];
        onChange(newPhotos);

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    const removePhoto = (index) => {
        const newPhotos = photos.filter((_, i) => i !== index);
        onChange(newPhotos);

        URL.revokeObjectURL(previews[index]);
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="photo-upload">
            <label className="upload-btn">
                <span>+ Add Photos</span>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </label>

            <div className="photo-grid">
                {previews.map((src, index) => (
                    <div key={src} className="photo-preview">
                        <img src={src} alt={`Preview ${index}`} />
                        <button
                            type="button"
                            className="btn-remove-photo"
                            onClick={() => removePhoto(index)}
                            aria-label="Remove photo"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
            <p className="help-text">
                {photos.length} photo(s) selected
            </p>
        </div>
    );
};

export default PhotoUpload;
