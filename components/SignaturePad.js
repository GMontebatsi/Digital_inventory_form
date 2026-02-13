import React, { useRef, useState, useEffect } from 'react';

const SignaturePad = ({ onSave }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasSignature, setHasSignature] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Set canvas size (could be responsive)
        canvas.width = canvas.parentElement.clientWidth || 300;
        canvas.height = 150;

        const ctx = canvas.getContext('2d');
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000';
    }, []);

    const startDrawing = (e) => {
        setIsDrawing(true);
        draw(e);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        if (canvas) {
            const dataUrl = canvas.toDataURL();
            onSave(dataUrl);
            setHasSignature(true);
        }
        // Reset path
        const ctx = canvasRef.current.getContext('2d');
        ctx.beginPath();
    };

    const draw = (e) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();

        let x, y;
        if (e.type.startsWith('touch')) {
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        } else {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const clearSignature = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setHasSignature(false);
        onSave(null);
    };

    return (
        <div className="signature-pad-container">
            <label>Student Signature</label>
            <div className="canvas-wrapper" style={{ border: '1px solid #ccc', background: '#fff' }}>
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseUp={stopDrawing}
                    onMouseMove={draw}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchEnd={stopDrawing}
                    onTouchMove={draw}
                    style={{ width: '100%', height: '150px', touchAction: 'none' }}
                />
            </div>
            <button
                type="button"
                onClick={clearSignature}
                disabled={!hasSignature}
                className="btn-clear-sig"
            >
                Clear Signature
            </button>
        </div>
    );
};

export default SignaturePad;
