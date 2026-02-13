"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Building2, UserCircle } from 'lucide-react';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('student');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!userId) return;

    setIsLoading(true);
    // Simulate login delay
    setTimeout(() => {
      localStorage.setItem('inventory_user', JSON.stringify({ userId, role }));
      router.push('/inventory');
    }, 800);
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <Card className={styles.loginCard}>
        <CardHeader className={styles.header}>
          <div className={styles.iconWrapper}>
            <Building2 size={32} className={styles.icon} />
          </div>
          <CardTitle>University Residence</CardTitle>
          <CardDescription>Digital Inventory & Inspection</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className={styles.content}>
            <div className={styles.formGroup}>
              <label className={styles.label}>User ID / Student Number</label>
              <div className={styles.inputWrapper}>
                <UserCircle className={styles.inputIcon} size={18} />
                <Input
                  placeholder="Enter your ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className={styles.inputWithIcon}
                  required
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Role</label>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="student">Student</option>
                <option value="staff">Staff / Inspector</option>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              fullWidth
              disabled={isLoading || !userId}
            >
              {isLoading ? 'Accessing System...' : 'Access Inventory Form'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
