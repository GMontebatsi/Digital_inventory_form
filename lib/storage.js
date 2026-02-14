import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'submissions.json');

// Initialize the data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

export async function saveSubmission(data) {
    const submissions = await getSubmissions();
    const newSubmission = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...data
    };
    submissions.push(newSubmission);
    fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));
    return newSubmission;
}

export async function getSubmissions() {
    try {
        const fileData = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error('Error reading submissions:', error);
        return [];
    }
}
