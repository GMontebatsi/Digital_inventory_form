"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { InventoryForm } from '@/components/InventoryForm';
import { LogOut, Building2 } from 'lucide-react';
import styles from './page.module.css';

export default function InventoryPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('inventory_user');
        if (!storedUser) {
            router.push('/');
            return;
        }
        setUser(JSON.parse(storedUser));
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('inventory_user');
        router.push('/');
    };

    if (!user) return null;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={`container ${styles.headerContent}`}>
                    <div className={styles.logo}>
                        <Building2 size={24} />
                        <span>ResiCheck</span>
                    </div>
                    <div className={styles.userInfo}>
                        <span className="text-sm">
                            Logged in as <strong>{user.userId}</strong> ({user.role})
                        </span>
                        <Button variant="ghost" size="sm" onClick={handleLogout}>
                            <LogOut size={16} className="mr-2" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </header>

            <main className={`container ${styles.main}`}>
                <div className={styles.welcomeSection}>
                    <h1 className={styles.welcomeTitle}>Room Inventory Check</h1>
                    <p className={styles.welcomeText}>
                        Please inspect all items in your room and report their condition.
                    </p>
                </div>

                <InventoryForm />
            </main>
        </div>
    );
}
