"use client";

import React, { useState } from 'react';
import { ItemRow } from './ItemRow';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import styles from './InventoryForm.module.css';
import { Save, CheckCircle } from 'lucide-react';

const INITIAL_ITEMS = [
    { id: 'bed', name: 'Single bed frame', quantity: 1 },
    { id: 'mattress', name: 'Mattress', quantity: 1 },
    { id: 'curtain', name: 'Curtain', quantity: 1 },
    { id: 'desk', name: 'Study table', quantity: 1 },
    { id: 'wardrobe', name: 'Wardrobe/Closet', quantity: 1 },
    { id: 'fan', name: 'Ceiling fan', quantity: 1 },
    { id: 'sockets', name: 'Sockets', quantity: 4 },
];

export const InventoryForm = () => {
    const [formState, setFormState] = useState(
        INITIAL_ITEMS.reduce((acc, item) => ({
            ...acc,
            [item.id]: { condition: 'Good', notes: '', photos: [] }
        }), {})
    );

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleItemChange = (id, newState) => {
        setFormState(prev => ({
            ...prev,
            [id]: newState
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const user = JSON.parse(localStorage.getItem('inventory_user') || '{}');
            const submissionData = {
                user,
                items: formState,
            };

            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            });

            if (response.ok) {
                console.log('Form Submitted Successfully');
                setIsSuccess(true);
            } else {
                alert('Submission failed. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please check your connection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <Card className="text-center p-8">
                <CardContent className="flex flex-col items-center gap-4">
                    <CheckCircle className="text-green-500 w-16 h-16" />
                    <h2 className="text-2xl font-bold">Inspection Submitted!</h2>
                    <p className="text-muted-foreground">Thank you for completing the room inventory form.</p>
                    <Button onClick={() => window.location.reload()}>Start New Inspection</Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Room Items</h3>
                {INITIAL_ITEMS.map(item => (
                    <ItemRow
                        key={item.id}
                        item={item}
                        value={formState[item.id]}
                        onChange={(newState) => handleItemChange(item.id, newState)}
                    />
                ))}
            </div>

            <div className={styles.signatureSection}>
                <h3 className={styles.sectionTitle}>Declaration</h3>
                <p className="text-sm text-muted-foreground mt-2 mb-4">
                    I confirm that the above inventory accurately reflects the condition of the room and its contents at the time of inspection.
                </p>
                <div className={styles.signatureCanvas}>
                    {/* Canvas implementation placeholder - simpler for now just a checkbox or button */}
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        Feature: Signature Pad (Click to Sign)
                    </div>
                </div>
            </div>

            <div className={styles.actions}>
                <Button variant="outline" type="button">Save Draft</Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Inspection'}
                    {!isSubmitting && <Save size={16} className="ml-2" />}
                </Button>
            </div>
        </form>
    );
};
