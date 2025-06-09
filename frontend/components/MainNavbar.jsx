// src/components/MainNavbar.jsx
import './MainNavbar.css';

export default function MainNavbar() {
  return (
    <div className="main-navbar">
      <div className="logo">
        <img src="https://www.ecswa.org/wp-content/uploads/2016/03/eastside-christian-school-logo-STANDARD.png" alt="ECS Logo" />
      </div>
      <nav>
        {["KG", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8"].map((grade) => (
          <div className="dropdown" key={grade}>
            <button className="dropbtn">{grade}</button>
            <div className="dropdown-content">
              <a href={`/${grade.toLowerCase().replace(/\s+/g, '')}/english`}>English</a>
              <a href={`/${grade.toLowerCase().replace(/\s+/g, '')}/math`}>Math</a>
              <a href={`/${grade.toLowerCase().replace(/\s+/g, '')}/science`}>Science</a>
              <a href={`/${grade.toLowerCase().replace(/\s+/g, '')}/history`}>History</a>
              <a href={`/${grade.toLowerCase().replace(/\s+/g, '')}/technology`}>Technology</a>
              <a href={`/${grade.toLowerCase().replace(/\s+/g, '')}/art`}>Art</a>
              <a href={`/${grade.toLowerCase().replace(/\s+/g, '')}/pe`}>PE</a>
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}