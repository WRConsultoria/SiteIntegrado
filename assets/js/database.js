/**
 * database.js
 * Simulates a database using localStorage.
 * Handles Users, Workouts, and Evolution data.
 */

const DB_KEY = 'wr_consultoria_db_v1';

// Initial Seed Data
const INITIAL_DATA = {
    users: [
        {
            id: 'admin',
            name: 'Walmir Rezende',
            email: 'admin@wr.com',
            password: 'admin',
            role: 'admin'
        },
        {
            id: 'student1',
            name: 'Patrícia Picoral',
            email: 'patty@email.com',
            password: '123',
            role: 'student'
        }
    ],
    workouts: {
        'student1': {
            'segunda': {
                title: 'Glúteos + Pernas + Core + Cárdio',
                rest: '40s',
                exercises: [
                    { name: 'Elevação pélvica maquina', sets: '4', reps: '10', video: 'https://youtube.com/shorts/dnkII5OPzzA' },
                    { name: 'Cadeira abdutora', sets: '4', reps: '10', video: 'https://youtube.com/shorts/wBALCvG75fk' },
                    { name: 'Búlgado com DB', sets: '4', reps: '10', video: 'https://youtube.com/shorts/8oW75ab0Rp4' }
                ]
            }
        }
    },
    evolution: {
        'student1': {
            dates: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            weight: [65, 64.5, 64, 63.2, 62.8, 62],
            fat: [28, 27.5, 26.8, 26, 25.2, 24.5],
            muscle: [28, 28.2, 28.5, 28.8, 29, 29.2]
        }
    },
    exerciseLibrary: [
        { id: 'ex1', name: 'Elevação pélvica maquina', video: 'https://youtube.com/shorts/dnkII5OPzzA' },
        { id: 'ex2', name: 'Cadeira abdutora', video: 'https://youtube.com/shorts/wBALCvG75fk' },
        { id: 'ex3', name: 'Búlgado com DB', video: 'https://youtube.com/shorts/8oW75ab0Rp4' },
        { id: 'ex4', name: 'Stiff com DB', video: 'https://youtube.com/shorts/GDvKWauLQvc' },
        { id: 'ex5', name: 'Retrocesso unilateral com DB', video: 'https://youtube.com/shorts/lA_GuvmfXzo' },
        { id: 'ex6', name: 'Prancha baixa', video: 'https://youtube.com/shorts/uxPlAbWFUDs' },
        { id: 'ex7', name: 'Supino máquina', video: 'https://youtube.com/shorts/RILogqbMVzQ' },
        { id: 'ex8', name: 'Crucifixo máquina', video: 'https://youtube.com/shorts/j3Wc3owFIC8' },
        { id: 'ex9', name: 'Flexão de braços', video: 'https://youtube.com/shorts/KBJiQ7h6zjc' },
        { id: 'ex10', name: 'Tríceps na polia com corda', video: 'https://youtube.com/shorts/-QGC1cL6ETE' },
        { id: 'ex11', name: 'Tríceps coice', video: 'https://youtube.com/shorts/lFIqMAK2ItQ' },
        { id: 'ex12', name: 'Abdominal obliquo na máquina', video: 'https://youtube.com/shorts/wUV7P-84o3Q' },
        { id: 'ex13', name: 'Pull Down', video: 'https://youtube.com/shorts/2il9etdee2w' },
        { id: 'ex14', name: 'Remada aberta na máquina', video: 'https://youtube.com/shorts/WQVQ4Sz5r_U' },
        { id: 'ex15', name: 'Remada fechada unilateral', video: 'https://youtube.com/shorts/C2U7EB3G3bk' },
        { id: 'ex16', name: 'Rosca martelo com halteres', video: 'https://youtube.com/shorts/0rRpv6o140o' },
        { id: 'ex17', name: 'Rosca alternada', video: 'https://youtube.com/shorts/ymOxKh5zgAQ' },
        { id: 'ex18', name: 'Abdominal reto na máquina', video: 'https://youtube.com/shorts/6ESV4Z-sI1A' },
        { id: 'ex19', name: 'Agachamento no smith', video: 'https://youtube.com/shorts/OX9EzlaqbWk' },
        { id: 'ex20', name: 'Afundo com DB', video: 'https://youtube.com/shorts/OCm7sly9hCw' },
        { id: 'ex21', name: 'Cadeira extensora', video: 'https://youtube.com/shorts/NoUpsxVMeRU' },
        { id: 'ex22', name: 'Cadeira flexora', video: 'https://youtube.com/shorts/T46yKiz8laY' },
        { id: 'ex23', name: 'Gêmeos', video: 'https://youtube.com/shorts/s5ULY_GFlBs' }
    ]
};

// --- Core Functions ---

function getDB() {
    const data = localStorage.getItem(DB_KEY);
    if (!data) {
        localStorage.setItem(DB_KEY, JSON.stringify(INITIAL_DATA));
        return INITIAL_DATA;
    }
    return JSON.parse(data);
}

function saveDB(data) {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
}

// --- Auth Functions ---

function loginUser(email, password) {
    const db = getDB();
    const user = db.users.find(u => u.email === email && u.password === password);
    if (user) {
        // Simple session storage
        localStorage.setItem('wr_current_user', JSON.stringify(user));
        return user;
    }
    return null;
}

function getCurrentUser() {
    const user = localStorage.getItem('wr_current_user');
    return user ? JSON.parse(user) : null;
}

function logoutUser() {
    localStorage.removeItem('wr_current_user');
}

// --- Workout Functions ---

function getStudentWorkout(studentId, day) {
    const db = getDB();
    if (db.workouts[studentId] && db.workouts[studentId][day]) {
        return db.workouts[studentId][day];
    }
    return null;
}

function saveStudentWorkout(studentId, day, workoutData) {
    const db = getDB();
    if (!db.workouts[studentId]) {
        db.workouts[studentId] = {};
    }
    db.workouts[studentId][day] = workoutData;
    saveDB(db);
}

// --- Evolution Functions ---

function getStudentEvolution(studentId) {
    const db = getDB();
    return db.evolution[studentId] || { dates: [], weight: [], fat: [], muscle: [] };
}

function saveEvolutionEntry(studentId, date, weight, fat, muscle) {
    const db = getDB();
    if (!db.evolution[studentId]) {
        db.evolution[studentId] = { dates: [], weight: [], fat: [], muscle: [] };
    }

    const evo = db.evolution[studentId];
    evo.dates.push(date);
    evo.weight.push(weight);
    evo.fat.push(fat);
    evo.muscle.push(muscle);

    saveDB(db);
}

// --- Admin Functions ---

function getAllStudents() {
    const db = getDB();
    return db.users.filter(u => u.role === 'student');
}

// --- Exercise Library Functions ---

function getExerciseLibrary() {
    const db = getDB();
    return db.exerciseLibrary || [];
}

function addExerciseToLibrary(name, video) {
    const db = getDB();
    if (!db.exerciseLibrary) {
        db.exerciseLibrary = [];
    }
    const newExercise = {
        id: 'ex' + Date.now(),
        name,
        video
    };
    db.exerciseLibrary.push(newExercise);
    saveDB(db);
    return newExercise;
}

function deleteExerciseFromLibrary(id) {
    const db = getDB();
    if (db.exerciseLibrary) {
        db.exerciseLibrary = db.exerciseLibrary.filter(ex => ex.id !== id);
        saveDB(db);
    }
}

// Expose functions globally
window.DB = {
    loginUser,
    getCurrentUser,
    logoutUser,
    getStudentWorkout,
    saveStudentWorkout,
    getStudentEvolution,
    saveEvolutionEntry,
    saveEvolutionEntry,
    getAllStudents,
    getExerciseLibrary,
    addExerciseToLibrary,
    deleteExerciseFromLibrary
};
