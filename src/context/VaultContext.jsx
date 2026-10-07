import React, { createContext, useContext, useState, useEffect } from 'react';

const VaultContext = createContext();

const INITIAL_FILES = [
  {
    id: 'f-1',
    name: 'Passport_Copy.pdf',
    category: 'documents',
    type: 'pdf',
    size: '2.4 MB',
    date: 'Oct 12',
    secure: true,
    encryption: 'AES-256 GCM',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    downloads: 3,
    icon: 'picture_as_pdf',
    iconColor: 'text-error'
  },
  {
    id: 'f-2',
    name: 'Contract_Draft_v2.docx',
    category: 'documents',
    type: 'docx',
    size: '45 KB',
    date: 'Oct 10',
    secure: true,
    encryption: 'AES-256 GCM',
    hash: 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e',
    downloads: 1,
    icon: 'article',
    iconColor: 'text-primary-container'
  },
  {
    id: 'f-3',
    name: 'IMG_8492_Confidential.jpg',
    category: 'photos',
    type: 'jpg',
    size: '5.2 MB',
    date: 'Sep 28',
    secure: true,
    encryption: 'AES-256 GCM',
    hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    previewUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_wF3dhvTq09rjXO0uGtQTu97fHFA2iqJplAUfAcu2Zkg6FSkd5a8__ISdSniS4zXPLubZN2AZRXcQS2pCeNYhTd3b7Jn7ksPj61YmMA6uKulalgvz5Pn0KZeVrLg_4EZ57Ak_OrWHfq1G__ndS_R3kT2qNmD0OTgRxkOrY8Q6whXXpH3YpI8L_SejKWXYRWQyP3CN4qr_vK5aq1rkNp5I7ZG6zc71vA_BXuOTqcBqd12OHTF3J8Wt',
    icon: 'image',
    iconColor: 'text-secondary'
  },
  {
    id: 'f-4',
    name: 'Tax Documents 2023',
    category: 'documents',
    type: 'folder',
    size: '14 Items',
    date: 'Sep 15',
    secure: true,
    encryption: 'AES-256 Multi-Layer',
    hash: '7d793037a0760186574b0282f2f435e7',
    icon: 'folder',
    iconColor: 'text-tertiary'
  },
  {
    id: 'f-5',
    name: 'Security_Cam_Front.mp4',
    category: 'videos',
    type: 'mp4',
    size: '128 MB',
    date: 'Sep 01',
    secure: true,
    encryption: 'AES-256 GCM Stream',
    hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    icon: 'movie',
    iconColor: 'text-secondary'
  },
  {
    id: 'f-6',
    name: 'National_ID_Card.png',
    category: 'ids',
    type: 'png',
    size: '1.1 MB',
    date: 'Aug 19',
    secure: true,
    encryption: 'AES-256 Zero-Knowledge',
    hash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    icon: 'badge',
    iconColor: 'text-primary'
  },
  {
    id: 'f-7',
    name: 'Portfolio_Offshore_Holdings.pdf',
    category: 'documents',
    type: 'pdf',
    size: '3.4 MB',
    date: 'Aug 04',
    secure: true,
    encryption: 'AES-256 GCM',
    hash: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d',
    icon: 'description',
    iconColor: 'text-error'
  }
];

const INITIAL_PASSWORDS = [
  {
    id: 'p-1',
    title: 'Gmail',
    username: 'john.doe@gmail.com',
    password: 'vK9$mP#2xL!90zQ',
    category: 'Email',
    strength: 'Strong',
    lastUpdated: '2 weeks ago',
    icon: 'mail'
  },
  {
    id: 'p-2',
    title: 'Bank of America',
    username: 'alex.sterling',
    password: 'bA9#9!vQ87@mK12x',
    category: 'Banking',
    strength: 'Very Strong',
    lastUpdated: '1 month ago',
    icon: 'account_balance'
  },
  {
    id: 'p-3',
    title: 'GitHub Enterprise',
    username: 'alex-sterling-vault',
    password: 'ghp_8872xLqZ90K23mPq',
    category: 'Work',
    strength: 'Very Strong',
    lastUpdated: '5 days ago',
    icon: 'code'
  },
  {
    id: 'p-4',
    title: 'Netflix 4K Sanctuary',
    username: 'alex.sterling@example.com',
    password: 'CinemaStream2024!',
    category: 'Social Media',
    strength: 'Moderate',
    lastUpdated: '2 months ago',
    icon: 'live_tv'
  },
  {
    id: 'p-5',
    title: 'Amazon Business',
    username: 'alex.sterling@example.com',
    password: 'Az#938k!VaultShop',
    category: 'Shopping',
    strength: 'Strong',
    lastUpdated: '3 weeks ago',
    icon: 'shopping_bag'
  },
  {
    id: 'p-6',
    title: 'Coinbase Pro Vault',
    username: 'alex.s.crypto@vault.io',
    password: 'cb_99Xk#7L!mQv2024',
    category: 'Banking',
    strength: 'Very Strong',
    lastUpdated: 'Yesterday',
    icon: 'currency_bitcoin'
  }
];

const HIDDEN_NEST_ITEMS = [
  {
    id: 'hn-1',
    name: 'Swiss_Asset_Ledger_2024.pdf',
    type: 'pdf',
    size: '8.4 MB',
    date: 'Yesterday',
    classification: 'Top Secret / Isolated',
    hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
  },
  {
    id: 'hn-2',
    name: 'Emergency_Hardware_Seed_Phrase.txt',
    type: 'note',
    size: '256 Bytes',
    date: 'Oct 01',
    classification: 'BIP-39 24-Words Encrypted',
    content: 'witch collapse practice feed shame open despair creek road again ice cheese flavor direct alert skull discover polar bubble mirror balance novel render absorb'
  },
  {
    id: 'hn-3',
    name: 'Private_PGP_Master_Key.asc',
    type: 'key',
    size: '4.2 KB',
    date: 'Sep 12',
    classification: '4096-bit RSA Armor',
    hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'
  }
];

export function VaultProvider({ children }) {
  // Theme State: defaults to dark
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('safenest_theme') || 'dark';
  });

  // Navigation / Active View
  const [currentScreen, setCurrentScreen] = useState('home'); // 'splash' | 'login' | 'signup' | 'home' | 'files' | 'passwords' | 'security' | 'hidden-nest' | 'upload' | 'profile'
  
  // User Session
  const [user, setUser] = useState({
    name: 'Alex Sterling',
    email: 'alex.sterling@example.com',
    id: 'SN-8492-X',
    isAuthenticated: true,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_6I2hfdr1baR-338d632eWP13aXO_gWv4tSD0clYYY4FHBwWh-QwnMpY7osAwSuv6KIDu0m_BWXYNcqWtT6XfYMQCLYitbNuelv-D1OyH_aqype8VY2K__al9wthKywdxC6Id4vU4epHfokS70JD-Wf-NFT4RpINK0BJXySmN3evP6tsitH-Uw96WbqCFYdht_H79G3GLgLfXEJFw1HCsMo3z6FS43BQB72LpqhCZOV7OEBrOjBRz'
  });

  // Data Collections
  const [files, setFiles] = useState(INITIAL_FILES);
  const [passwords, setPasswords] = useState(INITIAL_PASSWORDS);
  const [activeFileCategory, setActiveFileCategory] = useState('all');
  const [fileSearchQuery, setFileSearchQuery] = useState('');
  const [activePasswordCategory, setActivePasswordCategory] = useState('all');
  const [passwordSearchQuery, setPasswordSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Hidden Nest state
  const [hiddenNestLocked, setHiddenNestLocked] = useState(true);
  const [hiddenNestFiles, setHiddenNestFiles] = useState(HIDDEN_NEST_ITEMS);

  // Active Uploads queue
  const [activeUploads, setActiveUploads] = useState([
    {
      id: 'up-1',
      name: 'Tax_Return_2023.pdf',
      progress: 72,
      totalSize: '3.3 MB',
      uploadedSize: '2.4 MB',
      status: 'Encrypting and uploading...',
      active: true
    }
  ]);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 'n-1', title: 'Vault Backup Completed', time: '10m ago', unread: true, icon: 'backup', color: 'text-primary' },
    { id: 'n-2', title: 'Biometric Lock Verified', time: '1h ago', unread: true, icon: 'fingerprint', color: 'text-emerald-400' },
    { id: 'n-3', title: 'New Device Login: MacBook Pro', time: 'Yesterday', unread: false, icon: 'laptop_mac', color: 'text-secondary' },
    { id: 'n-4', title: 'Security Scan: 0 Vulnerabilities', time: '2d ago', unread: false, icon: 'shield', color: 'text-primary' }
  ]);

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Modals
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [addPasswordModalOpen, setAddPasswordModalOpen] = useState(false);
  const [filePreviewItem, setFilePreviewItem] = useState(null);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const [createNoteModalOpen, setCreateNoteModalOpen] = useState(false);
  const [scanModalOpen, setScanModalOpen] = useState(false);

  // Synchronize HTML class with theme
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('safenest_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  const navigateTo = (screen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addFile = (newFile) => {
    setFiles(prev => [newFile, ...prev]);
    showToast(`File "${newFile.name}" encrypted and added to vault!`, 'success');
  };

  const deleteFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    showToast('File removed securely from vault', 'info');
    if (filePreviewItem && filePreviewItem.id === id) {
      setFilePreviewItem(null);
    }
  };

  const addPassword = (newPass) => {
    setPasswords(prev => [newPass, ...prev]);
    showToast(`Credentials for "${newPass.title}" securely saved!`, 'success');
  };

  const deletePassword = (id) => {
    setPasswords(prev => prev.filter(p => p.id !== id));
    showToast('Password entry deleted', 'info');
  };

  const unlockHiddenNest = () => {
    setHiddenNestLocked(false);
    setPinModalOpen(false);
    showToast('Hidden Nest unlocked successfully', 'success');
  };

  const lockHiddenNest = () => {
    setHiddenNestLocked(true);
    showToast('Hidden Nest vault re-locked', 'info');
  };

  const logout = () => {
    setUser(prev => ({ ...prev, isAuthenticated: false }));
    setLogoutModalOpen(false);
    showToast('Successfully logged out', 'info');
    setCurrentScreen('login');
  };

  const login = (email = 'alex.sterling@example.com') => {
    setUser({
      name: 'Alex Sterling',
      email: email || 'alex.sterling@example.com',
      id: 'SN-8492-X',
      isAuthenticated: true,
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_6I2hfdr1baR-338d632eWP13aXO_gWv4tSD0clYYY4FHBwWh-QwnMpY7osAwSuv6KIDu0m_BWXYNcqWtT6XfYMQCLYitbNuelv-D1OyH_aqype8VY2K__al9wthKywdxC6Id4vU4epHfokS70JD-Wf-NFT4RpINK0BJXySmN3evP6tsitH-Uw96WbqCFYdht_H79G3GLgLfXEJFw1HCsMo3z6FS43BQB72LpqhCZOV7OEBrOjBRz'
    });
    showToast('Welcome back to SafeNest', 'success');
    setCurrentScreen('home');
  };

  return (
    <VaultContext.Provider
      value={{
        theme,
        toggleTheme,
        currentScreen,
        navigateTo,
        user,
        setUser,
        login,
        logout,
        files,
        addFile,
        deleteFile,
        activeFileCategory,
        setActiveFileCategory,
        fileSearchQuery,
        setFileSearchQuery,
        passwords,
        addPassword,
        deletePassword,
        activePasswordCategory,
        setActivePasswordCategory,
        passwordSearchQuery,
        setPasswordSearchQuery,
        viewMode,
        setViewMode,
        hiddenNestLocked,
        unlockHiddenNest,
        lockHiddenNest,
        hiddenNestFiles,
        activeUploads,
        setActiveUploads,
        notifications,
        setNotifications,
        toasts,
        showToast,
        pinModalOpen,
        setPinModalOpen,
        addPasswordModalOpen,
        setAddPasswordModalOpen,
        filePreviewItem,
        setFilePreviewItem,
        logoutModalOpen,
        setLogoutModalOpen,
        notificationDrawerOpen,
        setNotificationDrawerOpen,
        createNoteModalOpen,
        setCreateNoteModalOpen,
        scanModalOpen,
        setScanModalOpen
      }}
    >
      {children}
    </VaultContext.Provider>
  );
}

export function useVault() {
  const context = useContext(VaultContext);
  if (!context) {
    throw new Error('useVault must be used within a VaultProvider');
  }
  return context;
}
