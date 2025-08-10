const User = require("../models/User");
const Quiz = require("../models/Quiz");
const Score = require("../models/Score");
const Question = require("../models/Question");
const asyncWrapper = require('../middleware/async');

// Helper function to convert score strings (including fractions) to numbers
const parseScore = (scoreStr) => {
    if (typeof scoreStr === 'number') return scoreStr;
    if (typeof scoreStr !== 'string') return 0;

    // Check if it's a fraction (e.g., "3/5")
    if (scoreStr.includes('/')) {
        const [numerator, denominator] = scoreStr.split('/').map(Number);
        return denominator !== 0 ? (numerator / denominator) * 100 : 0; // Convert to percentage
    }

    // Try to parse as regular number
    const parsed = parseFloat(scoreStr);
    return isNaN(parsed) ? 0 : parsed;
};

const dashboardTotal = asyncWrapper(async (req, res, next) => {
    try {
        // Get total counts
        const totalUsers = await User.countDocuments({});
        const totalStudents = await User.countDocuments({ role: "student" });
        const totalTeachers = await User.countDocuments({ role: "teacher" });
        const totalQuizzes = await Quiz.countDocuments({});
        const totalQuestions = await Question.countDocuments({});
        const totalScores = await Score.countDocuments({});

        // Get all scores and calculate statistics manually to handle fractions
        const allScores = await Score.find({}, 'score');
        const parsedScores = allScores.map(s => parseScore(s.score)).filter(score => score > 0);

        const scoreStatistics = {
            totalScore: parsedScores.reduce((sum, score) => sum + score, 0),
            averageScore: parsedScores.length > 0 ? parsedScores.reduce((sum, score) => sum + score, 0) / parsedScores.length : 0,
            highestScore: parsedScores.length > 0 ? Math.max(...parsedScores) : 0,
            lowestScore: parsedScores.length > 0 ? Math.min(...parsedScores) : 0,
            count: parsedScores.length
        };

        // Get recent activity (last 10 scores)
        const recentScores = await Score.find({})
            .populate('studentId', 'firstName lastName email')
            .populate('quizId', 'quizname')
            .sort({ _id: -1 })
            .limit(10);

        // Get quiz statistics - simplified to avoid aggregation issues
        const quizzes = await Quiz.find({})
            .populate('owner', 'firstName lastName')
            .lean();

        const quizStats = [];
        for (const quiz of quizzes.slice(0, 5)) {
            const scores = await Score.find({ quizId: quiz._id });
            const parsedQuizScores = scores.map(s => parseScore(s.score)).filter(score => score > 0);

            quizStats.push({
                _id: quiz._id,
                quizname: quiz.quizname,
                quizdescription: quiz.quizdescription,
                owner: quiz.owner,
                attemptCount: scores.length,
                averageScore: parsedQuizScores.length > 0 ?
                    Math.round((parsedQuizScores.reduce((sum, score) => sum + score, 0) / parsedQuizScores.length) * 100) / 100 : 0,
                questionCount: Array.isArray(quiz.questions) ? quiz.questions.length : 0
            });
        }

        // Sort by attempt count
        quizStats.sort((a, b) => b.attemptCount - a.attemptCount);

        // Get top performing students - simplified approach
        const students = await User.find({ role: 'student' }, 'firstName lastName email').lean();
        const topStudents = [];

        for (const student of students.slice(0, 10)) {
            const studentScores = await Score.find({ studentId: student._id });
            const parsedStudentScores = studentScores.map(s => parseScore(s.score)).filter(score => score > 0);

            if (parsedStudentScores.length > 0) {
                const averageScore = parsedStudentScores.reduce((sum, score) => sum + score, 0) / parsedStudentScores.length;
                topStudents.push({
                    _id: student._id,
                    studentName: `${student.firstName} ${student.lastName}`,
                    email: student.email,
                    averageScore: Math.round(averageScore * 100) / 100,
                    totalAttempts: studentScores.length,
                    bestScore: Math.max(...parsedStudentScores)
                });
            }
        }

        // Sort by average score
        topStudents.sort((a, b) => b.averageScore - a.averageScore);
        const top5Students = topStudents.slice(0, 5);

        // Prepare response data
        const dashboardData = {
            overview: {
                totalUsers,
                totalStudents,
                totalTeachers,
                totalQuizzes,
                totalQuestions,
                totalAttempts: totalScores
            },
            scoreStatistics: {
                totalScore: Math.round(scoreStatistics.totalScore),
                averageScore: Math.round(scoreStatistics.averageScore * 100) / 100,
                highestScore: scoreStatistics.highestScore,
                lowestScore: scoreStatistics.lowestScore,
                totalValidScores: scoreStatistics.count
            },
            recentActivity: recentScores,
            popularQuizzes: quizStats,
            topStudents: top5Students
        };

        res.status(200).json({
            success: true,
            data: dashboardData
        });

    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard data',
            error: error.message
        });
    }
})

module.exports = {
    dashboardTotal
};
