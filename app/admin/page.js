"use client";

import { useState, useEffect } from 'react';
import { Building2, Users, ClipboardCheck, AlertCircle, Search, LayoutDashboard } from 'lucide-react';
import styles from './admin.module.css';

export default function AdminDashboard() {
    const [submissions, setSubmissions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const res = await fetch('/api/submissions');
                const data = await res.json();
                setSubmissions(data);
            } catch (error) {
                console.error('Error fetching submissions:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSubmissions();
    }, []);

    const getIssueCount = (items) => {
        return Object.values(items).filter(item => item.condition !== 'Good').length;
    };

    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.logo}>
                    <Building2 size={32} color="#f97316" />
                    <span>ResiCheck</span>
                </div>
                <nav className={styles.nav}>
                    <div className={`${styles.navItem} ${styles.navItemActive}`}>
                        <LayoutDashboard size={20} className="mr-2 inline" />
                        Dashboard
                    </div>
                    <div className={styles.navItem}>
                        <ClipboardCheck size={20} className="mr-2 inline" />
                        Inspections
                    </div>
                    <div className={styles.navItem}>
                        <Users size={20} className="mr-2 inline" />
                        Students
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className={styles.main}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Residence Officer Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search rooms..."
                                className="pl-10 pr-4 py-2 border rounded-full text-sm"
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                        </div>
                    </div>
                </header>

                {/* Stats */}
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Total Inspections</span>
                        <span className={styles.statValue}>{submissions.length}</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Rooms with Issues</span>
                        <span className={styles.statValue}>
                            {submissions.filter(s => getIssueCount(s.items) > 0).length}
                        </span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Pending Repairs</span>
                        <span className={styles.statValue}>
                            {submissions.reduce((acc, s) => acc + getIssueCount(s.items), 0)}
                        </span>
                    </div>
                </div>

                {/* Submissions Table */}
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>Room / Student ID</th>
                                <th className={styles.th}>Date Submitted</th>
                                <th className={styles.th}>Role</th>
                                <th className={styles.th}>Condition</th>
                                <th className={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">Loading submissions...</td>
                                </tr>
                            ) : submissions.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">No submissions found yet.</td>
                                </tr>
                            ) : submissions.map((s) => {
                                const issues = getIssueCount(s.items);
                                return (
                                    <tr key={s.id}>
                                        <td className={styles.td}>
                                            <div className="font-bold">{s.user.userId || 'N/A'}</div>
                                        </td>
                                        <td className={styles.td}>{new Date(s.timestamp).toLocaleDateString()}</td>
                                        <td className={styles.td}>{s.user.role}</td>
                                        <td className={styles.td}>
                                            {issues === 0 ? (
                                                <span className={styles.statusGood}>All Good</span>
                                            ) : (
                                                <span className={styles.statusIssue}>{issues} Issues Found</span>
                                            )}
                                        </td>
                                        <td className={styles.td}>
                                            <button className={styles.viewButton}>View Details</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
