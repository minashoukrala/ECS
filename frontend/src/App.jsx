import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArtKG from '../pages/kg/Art';
import EnglishKG from '../pages/kg/English';
import TopBar from '../components/TopBar';
import MainNavbar from '../components/MainNavbar';

// Page component for each subject
function SubjectPage({ grade, subject }) {
  return (
    <div className="page-container">
      <h1>{subject} - {grade}</h1>
      <p>This is the {subject} page for {grade}.</p>
    </div>
  );
}

function App() {
  const grades = ['kg', 'grade1', 'grade2', 'grade3', 'grade4', 'grade5', 'grade6', 'grade7', 'grade8'];
  const subjects = ['english', 'math', 'science', 'history', 'technology', 'art', 'pe'];

  return (
    <Router>
      <TopBar />
      <MainNavbar />
      <Routes>
        <Route path="/kg/art" element={<ArtKG />} />
        <Route path="/kg/english" element={<EnglishKG />} />
        {grades.map(grade =>
          subjects.map(subject => (
            <Route
              key={`${grade}-${subject}`}
              path={`/${grade}/${subject}`}
              element={<SubjectPage grade={grade} subject={subject} />}
            />
          ))
        )}
      </Routes>
    </Router>
  );
}

export default App;