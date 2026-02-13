import React from 'react';
// import PhotoUpload from './PhotoUpload'; // Will be implemented later

const InventoryItem = ({ item, onChange, onDelete, index }) => {
    const handleChange = (field, value) => {
        onChange(index, { ...item, [field]: value });
    };

    return (
        <div className="inventory-item">
            <div className="item-header">
                <h3>Item {index + 1}</h3>
                <button
                    type="button"
                    onClick={() => onDelete(index)}
                    className="btn-delete"
                    aria-label="Delete item"
                >
                    Remove
                </button>
            </div>

            <div className="form-grid">
                <div className="form-group">
                    <label htmlFor={`desc-${index}`}>Description</label>
                    <input
                        type="text"
                        id={`desc-${index}`}
                        value={item.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        placeholder="e.g. Bed Frame"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor={`qty-${index}`}>Quantity</label>
                    <input
                        type="number"
                        id={`qty-${index}`}
                        value={item.quantity}
                        onChange={(e) => handleChange('quantity', parseInt(e.target.value) || 0)}
                        min="0"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor={`cond-${index}`}>Condition</label>
                    <select
                        id={`cond-${index}`}
                        value={item.condition}
                        onChange={(e) => handleChange('condition', e.target.value)}
                        required
                    >
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Poor">Poor</option>
                        <option value="Damaged">Damaged</option>
                        <option value="Missing">Missing</option>
                    </select>
                </div>

                <div className="form-group full-width">
                    <label htmlFor={`notes-${index}`}>Damage Notes / Remarks</label>
                    <textarea
                        id={`notes-${index}`}
                        value={item.notes}
                        onChange={(e) => handleChange('notes', e.target.value)}
                        placeholder="Describe any damage or issues..."
                        rows={2}
                    />
                </div>
            </div>
        </div>
    );
};

export default InventoryItem;
