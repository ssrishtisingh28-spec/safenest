import React from 'react';
import { useVault } from './context/VaultContext';

// Common Navigation & Drawers
import TopNavDesktop from './components/common/TopNavDesktop';
import TopNavMobile from './components/common/TopNavMobile';
import BottomNavMobile from './components/common/BottomNavMobile';
import NotificationDrawer from './components/common/NotificationDrawer';

// Modals
import PinModal from './components/modals/PinModal';
import AddPasswordModal from './components/modals/AddPasswordModal';
import FilePreviewModal from './components/modals/FilePreviewModal';
import LogoutModal from './components/modals/LogoutModal';
import CreateNoteModal from './components/modals/CreateNoteModal';
import ScanDocumentModal from './components/modals/ScanDocumentModal';
import ToastContainer from './components/modals/ToastContainer';

// Screens
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import FilesScreen from './screens/FilesScreen';
import PasswordsScreen from './screens/PasswordsScreen';
import SecurityCenterScreen from './screens/SecurityCenterScreen';
import HiddenNestScreen from './screens/HiddenNestScreen';
import UploadScreen from './screens/UploadScreen';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  const { currentScreen } = useVault();

  // Standalone full-page screens
  if (currentScreen === 'splash') {
    return (
      <main className="min-h-screen">
        <SplashScreen />
        <ToastContainer />
      </main>
    );
  }

  if (currentScreen === 'login') {
    return (
      <main className="min-h-screen">
        <LoginScreen />
        <ToastContainer />
      </main>
    );
  }

  if (currentScreen === 'signup') {
    return (
      <main className="min-h-screen">
        <SignUpScreen />
        <ToastContainer />
      </main>
    );
  }

  // Authenticated Main Vault Layout
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'files':
        return <FilesScreen />;
      case 'passwords':
        return <PasswordsScreen />;
      case 'security':
        return <SecurityCenterScreen />;
      case 'hidden-nest':
        return <HiddenNestScreen />;
      case 'upload':
        return <UploadScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface relative">
      {/* Desktop Top Navigation */}
      <TopNavDesktop />

      {/* Mobile Top Navigation */}
      <TopNavMobile />

      {/* Main Screen Content */}
      <main className="flex-1 w-full relative">
        {renderScreen()}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNavMobile />

      {/* Global Modals & Notifications */}
      <NotificationDrawer />
      <PinModal />
      <AddPasswordModal />
      <FilePreviewModal />
      <LogoutModal />
      <CreateNoteModal />
      <ScanDocumentModal />
      <ToastContainer />
    </div>
  );
}
