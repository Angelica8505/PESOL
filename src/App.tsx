import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { BookmarkProvider } from './contexts/BookmarkContext';
import { ToastProvider } from './contexts/ToastContext';
import { Tooltip } from 'react-tooltip';
import PageLoader from './components/UI/PageLoader';

// Pages - Lazy loaded
const Landing = React.lazy(() => import('./pages/Landing'));
const EmployerLanding = React.lazy(() => import('./pages/Employer/Landing'));
const AdminLanding = React.lazy(() => import('./pages/Admin/Landing'));

// Applicant authentication pages
const ApplicantLogin = React.lazy(() => import('./pages/Applicant/Login'));
const ApplicantRegister = React.lazy(() => import('./pages/Applicant/Register'));

// Employer authentication pages
const EmployerLogin = React.lazy(() => import('./pages/Employer/Login'));
const EmployerRegister = React.lazy(() => import('./pages/Employer/Register'));

// Admin/PESO authentication pages
const AdminLogin = React.lazy(() => import('./pages/Admin/Login'));
const AdminRegister = React.lazy(() => import('./pages/Admin/Register'));

const ApplicantDashboard = React.lazy(() => import('./pages/Applicant/Dashboard'));
const ApplicantLayout = React.lazy(() => import('./components/Layout/ApplicantLayout'));
const JobSearch = React.lazy(() => import('./pages/Applicant/JobSearch'));
const Forum = React.lazy(() => import('./pages/Applicant/Forum'));
const ProfilePage = React.lazy(() => import('./pages/Applicant/Profile'));
const SavedJobs = React.lazy(() => import('./pages/Applicant/SavedJobs'));
const Applications = React.lazy(() => import('./pages/Applicant/Applications'));
const ApplicantCareerPath = React.lazy(() => import('./pages/Applicant/CareerPath'));
const ApplicantMessages = React.lazy(() => import('./pages/Applicant/Messages'));
const ApplicantAIRoadmap = React.lazy(() => import('./pages/Applicant/AIRoadmap'));
const ApplicantSettings = React.lazy(() => import('./pages/Applicant/Settings'));
const ApplicantHelpCenter = React.lazy(() => import('./pages/Applicant/HelpCenter'));
const EmployerDashboard = React.lazy(() => import('./pages/Employer/Dashboard'));
const AdminDashboard = React.lazy(() => import('./pages/Admin/Dashboard'));

function ProtectedRoute({ children, role }: { children: React.ReactNode, role?: string }) {
  const { user, profile, loading } = useAuth();
  
  if (loading) return <PageLoader />;
  if (!user) {
    if (role === 'employer') return <Navigate to="/employer-portal" />;
    if (role === 'admin') return <Navigate to="/peso-portal" />;
    return <Navigate to="/login" />;
  }
  if (role && profile?.role !== role) {
    if (profile?.role === 'applicant') return <Navigate to="/applicant" />;
    if (profile?.role === 'employer') return <Navigate to="/employer" />;
    if (profile?.role === 'admin') return <Navigate to="/admin" />;
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
}

export default function App() {
  return (
    <LanguageProvider>
      <ToastProvider>
        <AuthProvider>
          <ProfileProvider>
            <BookmarkProvider>
            <ThemeProvider>
              <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/PESOL'}>
            <div className="min-h-screen transition-colors duration-300">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Landing />} />
                  <Route path="/employer-portal" element={<EmployerLanding />} />
                  <Route path="/peso-portal" element={<AdminLanding />} />
                  
                  {/* Public Authentication Routes */}
                  <Route path="/login" element={<ApplicantLogin />} />
                  <Route path="/register" element={<ApplicantRegister />} />
                  
                  <Route path="/employer/login" element={<EmployerLogin />} />
                  <Route path="/employer/register" element={<EmployerRegister />} />
                  
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/register" element={<AdminRegister />} />
                  
                  {/* Applicant Routes */}
                  <Route path="/applicant" element={<ProtectedRoute role="applicant"><ApplicantLayout /></ProtectedRoute>}>
                    <Route index element={<ApplicantDashboard />} />
                    <Route path="jobs" element={<JobSearch />} />
                    <Route path="forum" element={<Forum />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="bookmarks" element={<SavedJobs />} />
                    <Route path="applications" element={<Applications />} />
                    <Route path="career" element={<ApplicantCareerPath />} />
                    <Route path="messages" element={<ApplicantMessages />} />
                    <Route path="roadmap" element={<ApplicantAIRoadmap />} />
                    <Route path="settings" element={<ApplicantSettings />} />
                    <Route path="help" element={<ApplicantHelpCenter />} />
                  </Route>
  
                  {/* Employer Routes */}
                  <Route path="/employer" element={<ProtectedRoute role="employer"><EmployerDashboard /></ProtectedRoute>} />
  
                  {/* Admin Routes */}
                  <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
                  
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Suspense>
            </div>
            <Tooltip id="main-tooltip" className="z-50" />
          </BrowserRouter>
        </ThemeProvider>
      </BookmarkProvider>
    </ProfileProvider>
    </AuthProvider>
  </ToastProvider>
  </LanguageProvider>
  );
}

