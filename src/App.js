import React, { useState, useMemo } from 'react';
import { Search, Trophy, Users, CheckCircle, XCircle } from 'lucide-react';

// --- FEST RESULTS DATA (Provided JSON) ---
const ALL_RESULTS = [
  {
    "Name of Program": "CRYPTIC CROSSWORD",
    "Section": "THANAWIYYAH",
    "Position": 1,
    "Chest Number": 270,
    "Grade": "",
    "Name of Student": "NIHAL.P",
    "Team Code": "Q",
    "Class": 6,
    "Position Point": 3,
    "Grade Point": "",
    "Total Points": 3
  },
  {
    "Name of Program": "CRYPTIC CROSSWORD",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 276,
    "Grade": "",
    "Name of Student": "SHAMMAS V P",
    "Team Code": "Q",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": "",
    "Total Points": 2
  },
  {
    "Name of Program": "CRYPTIC CROSSWORD",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 272,
    "Grade": "",
    "Name of Student": "MINHAJ  P. K.",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": "",
    "Total Points": 1
  },
  {
    "Name of Program": "PROMPT ENGINEERING",
    "Section": "THANAWIYYAH",
    "Position": 1,
    "Chest Number": 267,
    "Grade": "A",
    "Name of Student": "RIZWAN",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 3,
    "Grade Point": 6,
    "Total Points": 9
  },
  {
    "Name of Program": "PROMPT ENGINEERING",
    "Section": "THANAWIYYAH",
    "Position": "",
    "Chest Number": 362,
    "Grade": "A",
    "Name of Student": "MINHAJ",
    "Team Code": "Q",
    "Class": 6,
    "Position Point": "",
    "Grade Point": 6,
    "Total Points": 6
  },
  {
    "Name of Program": "WEB DESIGNING",
    "Section": "THANAWIYYAH",
    "Position": 1,
    "Chest Number": 267,
    "Grade": "B",
    "Name of Student": "RIZWAN",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 3,
    "Grade Point": 3,
    "Total Points": 6
  },
  {
    "Name of Program": "WEB DESIGNING",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 258,
    "Grade": "B",
    "Name of Student": "SABITH",
    "Team Code": "Q",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": 3,
    "Total Points": 5
  },
  {
    "Name of Program": "WEB DESIGNING",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 269,
    "Grade": "",
    "Name of Student": "ARSHAD",
    "Team Code": "B",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": "",
    "Total Points": 1
  },
  {
    "Name of Program": "DIGITAL TYPOGRAPHY MLM",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 248,
    "Grade": "B",
    "Name of Student": "HADHI",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": 3,
    "Total Points": 4
  },
  {
    "Name of Program": "GK TALENT",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 278,
    "Grade": "B",
    "Name of Student": "NAFIH",
    "Team Code": "F",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": 3,
    "Total Points": 5
  },
  {
    "Name of Program": "GK TALENT",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 265,
    "Grade": "B",
    "Name of Student": "ASHRAF ALI",
    "Team Code": "B",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": 3,
    "Total Points": 4
  },
  {
    "Name of Program": "GK TALENT",
    "Section": "THANAWIYYAH",
    "Position": "",
    "Chest Number": 270,
    "Grade": "B",
    "Name of Student": "NIHAL.P",
    "Team Code": "Q",
    "Class": 6,
    "Position Point": "",
    "Grade Point": 3,
    "Total Points": 3
  },
  {
    "Name of Program": "SCIENCE MASTER",
    "Section": "THANAWIYYAH",
    "Position": 1,
    "Chest Number": 278,
    "Grade": "B",
    "Name of Student": "NAFIH",
    "Team Code": "F",
    "Class": 6,
    "Position Point": 3,
    "Grade Point": 3,
    "Total Points": 6
  },
  {
    "Name of Program": "SCIENCE MASTER",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 265,
    "Grade": "B",
    "Name of Student": "ASHRAF ALI",
    "Team Code": "B",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": 3,
    "Total Points": 4
  },
  {
    "Name of Program": "MANIPULATION POSTER DIGI",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 245,
    "Grade": "A",
    "Name of Student": "SINAN",
    "Team Code": "B",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": 5,
    "Total Points": 6
  },
  {
    "Name of Program": "QIRATH",
    "Section": "THANAWIYYAH",
    "Position": 1,
    "Chest Number": 244,
    "Grade": "B",
    "Name of Student": "SWALIH P",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 3,
    "Grade Point": 3,
    "Total Points": 6
  },
  {
    "Name of Program": "QIRATH",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 271,
    "Grade": "B",
    "Name of Student": "VAJID C",
    "Team Code": "F",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": 3,
    "Total Points": 4
  },
  {
    "Name of Program": "TRANSLATION TRILINGUAL",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 265,
    "Grade": "",
    "Name of Student": "ASHRAF ALI",
    "Team Code": "B",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": "",
    "Total Points": 1
  },
  {
    "Name of Program": "CARTOON",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 244,
    "Grade": "B",
    "Name of Student": "SWALIH P",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": 3,
    "Total Points": 5
  },
  {
    "Name of Program": "CARTOON",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 269,
    "Grade": "B",
    "Name of Student": "ARSHAD",
    "Team Code": "B",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": 3,
    "Total Points": 4
  },
  {
    "Name of Program": "CARTOON",
    "Section": "THANAWIYYAH",
    "Position": "",
    "Chest Number": 260,
    "Grade": "B",
    "Name of Student": "IRFAN AP",
    "Team Code": "B",
    "Class": 6,
    "Position Point": "",
    "Grade Point": 3,
    "Total Points": 3
  },
  {
    "Name of Program": "FACE TO FACE ARB",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 273,
    "Grade": "B",
    "Name of Student": "MARJAN P A   &",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": 4,
    "Total Points": 5
  },
  {
    "Name of Program": "FACE TO FACE URD",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 257,
    "Grade": "B",
    "Name of Student": "RIFAHI P & TEA",
    "Team Code": "F",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": 4,
    "Total Points": 5
  },
  {
    "Name of Program": "TEACHING",
    "Section": "THANAWIYYAH",
    "Position": 1,
    "Chest Number": 270,
    "Grade": "B",
    "Name of Student": "NIHAL.P",
    "Team Code": "Q",
    "Class": 6,
    "Position Point": 3,
    "Grade Point": 3,
    "Total Points": 6
  },
  {
    "Name of Program": "KAVIYARANG",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 258,
    "Grade": "",
    "Name of Student": "SABITH",
    "Team Code": "Q",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": "",
    "Total Points": 1
  },
  {
    "Name of Program": "MULTILINGUAL QUIZ",
    "Section": "THANAWIYYAH",
    "Position": 1,
    "Chest Number": 273,
    "Grade": "B",
    "Name of Student": "MARJAN P A",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 3,
    "Grade Point": 3,
    "Total Points": 6
  },
  {
    "Name of Program": "MAQALA MLM",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 248,
    "Grade": "B",
    "Name of Student": "HADHI",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": 3,
    "Total Points": 5
  },
  {
    "Name of Program": "MAQALA MLM",
    "Section": "THANAWIYYAH",
    "Position": "",
    "Chest Number": 271,
    "Grade": "B",
    "Name of Student": "VAJID C",
    "Team Code": "F",
    "Class": 6,
    "Position Point": "",
    "Grade Point": 3,
    "Total Points": 3
  },
  {
    "Name of Program": "QISSA QASIRA MLM",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 258,
    "Grade": "B",
    "Name of Student": "SABITH",
    "Team Code": "Q",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": 3,
    "Total Points": 4
  },
  {
    "Name of Program": "QISSA QASIRA MLM",
    "Section": "THANAWIYYAH",
    "Position": "",
    "Chest Number": 271,
    "Grade": "B",
    "Name of Student": "VAJID C",
    "Team Code": "F",
    "Class": 6,
    "Position Point": "",
    "Grade Point": 3,
    "Total Points": 3
  },
  {
    "Name of Program": "QISSA QASIRA MLM",
    "Section": "THANAWIYYAH",
    "Position": "",
    "Chest Number": 248,
    "Grade": "B",
    "Name of Student": "HADHI",
    "Team Code": "J",
    "Class": 6,
    "Position Point": "",
    "Grade Point": 3,
    "Total Points": 3
  },
  {
    "Name of Program": "EXTEMPORE SPEECH MLM",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 270,
    "Grade": "B",
    "Name of Student": "NIHAL.P",
    "Team Code": "Q",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": 3,
    "Total Points": 5
  },
  {
    "Name of Program": "INSPIRING TALK ENG",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 267,
    "Grade": "B",
    "Name of Student": "RIZWAN",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": 3,
    "Total Points": 5
  },
  {
    "Name of Program": "INSPIRING TALK ENG",
    "Section": "THANAWIYYAH",
    "Position": "",
    "Chest Number": 272,
    "Grade": "B",
    "Name of Student": "MINHAJ  P. K.",
    "Team Code": "J",
    "Class": 6,
    "Position Point": "",
    "Grade Point": 3,
    "Total Points": 3
  },
  {
    "Name of Program": "QISSA QASIRA ARB",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 276,
    "Grade": "",
    "Name of Student": "SHAMMAS V P",
    "Team Code": "Q",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": "",
    "Total Points": 2
  },
  {
    "Name of Program": "MR CRICTIC MLM",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 258,
    "Grade": "A",
    "Name of Student": "SABITH",
    "Team Code": "Q",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": 6,
    "Total Points": 7
  },
  {
    "Name of Program": "MR CRICTIC MLM",
    "Section": "THANAWIYYAH",
    "Position": "",
    "Chest Number": 244,
    "Grade": "A",
    "Name of Student": "SWALIH P",
    "Team Code": "J",
    "Class": 6,
    "Position Point": "",
    "Grade Point": 6,
    "Total Points": 6
  },
  {
    "Name of Program": "MR CRICTIC MLM",
    "Section": "THANAWIYYAH",
    "Position": "",
    "Chest Number": 271,
    "Grade": "B",
    "Name of Student": "VAJID C",
    "Team Code": "F",
    "Class": 6,
    "Position Point": "",
    "Grade Point": 4,
    "Total Points": 4
  },
  {
    "Name of Program": "MR CRICTIC MLM",
    "Section": "THANAWIYYAH",
    "Position": "",
    "Chest Number": 248,
    "Grade": "B",
    "Name of Student": "HADHI",
    "Team Code": "J",
    "Class": 6,
    "Position Point": "",
    "Grade Point": 4,
    "Total Points": 4
  },
  {
    "Name of Program": "CALLIGRAPHY",
    "Section": "THANAWIYYAH",
    "Position": 1,
    "Chest Number": 244,
    "Grade": "A",
    "Name of Student": "SWALIH P",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 3,
    "Grade Point": 5,
    "Total Points": 8
  },
  {
    "Name of Program": "CALLIGRAPHY",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 269,
    "Grade": "A",
    "Name of Student": "ARSHAD",
    "Team Code": "B",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": 5,
    "Total Points": 7
  },
  {
    "Name of Program": "CALLIGRAPHY",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 362,
    "Grade": "B",
    "Name of Student": "MINHAJ",
    "Team Code": "Q",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": 3,
    "Total Points": 4
  },
  {
    "Name of Program": "ANNOUNCMENT",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 245,
    "Grade": "B",
    "Name of Student": "SINAN",
    "Team Code": "B",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": 3,
    "Total Points": 5
  },
  {
    "Name of Program": "ANNOUNCMENT",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 244,
    "Grade": "B",
    "Name of Student": "SWALIH P",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": 3,
    "Total Points": 4
  },
  {
    "Name of Program": "ANNOUNCMENT",
    "Section": "THANAWIYYAH",
    "Position": "",
    "Chest Number": 257,
    "Grade": "B",
    "Name of Student": "RIFAHI P",
    "Team Code": "F",
    "Class": 6,
    "Position Point": "",
    "Grade Point": 3,
    "Total Points": 3
  },
  {
    "Name of Program": "ANNOUNCMENT",
    "Section": "THANAWIYYAH",
    "Position": "",
    "Chest Number": 251,
    "Grade": "C",
    "Name of Student": "JALAL",
    "Team Code": "Q",
    "Class": 6,
    "Position Point": "",
    "Grade Point": -1,
    "Total Points": -1
  },
  {
    "Name of Program": "NASHEED ARB",
    "Section": "THANAWIYYAH",
    "Position": 1,
    "Chest Number": 245,
    "Grade": "B",
    "Name of Student": "SINAN",
    "Team Code": "B",
    "Class": 6,
    "Position Point": 3,
    "Grade Point": 3,
    "Total Points": 6
  },
  {
    "Name of Program": "NASHEED ARB",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 276,
    "Grade": "B",
    "Name of Student": "SHAMMAS V P",
    "Team Code": "Q",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": 3,
    "Total Points": 5
  },
  {
    "Name of Program": "NASHEED ARB",
    "Section": "THANAWIYYAH",
    "Position": "",
    "Chest Number": 244,
    "Grade": "B",
    "Name of Student": "SWALIH P",
    "Team Code": "J",
    "Class": 6,
    "Position Point": "",
    "Grade Point": 3,
    "Total Points": 3
  },
  {
    "Name of Program": "SONG COMPOSITION & RECIT",
    "Section": "THANAWIYYAH",
    "Position": 1,
    "Chest Number": 276,
    "Grade": "A",
    "Name of Student": "SHAMMAS V P",
    "Team Code": "Q",
    "Class": 6,
    "Position Point": 3,
    "Grade Point": 5,
    "Total Points": 8
  },
  {
    "Name of Program": "SONG COMPOSITION & RECIT",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 252,
    "Grade": "B",
    "Name of Student": "NAEEM",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": 3,
    "Total Points": 5
  },
  {
    "Name of Program": "GD ENG",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 270,
    "Grade": "A",
    "Name of Student": "NIHAL.P",
    "Team Code": "Q",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": 5,
    "Total Points": 7
  },
  {
    "Name of Program": "GD ENG",
    "Section": "THANAWIYYAH",
    "Position": "",
    "Chest Number": 272,
    "Grade": "B",
    "Name of Student": "MINHAJ  P. K.",
    "Team Code": "J",
    "Class": 6,
    "Position Point": "",
    "Grade Point": 3,
    "Total Points": 3
  },
  {
    "Name of Program": "GD ENG",
    "Section": "THANAWIYYAH",
    "Position": "",
    "Chest Number": 267,
    "Grade": "B",
    "Name of Student": "RIZWAN",
    "Team Code": "J",
    "Class": 6,
    "Position Point": "",
    "Grade Point": 3,
    "Total Points": 3
  },
  {
    "Name of Program": "ḤIFẒ",
    "Section": "THANAWIYYAH",
    "Position": 1,
    "Chest Number": 273,
    "Grade": "B",
    "Name of Student": "MARJAN P A",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 3,
    "Grade Point": 3,
    "Total Points": 6
  },
  {
    "Name of Program": "ḤIFẒ",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 253,
    "Grade": "B",
    "Name of Student": "LABEEB. T",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": 3,
    "Total Points": 5
  },
  {
    "Name of Program": "ḤIFẒ",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 271,
    "Grade": "",
    "Name of Student": "VAJID C",
    "Team Code": "F",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": "",
    "Total Points": 1
  },
  {
    "Name of Program": "SPEECH URD",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 253,
    "Grade": "B",
    "Name of Student": "LABEEB. T",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": 3,
    "Total Points": 4
  },
  {
    "Name of Program": "ALFIYA CONTEST",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 265,
    "Grade": "B",
    "Name of Student": "ASHRAF ALI",
    "Team Code": "B",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": 3,
    "Total Points": 5
  },
  {
    "Name of Program": "ALFIYA CONTEST",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 273,
    "Grade": "B",
    "Name of Student": "MARJAN P A",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": 3,
    "Total Points": 4
  },
  {
    "Name of Program": "NEWS WRITING ENG",
    "Section": "THANAWIYYAH",
    "Position": 1,
    "Chest Number": 272,
    "Grade": "B",
    "Name of Student": "MINHAJ  P. K.",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 3,
    "Grade Point": 3,
    "Total Points": 6
  },
  {
    "Name of Program": "NEWS WRITING ENG",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 270,
    "Grade": "",
    "Name of Student": "NIHAL.P",
    "Team Code": "Q",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": "",
    "Total Points": 1
  },
  {
    "Name of Program": "MAQALA  URD",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 249,
    "Grade": "",
    "Name of Student": "HISHAM",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": "",
    "Total Points": 1
  },
  {
    "Name of Program": "REVERSE QUIZ",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 244,
    "Grade": "",
    "Name of Student": "SWALIH P",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": "",
    "Total Points": 2
  },
  {
    "Name of Program": "NEWS WRITING URD",
    "Section": "THANAWIYYAH",
    "Position": 1,
    "Chest Number": 249,
    "Grade": "B",
    "Name of Student": "HISHAM",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 3,
    "Grade Point": 3,
    "Total Points": 6
  },
  {
    "Name of Program": "RAP SONG",
    "Section": "THANAWIYYAH",
    "Position": 1,
    "Chest Number": 276,
    "Grade": "A",
    "Name of Student": "SHAMMAS V P",
    "Team Code": "Q",
    "Class": 6,
    "Position Point": 3,
    "Grade Point": 5,
    "Total Points": 8
  },
  {
    "Name of Program": "RAP SONG",
    "Section": "THANAWIYYAH",
    "Position": "",
    "Chest Number": 259,
    "Grade": "B",
    "Name of Student": "JABIR E C",
    "Team Code": "J",
    "Class": 6,
    "Position Point": "",
    "Grade Point": 3,
    "Total Points": 3
  },
  {
    "Name of Program": "RAP SONG",
    "Section": "THANAWIYYAH",
    "Position": "",
    "Chest Number": 252,
    "Grade": "B",
    "Name of Student": "NAEEM",
    "Team Code": "J",
    "Class": 6,
    "Position Point": "",
    "Grade Point": 3,
    "Total Points": 3
  },
  {
    "Name of Program": "RAP SONG",
    "Section": "THANAWIYYAH",
    "Position": "",
    "Chest Number": 362,
    "Grade": "B",
    "Name of Student": "MINHAJ",
    "Team Code": "Q",
    "Class": 6,
    "Position Point": "",
    "Grade Point": 3,
    "Total Points": 3
  },
  {
    "Name of Program": "RAP SONG",
    "Section": "THANAWIYYAH",
    "Position": "",
    "Chest Number": 266,
    "Grade": "B",
    "Name of Student": "JASEEM",
    "Team Code": "B",
    "Class": 6,
    "Position Point": "",
    "Grade Point": 3,
    "Total Points": 3
  },
  {
    "Name of Program": "DOCUMENTARY NARRATION E",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 270,
    "Grade": "B",
    "Name of Student": "NIHAL.P",
    "Team Code": "Q",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": 4,
    "Total Points": 6
  },
  {
    "Name of Program": "TAḤLĪL AL-ʿIBĀRAH",
    "Section": "THANAWIYYAH",
    "Position": 1,
    "Chest Number": 253,
    "Grade": "A",
    "Name of Student": "LABEEB. T",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 3,
    "Grade Point": 5,
    "Total Points": 8
  },
  {
    "Name of Program": "TAḤLĪL AL-ʿIBĀRAH",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 273,
    "Grade": "A",
    "Name of Student": "MARJAN P A",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": 5,
    "Total Points": 7
  },
  {
    "Name of Program": "TAḤLĪL AL-ʿIBĀRAH",
    "Section": "THANAWIYYAH",
    "Position": "",
    "Chest Number": 265,
    "Grade": "B",
    "Name of Student": "ASHRAF ALI",
    "Team Code": "B",
    "Class": 6,
    "Position Point": "",
    "Grade Point": 3,
    "Total Points": 3
  },
  {
    "Name of Program": "MAQALA ARB",
    "Section": "THANAWIYYAH",
    "Position": 1,
    "Chest Number": 273,
    "Grade": "A",
    "Name of Student": "MARJAN P A",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 3,
    "Grade Point": 5,
    "Total Points": 8
  },
  {
    "Name of Program": "MAQALA ARB",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 253,
    "Grade": "B",
    "Name of Student": "LABEEB. T",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": 3,
    "Total Points": 5
  },
  {
    "Name of Program": "MAQALA ARB",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 245,
    "Grade": "B",
    "Name of Student": "SINAN",
    "Team Code": "B",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": 3,
    "Total Points": 4
  },
  {
    "Name of Program": "MAQALA ARB",
    "Section": "THANAWIYYAH",
    "Position": "",
    "Chest Number": 269,
    "Grade": "B",
    "Name of Student": "ARSHAD",
    "Team Code": "B",
    "Class": 6,
    "Position Point": "",
    "Grade Point": 3,
    "Total Points": 3
  },
  {
    "Name of Program": "QARD AL SHI'R ARB",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 269,
    "Grade": "B",
    "Name of Student": "ARSHAD",
    "Team Code": "B",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": 3,
    "Total Points": 5
  },
  {
    "Name of Program": "QARD AL SHI'R ARB",
    "Section": "THANAWIYYAH",
    "Position": "",
    "Chest Number": 273,
    "Grade": "B",
    "Name of Student": "MARJAN P A",
    "Team Code": "J",
    "Class": 6,
    "Position Point": "",
    "Grade Point": 3,
    "Total Points": 3
  },
  {
    "Name of Program": "QISSA QASIRA URD",
    "Section": "THANAWIYYAH",
    "Position": 1,
    "Chest Number": 249,
    "Grade": "B",
    "Name of Student": "HISHAM",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 3,
    "Grade Point": 3,
    "Total Points": 6
  },
  {
    "Name of Program": "QISSA QASIRA URD",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 257,
    "Grade": "B",
    "Name of Student": "RIFAHI P",
    "Team Code": "F",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": 3,
    "Total Points": 4
  },
  {
    "Name of Program": "QARD AL SHI'R URD",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 249,
    "Grade": "",
    "Name of Student": "HISHAM",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": "",
    "Total Points": 2
  },
  {
    "Name of Program": "GAZAL",
    "Section": "THANAWIYYAH",
    "Position": 1,
    "Chest Number": 252,
    "Grade": "A",
    "Name of Student": "NAEEM",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 3,
    "Grade Point": 5,
    "Total Points": 8
  },
  {
    "Name of Program": "GAZAL",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 248,
    "Grade": "",
    "Name of Student": "HADHI",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": "",
    "Total Points": 1
  },
  {
    "Name of Program": "GAZAL",
    "Section": "THANAWIYYAH",
    "Position": "",
    "Chest Number": 260,
    "Grade": "C",
    "Name of Student": "IRFAN AP",
    "Team Code": "B",
    "Class": 6,
    "Position Point": "",
    "Grade Point": -1,
    "Total Points": -1
  },
  {
    "Name of Program": "NEWS WRITING ARB",
    "Section": "THANAWIYYAH",
    "Position": 1,
    "Chest Number": 273,
    "Grade": "B",
    "Name of Student": "MARJAN P A",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 3,
    "Grade Point": 3,
    "Total Points": 6
  },
  {
    "Name of Program": "NEWS WRITING ARB",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 253,
    "Grade": "B",
    "Name of Student": "LABEEB. T",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": 3,
    "Total Points": 5
  },
  {
    "Name of Program": "MAQĀMA ARB",
    "Section": "THANAWIYYAH",
    "Position": 1,
    "Chest Number": 273,
    "Grade": "B",
    "Name of Student": "MARJAN P A",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 3,
    "Grade Point": 3,
    "Total Points": 6
  },
  {
    "Name of Program": "PROS TO POETRY ENG",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 272,
    "Grade": "B",
    "Name of Student": "MINHAJ  P. K.",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": 3,
    "Total Points": 5
  },
  {
    "Name of Program": "PROS TO POETRY ENG",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 276,
    "Grade": "",
    "Name of Student": "SHAMMAS V P",
    "Team Code": "Q",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": "",
    "Total Points": 1
  },
  {
    "Name of Program": "FEATURE ENG",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 270,
    "Grade": "B",
    "Name of Student": "NIHAL.P",
    "Team Code": "Q",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": 3,
    "Total Points": 5
  },
  {
    "Name of Program": "QISSA QASIRA ENG",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 253,
    "Grade": "",
    "Name of Student": "LABEEB. T",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": "",
    "Total Points": 1
  },
  {
    "Name of Program": "SPEECH ARB",
    "Section": "THANAWIYYAH",
    "Position": 1,
    "Chest Number": 271,
    "Grade": "A",
    "Name of Student": "VAJID C",
    "Team Code": "F",
    "Class": 6,
    "Position Point": 3,
    "Grade Point": 5,
    "Total Points": 8
  },
  {
    "Name of Program": "SPEECH ARB",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 273,
    "Grade": "A",
    "Name of Student": "MARJAN P A",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": 5,
    "Total Points": 6
  },
  {
    "Name of Program": "SPEECH ARB",
    "Section": "THANAWIYYAH",
    "Position": "",
    "Chest Number": 245,
    "Grade": "B",
    "Name of Student": "SINAN",
    "Team Code": "B",
    "Class": 6,
    "Position Point": "",
    "Grade Point": 3,
    "Total Points": 3
  },
  {
    "Name of Program": "HADEES MUSĀBAQA",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 278,
    "Grade": "",
    "Name of Student": "NAFIH",
    "Team Code": "F",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": "",
    "Total Points": 1
  },
  {
    "Name of Program": "TECH TANGLE",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 489,
    "Grade": "B",
    "Name of Student": "SANAD",
    "Team Code": "F",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": 4,
    "Total Points": 6
  },
  {
    "Name of Program": "MAQALA ENG",
    "Section": "THANAWIYYAH",
    "Position": 1,
    "Chest Number": 267,
    "Grade": "B",
    "Name of Student": "RIZWAN",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 3,
    "Grade Point": 3,
    "Total Points": 6
  },
  {
    "Name of Program": "MAQALA ENG",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 258,
    "Grade": "B",
    "Name of Student": "SABITH",
    "Team Code": "Q",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": 3,
    "Total Points": 5
  },
  {
    "Name of Program": "MAQALA ENG",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 272,
    "Grade": "B",
    "Name of Student": "MINHAJ  P. K.",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": 3,
    "Total Points": 4
  },
  {
    "Name of Program": "PROS TO POETRY MLM",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 258,
    "Grade": "A",
    "Name of Student": "SABITH",
    "Team Code": "Q",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": 5,
    "Total Points": 7
  },
  {
    "Name of Program": "PROS TO POETRY MLM",
    "Section": "THANAWIYYAH",
    "Position": 3,
    "Chest Number": 248,
    "Grade": "B",
    "Name of Student": "HADHI",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 1,
    "Grade Point": 3,
    "Total Points": 4
  },
  {
    "Name of Program": "PROS TO POETRY MLM",
    "Section": "THANAWIYYAH",
    "Position": "",
    "Chest Number": 252,
    "Grade": "B",
    "Name of Student": "NAEEM",
    "Team Code": "J",
    "Class": 6,
    "Position Point": "",
    "Grade Point": 3,
    "Total Points": 3
  },
  {
    "Name of Program": "G D MALAYALAM",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 248,
    "Grade": "B",
    "Name of Student": "HADHI",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": 3,
    "Total Points": 5
  },
  {
    "Name of Program": "WAʿẒ",
    "Section": "THANAWIYYAH",
    "Position": 1,
    "Chest Number": 271,
    "Grade": "A",
    "Name of Student": "VAJID C",
    "Team Code": "F",
    "Class": 6,
    "Position Point": 3,
    "Grade Point": 5,
    "Total Points": 8
  },
  {
    "Name of Program": "WAʿẒ",
    "Section": "THANAWIYYAH",
    "Position": 2,
    "Chest Number": 244,
    "Grade": "B",
    "Name of Student": "SWALIH P",
    "Team Code": "J",
    "Class": 6,
    "Position Point": 2,
    "Grade Point": 3,
    "Total Points": 5
  },
  {
    "Name of Program": "",
    "Section": "",
    "Position": "",
    "Chest Number": "",
    "Grade": "",
    "Name of Student": "",
    "Team Code": "",
    "Class": "",
    "Position Point": "",
    "Grade Point": "",
    "Total Points": ""
  },
  {
    "Name of Program": "",
    "Section": "",
    "Position": "",
    "Chest Number": "",
    "Grade": "",
    "Name of Student": "",
    "Team Code": "",
    "Class": "",
    "Position Point": "",
    "Grade Point": "",
    "Total Points": ""
  },
  {
    "Name of Program": "",
    "Section": "",
    "Position": "",
    "Chest Number": "",
    "Grade": "",
    "Name of Student": "",
    "Team Code": "",
    "Class": "",
    "Position Point": "",
    "Grade Point": "",
    "Total Points": ""
  },
  {
    "Name of Program": "",
    "Section": "",
    "Position": "",
    "Chest Number": "",
    "Grade": "",
    "Name of Student": "",
    "Team Code": "",
    "Class": "",
    "Position Point": "",
    "Grade Point": "",
    "Total Points": ""
  },
  {
    "Name of Program": "",
    "Section": "",
    "Position": "",
    "Chest Number": "",
    "Grade": "",
    "Name of Student": "",
    "Team Code": "",
    "Class": "",
    "Position Point": "",
    "Grade Point": "",
    "Total Points": ""
  },
  {
    "Name of Program": "",
    "Section": "",
    "Position": "",
    "Chest Number": "",
    "Grade": "",
    "Name of Student": "",
    "Team Code": "",
    "Class": "",
    "Position Point": "",
    "Grade Point": "",
    "Total Points": ""
  },
  {
    "Name of Program": "",
    "Section": "",
    "Position": "",
    "Chest Number": "",
    "Grade": "",
    "Name of Student": "",
    "Team Code": "",
    "Class": "",
    "Position Point": "",
    "Grade Point": "",
    "Total Points": ""
  },
  {
    "Name of Program": "",
    "Section": "",
    "Position": "",
    "Chest Number": "",
    "Grade": "",
    "Name of Student": "",
    "Team Code": "",
    "Class": "",
    "Position Point": "",
    "Grade Point": "",
    "Total Points": ""
  }
];

// Map Grade values to colors for visual feedback
const GRADE_MAP = {
    'A': 'bg-green-600',
    'B': 'bg-blue-600',
    'C': 'bg-red-600',
    '': 'bg-gray-400', // For empty/unspecified grade
};

// Component for displaying the student results
const App = () => {
    const [adNumber, setAdNumber] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // --- Core Logic: Calculate All Student Ranks (Memoized for performance) ---
    const allStudentRanks = useMemo(() => {
        // 1. Group results by student and calculate total points
        const studentTotals = ALL_RESULTS.reduce((acc, result) => {
            // Use 'Chest Number' as the unique ID/Ad Number
            const chestNo = String(result['Chest Number']);

            if (!acc[chestNo]) {
                acc[chestNo] = {
                    chestNo: chestNo,
                    name: result['Name of Student'],
                    team: result['Team Code'],
                    totalPoints: 0,
                    results: [],
                };
            }
            // Sum the 'Total Points' from the event results
            acc[chestNo].totalPoints += result['Total Points'];
            acc[chestNo].results.push(result);
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
        // Ensure search term is a string
        setSearchTerm(String(adNumber).trim());
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
                        Search your results by **Ad Number** (Chest No).
                    </p>
                </header>

                {/* Search Input */}
                <div className="flex space-x-2 mb-8">
                    <input
                        type="number" // Use number type for Ad Number (Chest No)
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
                                        {studentName} (<span className='font-mono'>{studentTeam || 'N/A'}</span>)
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
                                        <p className="text-sm text-gray-500 font-medium">Overall Points</p>
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
                                                {result['Name of Program']}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                <span className="font-semibold">Position:</span> {result['Position']}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-3 flex-shrink-0">
                                            {/* Grade Display */}
                                            {result['Grade'] && (
                                                <div className={`p-1.5 rounded-full text-white text-xs font-bold w-7 h-7 flex items-center justify-center ${GRADE_MAP[result['Grade']] || 'bg-gray-400'}`}>
                                                    {result['Grade']}
                                                </div>
                                            )}
                                            {/* Points Display */}
                                            <div className="text-lg font-bold text-indigo-600 min-w-[50px] text-right">
                                                +{result['Total Points']}
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
