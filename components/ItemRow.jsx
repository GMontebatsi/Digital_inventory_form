import React, { useRef } from 'react';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Camera, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import styles from './ItemRow.module.css';

export const ItemRow = ({ item, value, onChange }) => {
    const fileInputRef = useRef(null);

    const handleConditionChange = (e) => {
        onChange({ ...value, condition: e.target.value });
    };

    const handleNotesChange = (e) => {
        onChange({ ...value, notes: e.target.value });
    };

    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files);
        // Convert to Base64 for demo
        Promise.all(files.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        })).then(images => {
            onChange({ ...value, photos: [...(value.photos || []), ...images] });
        });
    };

    const needsDetails = value.condition !== 'Good';

    return (
        <div className={styles.row}>
            <div className={styles.header}>
                <div className={styles.info}>
                    <span className={styles.name}>{item.name}</span>
                    <span className={styles.quantity}>Qty: {item.quantity}</span>
                </div>
                <div className={styles.controls}>
                    <Select
                        value={value.condition}
                        onChange={handleConditionChange}
                        className={cn(styles.conditionSelect, {
                            'border-red-500': value.condition === 'Damaged' || value.condition === 'Missing',
                            'border-yellow-500': value.condition === 'Poor' || value.condition === 'Fair'
                        })}
                    >
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Poor">Poor</option>
                        <option value="Damaged">Damaged</option>
                        <option value="Missing">Missing</option>
                    </Select>
                </div>
            </div>

            {needsDetails && (
                <div className={styles.details}>
                    <Textarea
                        placeholder="Describe the damage or issue..."
                        value={value.notes}
                        onChange={handleNotesChange}
                    />
                    <div className={styles.photoUpload}>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handlePhotoUpload}
                        />
                        <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                            <Camera size={16} className="mr-2" />
                            Add Photos
                        </Button>
                        <span className="text-xs text-muted-foreground">
                            {value.photos?.length || 0} photos attached
                        </span>
                    </div>
                    {value.photos?.length > 0 && (
                        <div className={styles.preview}>
                            {value.photos.map((src, i) => (
                                <img key={i} src={src} alt="Damage preview" className={styles.thumb} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
