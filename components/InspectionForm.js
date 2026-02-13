import React, { useState } from 'react';
import InventoryItem from './InventoryItem';
import PhotoUpload from './PhotoUpload';
import SignaturePad from './SignaturePad';

const INITIAL_ITEMS = [
    'Bed Frame',
    'Mattress',
    'Curtain',
    'Study Table',
    'Wardrobe/Closet',
    'Ceiling Fan',
    'Sockets'
];

const InspectionForm = () => {
    const [items, setItems] = useState(INITIAL_ITEMS.map(desc => ({
        description: desc,
        quantity: 1,
        condition: 'Good',
        notes: ''
    })));

    const [photos, setPhotos] = useState([]);
    const [signature, setSignature] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleItemChange = (index, newItem) => {
        const newItems = [...items];
        newItems[index] = newItem;
        setItems(newItems);
    };

    const handleItemDelete = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, {
            description: '',
            quantity: 1,
            condition: 'Good',
            notes: ''
        }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        const formData = {
            items,
            photosCount: photos.length, // Photos are File objects
            signatureData: signature ? 'Present' : 'Missing',
            timestamp: new Date().toISOString()
        };

        console.log('Form Submission:', formData);

        // In a real app we'd upload photos here
        await new Promise(resolve => setTimeout(resolve, 1000));

        alert('Inspection submitted successfully!');
        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="inspection-form">
            <section className="form-section">
                <h2>Room Inventory</h2>
                {items.map((item, index) => (
                    <InventoryItem
                        key={index}
                        index={index}
                        item={item}
                        onChange={handleItemChange}
                        onDelete={handleItemDelete}
                    />
                ))}
                <button type="button" onClick={addItem} className="btn-add-item">
                    + Add Custom Item
                </button>
            </section>

            <section className="form-section">
                <h2>Photo Evidence</h2>
                <p className="section-desc">Upload photos of any damage or general room condition.</p>
                <PhotoUpload photos={photos} onChange={setPhotos} />
            </section>

            <section className="form-section">
                <h2>Authorization</h2>
                <SignaturePad onSave={setSignature} />
                {signature && <p className="sig-preview">Signature Captured</p>}
            </section>

            <div className="form-actions">
                <button
                    type="submit"
                    className="btn-submit"
                    disabled={isSubmitting || !signature}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Inspection'}
                </button>
            </div>
        </form>
    );
};

export default InspectionForm;
