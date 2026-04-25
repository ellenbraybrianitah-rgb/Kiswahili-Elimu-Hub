import express from 'express';

const router = express.Router();

// Mock database
let progressData: Array<{ studentId: string, progress: number }> = [];

// GET method to retrieve student progress
router.get('/:studentId', (req, res) => {
    const { studentId } = req.params;
    const studentProgress = progressData.find(progress => progress.studentId === studentId);

    if (studentProgress) {
        return res.status(200).json(studentProgress);
    } else {
        return res.status(404).json({ message: 'Progress not found for the given student ID.' });
    }
});

// POST method to update or create student progress
router.post('/', (req, res) => {
    const { studentId, progress } = req.body;

    if (!studentId || progress == null) {
        return res.status(400).json({ message: 'Student ID and progress are required.' });
    }

    const existingProgress = progressData.find(p => p.studentId === studentId);

    if (existingProgress) {
        existingProgress.progress = progress;
        return res.status(200).json({ message: 'Progress updated successfully.', progress: existingProgress });
    } else {
        progressData.push({ studentId, progress });
        return res.status(201).json({ message: 'Progress created successfully.', progress: { studentId, progress } });
    }
});

export default router;