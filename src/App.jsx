// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LandingPage from './pages/LandingPage';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Documentation from './pages/Documentation';
// import CaseStudies from './pages/CaseStudies';
// import ResearchPapers from './pages/ResearchPapers';
// import Support from './pages/Support';
// import AboutProject from './pages/AboutProject';
// import Dashboard from './pages/Dashboard'
// import Blog from './pages/Blog';
// import { ResearchTeam, Publications, Contact, Imprint } from './pages/RemainingPages';
// import './styles/navbar.css';
// import './styles/hero.css';
// import './styles/features.css';
// import './styles/footer.css';
// import './styles/landing.css';
// import './styles/auth.css';
// import './styles/pages.css';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/documentation" element={<Documentation />} />
//          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
//           <Route path="/case-studies" element={<CaseStudies />} />
//           <Route path="/research-papers" element={<ResearchPapers />} />
//           <Route path="/support" element={<Support />} />
//           <Route path="/about-project" element={<AboutProject />} />
//           <Route path="/research-team" element={<ResearchTeam />} />
//           <Route path="/blog" element={<Blog />} />
//           <Route path="/publications" element={<Publications />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/imprint" element={<Imprint />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Documentation from './pages/Documentation';
import CaseStudies from './pages/CaseStudies';
import ResearchPapers from './pages/ResearchPapers';
import Support from './pages/Support';
import AboutProject from './pages/AboutProject';
import Blog from './pages/Blog';
import ExperimentList from './pages/ExperimentList';
import CreateExperiment from './pages/CreateExperiment';
import { ResearchTeam, Publications, Contact, Imprint } from './pages/RemainingPages';
import './styles/navbar.css';
import './styles/hero.css';
import './styles/features.css';
import './styles/footer.css';
import './styles/landing.css';
import './styles/auth.css';
import './styles/pages.css';
import './styles/experiments.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/documentation" element={<Documentation />} />
       
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/research-papers" element={<ResearchPapers />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about-project" element={<AboutProject />} />
          <Route path="/research-team" element={<ResearchTeam />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/imprint" element={<Imprint />} />
          <Route path="/experiments" element={<ExperimentList />} />
          <Route path="/create-experiment" element={<CreateExperiment />} />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
