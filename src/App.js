import React, { useState, useMemo } from 'react';
import { Search, Trophy, Users, CheckCircle, XCircle } from 'lucide-react';

// --- FEST RESULTS DATA (Parsed from THANAWIYYA.pdf) ---
// This dataset is a cleaned and structured sample from the provided PDF,
// mapping 'Chest No' to 'Ad Number' for searchability.
const ALL_RESULTS = [
  { chestNo: '270', name: 'NIHAL.P', program: 'CRYPTIC CROSSWORD', points: 3, position: '1', team: 'Q', grade: '3' },
  { chestNo: '276', name: 'SHAMMAS V P', program: 'CRYPTIC CROSSWORD', points: 2, position: '2', team: 'Q', grade: '2' },
  { chestNo: '272', name: 'MINHAJ P. K.', program: 'CRYPTIC CROSSWORD', points: 1, position: '3', team: 'J', grade: '1' },
  { chestNo: '267', name: 'RIZWAN', program: 'PROMPT ENGINEERING', points: 3, position: '1', team: 'J', grade: '9' },
  { chestNo: '148', name: 'SHIDIL', program: 'PROMPT ENGINEERING', points: 6, position: '2', team: 'B', grade: '8' },
  { chestNo: '225', name: 'SINAN', program: 'PROMPT ENGINEERING', points: 1, position: '3', team: 'Q', grade: '6' },
  { chestNo: '267', name: 'RIZWAN', program: 'WEB DESIGNING', points: 3, position: '1', team: 'J', grade: '6' },
  { chestNo: '258', name: 'SABITH', program: 'WEB DESIGNING', points: 2, position: '2', team: 'Q', grade: '5' },
  { chestNo: '237', name: 'BISHR', program: 'DIGITAL TYPOGRAPHY MLM', points: 8, position: '1', team: 'B', grade: '5' },
  { chestNo: '225', name: 'SINAN', program: 'DIGITAL TYPOGRAPHY MLM', points: 2, position: '2', team: 'Q', grade: '7' },
  { chestNo: '209', name: 'JASIR', program: 'SCIENCE MASTER', points: 5, position: '2', team: 'F', grade: '3' },
  { chestNo: '214', name: 'AJAS V P', program: 'CARTOON', points: 8, position: '1', team: 'F', grade: '3' },
  { chestNo: '244', name: 'SWALIH P', program: 'CARTOON', points: 5, position: '2', team: 'J', grade: '2' },
  { chestNo: '270', name: 'NIHAL.P', program: 'EXTEMPORE SPEECH MLM', points: 5, position: '2', team: 'Q', grade: '2' },
  { chestNo: '234', name: 'SHIFIN T', program: 'INSPIRING TALK ENG', points: 8, position: '1', team: 'B', grade: '3' },
  { chestNo: '148', name: 'SHIDIL', program: 'MR CRICTIC MLM', points: 8, position: '2', team: 'B', grade: '2' },
  { chestNo: '214', name: 'AJAS V P', program: 'MR CRICTIC MLM', points: 9, position: '1', team: 'Q', grade: '3' },
  { chestNo: '270', name: 'NIHAL.P', program: 'GD ENG', points: 7, position: '2', team: 'Q', grade: '2' },
  { chestNo: '276', name: 'SHAMMAS V P', program: 'SONG COMPOSITION', points: 8, position: '1', team: 'Q', grade: '5' },
  { chestNo: '276', name: 'SHAMMAS V P', program: 'RAP SONG', points: 8, position: '1', team: 'Q', grade: '5' },
  { chestNo: '270', name: 'NIHAL.P', program: 'FEATURE ENG', points: 2, position: '2', team: 'Q', grade: '3' },
  { chestNo: '209', name: 'JASIR', program: 'MAQAMA ARB', points: 1, position: '3', team: 'F', grade: '3' },
  { chestNo: '273', name: 'MARJAN PA', program: 'MAQALA ARB', points: 3, position: '1', team: 'J', grade: '8' },
];

// Map Grade values to colors for visual feedback
const GRADE_MAP = {
    '9': 'bg-red-500',
    '8': 'bg-orange-500',
    '7': 'bg-yellow-500',
    '6': 'bg-lime-500',
    '5': 'bg-green-500',
    '4': 'bg-teal-500',
    '3': 'bg-blue-500',
    '2': 'bg-indigo-500',
    '1': 'bg-purple-500',
};

// Component for displaying the student results
const App = () => {
    const [adNumber, setAdNumber] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // --- Core Logic: Calculate All Student Ranks (Memoized for performance) ---
    const allStudentRanks = useMemo(() => {
        // 1. Group results by student and calculate total points
        const studentTotals = ALL_RESULTS.reduce((acc, result) => {
            if (!acc[result.chestNo]) {
                acc[result.chestNo] = {
                    chestNo: result.chestNo,
                    name: result.name,
                    team: result.team,
                    totalPoints: 0,
                    results: [],
                };
            }
            acc[result.chestNo].totalPoints += result.points;
            acc[result.chestNo].results.push(result);
            return acc;
        }, {});

        // 2. Convert to an array and sort by totalPoints (descending)
        const sortedStudents = Object.values(studentTotals).sort(
            (a, b) => b.totalPoints - a.totalPoints
        );

        // 3. Assign ranks, handling ties (if points are equal, they share the rank)
        let currentRank = 1;
        let rankList = [];

        for (let i = 0; i < sortedStudents.length; i++) {
            const student = sortedStudents[i];
            const previousStudent = sortedStudents[i - 1];

            // If points are the same as the previous student, share the rank.
            if (i > 0 && student.totalPoints === previousStudent.totalPoints) {
                student.rank = previousStudent.rank;
            } else {
                student.rank = currentRank;
            }

            rankList.push(student);
            currentRank++;
        }

        return rankList;
    }, []);

    // --- Search Functionality ---
    const handleSearch = () => {
        setSearchTerm(adNumber.trim());
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Filter the ranked list to find the student and their details
    const studentData = useMemo(() => {
        if (!searchTerm) return null;
        return allStudentRanks.find(s => s.chestNo === searchTerm);
    }, [searchTerm, allStudentRanks]);

    // UI State for display
    const showResults = studentData && studentData.results.length > 0;
    const studentName = studentData?.name || '';
    const studentTeam = studentData?.team || '';
    const studentRank = studentData?.rank;
    const studentTotalPoints = studentData?.totalPoints;


    return (
        <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4">
            <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 md:p-8">
                {/* Header */}
                <header className="text-center mb-8">
                    <Trophy className="mx-auto w-12 h-12 text-indigo-600 mb-2" />
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Fest Results Portal
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Search your results by Admission Number (Chest No).
                    </p>
                </header>

                {/* Search Input */}
                <div className="flex space-x-2 mb-8">
                    <input
                        type="text"
                        placeholder="Enter Ad Number (e.g., 270)"
                        value={adNumber}
                        onChange={(e) => setAdNumber(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-grow p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                        aria-label="Student Admission Number"
                    />
                    <button
                        onClick={handleSearch}
                        className="p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md flex items-center justify-center"
                    >
                        <Search className="w-5 h-5" />
                        <span className="ml-2 hidden sm:inline">Search</span>
                    </button>
                </div>

                {/* Result Display Area */}
                <main>
                    {searchTerm && !studentData && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl flex items-center" role="alert">
                            <XCircle className="w-5 h-5 mr-2"/>
                            <span className="block sm:inline font-medium">
                                No student found with Ad Number: <span className="font-bold">{searchTerm}</span>. Please check the number.
                            </span>
                        </div>
                    )}

                    {showResults && (
                        <>
                            {/* Student Summary Card */}
                            <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-xl shadow-inner mb-6">
                                <div className="flex justify-between items-center mb-4 border-b border-indigo-200 pb-3">
                                    <h2 className="text-xl font-bold text-indigo-800 flex items-center">
                                        <Users className="w-5 h-5 mr-2"/>
                                        {studentName} ({studentTeam})
                                    </h2>
                                    <span className="text-sm font-medium text-indigo-600">
                                        Ad No: **{searchTerm}**
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div className="p-3 bg-white rounded-lg shadow-sm border border-indigo-300">
                                        <p className="text-3xl font-extrabold text-indigo-600">
                                            {studentTotalPoints}
                                        </p>
                                        <p className="text-sm text-gray-500 font-medium">Total Points</p>
                                    </div>
                                    <div className="p-3 bg-white rounded-lg shadow-sm border border-indigo-300">
                                        <p className="text-3xl font-extrabold text-yellow-600 flex justify-center items-center">
                                            {studentRank}
                                            <Trophy className="w-5 h-5 ml-2 fill-yellow-400 text-yellow-400"/>
                                        </p>
                                        <p className="text-sm text-gray-500 font-medium">Overall Rank</p>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Results List */}
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                                Program Results ({studentData.results.length})
                            </h3>
                            <div className="space-y-3">
                                {studentData.results.map((result, index) => (
                                    <div key={index} className="flex items-center justify-between bg-white p-4 border border-gray-200 rounded-lg shadow-sm transition duration-150 hover:shadow-md">
                                        <div className="flex flex-col text-left overflow-hidden">
                                            <p className="font-medium text-gray-900 truncate">
                                                {result.program}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                <span className="font-semibold">Position:</span> {result.position}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-3 flex-shrink-0">
                                            {/* Grade Display */}
                                            {result.grade && (
                                                <div className={`p-1.5 rounded-full text-white text-xs font-bold w-7 h-7 flex items-center justify-center ${GRADE_MAP[result.grade] || 'bg-gray-400'}`}>
                                                    G{result.grade}
                                                </div>
                                            )}
                                            {/* Points Display */}
                                            <div className="text-lg font-bold text-indigo-600 min-w-[50px] text-right">
                                                +{result.points}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default App;

