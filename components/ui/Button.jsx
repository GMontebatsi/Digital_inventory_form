import React from 'react';
import { cn } from '@/lib/utils';
import styles from './Button.module.css';

export const Button = React.forwardRef(({ className, variant = "primary", size = "default", fullWidth, ...props }, ref) => {
    return (
        <button
            className={cn(
                styles.button,
                styles[variant],
                fullWidth && styles.full,
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Button.displayName = "Button";
