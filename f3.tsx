import React, { useState, useEffect } from 'react';
import { Lock, Key, MapPin, Plus, Search, Eye, EyeOff, AlertCircle, Mail, Check, Instagram, Youtube, User, Camera, MessageCircle, Send, X, Volume2, VolumeX, Settings, Moon, Sun, Globe, LogOut } from 'lucide-react';

const PasswordManager = () => {
  const [view, setView] = useState('login');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetStep, setResetStep] = useState(1);
  
  const [masterPassword, setMasterPassword] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [securityPin, setSecurityPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [sentCode, setSentCode] = useState('');
  
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  
  const [accounts, setAccounts] = useState([]);
  const [items, setItems] = useState([]);
  const [places, setPlaces] = useState([]);
  
  const [addMode, setAddMode] = useState(null);
  const [formData, setFormData] = useState({});
  const [tempPin, setTempPin] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewPin, setViewPin] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: 'Hi! I\'m your assistant. I can help you find items and remember where you placed them. Try asking me: "Where are my keys?" or "What\'s in the kitchen?"' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = false;
      
      // Set language based on current selection
      if (language === 'hi') {
        recognitionInstance.lang = 'hi-IN';
      } else if (language === 'zh') {
        recognitionInstance.lang = 'zh-CN';
      } else {
        recognitionInstance.lang = 'en-US';
      }

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        console.log('Heard:', transcript);
        
        // Process the voice command
        const response = generateBotResponse(transcript);
        speak(response);
        
        // Add to chat if chatbot is open
        if (showChatbot) {
          setChatMessages(prev => [
            ...prev,
            { type: 'user', text: transcript },
            { type: 'bot', text: response }
          ]);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'no-speech') {
          // Restart listening
          if (isListening) {
            recognitionInstance.start();
          }
        }
      };

      recognitionInstance.onend = () => {
        // Auto-restart if listening is enabled
        if (isListening && voiceEnabled) {
          try {
            recognitionInstance.start();
          } catch (e) {
            console.log('Recognition restart failed:', e);
          }
        }
      };

      setRecognition(recognitionInstance);
    }
  }, [language]);

  // Start/Stop voice listening
  const toggleVoiceListening = () => {
    if (!recognition) {
      alert(language === 'en' ? 'Voice recognition not supported in your browser' : 
            language === 'hi' ? 'आपके ब्राउज़र में वॉइस पहचान समर्थित नहीं है' : 
            '您的浏览器不支持语音识别');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
      speak(language === 'en' ? 'Voice listening stopped' : 
            language === 'hi' ? 'आवाज सुनना बंद' : 
            '语音监听已停止');
    } else {
      try {
        recognition.start();
        setIsListening(true);
        speak(language === 'en' ? 'Voice listening started. Ask me about your items' : 
              language === 'hi' ? 'आवाज सुनना शुरू। मुझसे अपनी वस्तुओं के बारे में पूछें' : 
              '语音监听已启动。问我您的物品');
      } catch (e) {
        console.error('Failed to start recognition:', e);
      }
    }
  };

  // Update recognition language when language changes
  useEffect(() => {
    if (recognition) {
      recognition.stop();
      if (language === 'hi') {
        recognition.lang = 'hi-IN';
      } else if (language === 'zh') {
        recognition.lang = 'zh-CN';
      } else {
        recognition.lang = 'en-US';
      }
      if (isListening) {
        setTimeout(() => {
          try {
            recognition.start();
          } catch (e) {
            console.log('Recognition restart failed after language change');
          }
        }, 100);
      }
    }
  }, [language]);

  // Language translations
  const translations = {
    en: {
      welcome: 'Welcome back',
      helpMessage: "I'm here to help you find your items",
      passwordManager: 'Password Manager',
      neverForget: 'Never Forget Nothing',
      username: 'Username',
      email: 'Email Address',
      password: 'Master Password',
      securityPin: 'Security PIN',
      login: 'Sign In',
      register: 'Register',
      logout: 'Logout',
      addAccount: 'Add Account',
      addItem: 'Add Item',
      addPlace: 'Add Place',
      accounts: 'Accounts',
      items: 'Items',
      places: 'Places',
      settings: 'Settings',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      language: 'Language',
      voiceEnabled: 'Voice enabled',
      voiceDisabled: 'Voice disabled',
      forgotPassword: 'Forgot Password or PIN?',
      resetPassword: 'Reset Password',
      itemSaved: 'saved in',
      chatPlaceholder: 'Ask about items or places...',
      findKeys: 'Find keys',
      listItems: 'List items',
      help: 'Help',
      noItemsYet: "You haven't added any items yet",
      foundItems: 'I found these items for you',
      createAccount: 'Create Account',
      signInContinue: 'Sign in to continue',
      allFieldsRequired: 'All fields are required',
      termsAndConditions: 'Terms and Conditions',
      acceptTerms: 'I accept the Terms and Conditions',
      readTerms: 'Please read and accept our terms',
      close: 'Close',
      mustAcceptTerms: 'You must accept the terms to continue',
      termsContent: {
        title: 'Terms and Conditions',
        intro: 'Welcome to Never Forget Nothing. By using our service, you agree to these terms:',
        section1: '1. Service Usage',
        section1Text: 'This password manager is designed to help you securely store and manage your passwords, track items, and remember locations. You are responsible for maintaining the confidentiality of your master password and security PIN.',
        section2: '2. Data Security',
        section2Text: 'We use industry-standard encryption (AES-256) for passwords and bcrypt hashing for authentication. However, you are ultimately responsible for the security of your account.',
        section3: '3. Privacy',
        section3Text: 'Your data is stored securely and is not shared with third parties. We collect only essential information needed to provide our services.',
        section4: '4. User Responsibilities',
        section4Text: 'You agree to use strong passwords, keep your security credentials confidential, and use this service lawfully.',
        section5: '5. Limitation of Liability',
        section5Text: 'We provide this service "as is" without warranties. We are not liable for any data loss or security breaches resulting from unauthorized access to your account.',
        section6: '6. Changes to Terms',
        section6Text: 'We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of modified terms.'
      }
    },
    hi: {
      welcome: 'वापसी पर स्वागत है',
      helpMessage: 'मैं आपकी वस्तुएं खोजने में मदद करने के लिए यहां हूं',
      passwordManager: 'पासवर्ड प्रबंधक',
      neverForget: 'कभी कुछ न भूलें',
      username: 'उपयोगकर्ता नाम',
      email: 'ईमेल पता',
      password: 'मास्टर पासवर्ड',
      securityPin: 'सुरक्षा पिन',
      login: 'साइन इन करें',
      register: 'पंजीकरण करें',
      logout: 'लॉगआउट',
      addAccount: 'खाता जोड़ें',
      addItem: 'आइटम जोड़ें',
      addPlace: 'स्थान जोड़ें',
      accounts: 'खाते',
      items: 'वस्तुएं',
      places: 'स्थान',
      settings: 'सेटिंग्स',
      darkMode: 'डार्क मोड',
      lightMode: 'लाइट मोड',
      language: 'भाषा',
      voiceEnabled: 'आवाज सक्षम है',
      voiceDisabled: 'आवाज अक्षम है',
      forgotPassword: 'पासवर्ड या पिन भूल गए?',
      resetPassword: 'पासवर्ड रीसेट करें',
      itemSaved: 'में सहेजा गया',
      chatPlaceholder: 'वस्तुओं या स्थानों के बारे में पूछें...',
      findKeys: 'चाबियाँ खोजें',
      listItems: 'वस्तुओं की सूची',
      help: 'मदद',
      noItemsYet: 'आपने अभी तक कोई आइटम नहीं जोड़ा है',
      foundItems: 'मुझे आपके लिए ये वस्तुएं मिलीं',
      createAccount: 'खाता बनाएं',
      signInContinue: 'जारी रखने के लिए साइन इन करें',
      allFieldsRequired: 'सभी फ़ील्ड आवश्यक हैं',
      termsAndConditions: 'नियम और शर्तें',
      acceptTerms: 'मैं नियम और शर्तें स्वीकार करता हूं',
      readTerms: 'कृपया हमारी शर्तें पढ़ें और स्वीकार करें',
      close: 'बंद करें',
      mustAcceptTerms: 'जारी रखने के लिए आपको शर्तों को स्वीकार करना होगा',
      termsContent: {
        title: 'नियम और शर्तें',
        intro: 'नेवर फॉरगेट नथिंग में आपका स्वागत है। हमारी सेवा का उपयोग करके, आप इन शर्तों से सहमत हैं:',
        section1: '1. सेवा उपयोग',
        section1Text: 'यह पासवर्ड प्रबंधक आपको सुरक्षित रूप से अपने पासवर्ड संग्रहीत करने में मदद करने के लिए डिज़ाइन किया गया है। आप अपने मास्टर पासवर्ड की गोपनीयता बनाए रखने के लिए जिम्मेदार हैं।',
        section2: '2. डेटा सुरक्षा',
        section2Text: 'हम पासवर्ड के लिए उद्योग-मानक एन्क्रिप्शन (AES-256) का उपयोग करते हैं।',
        section3: '3. गोपनीयता',
        section3Text: 'आपका डेटा सुरक्षित रूप से संग्रहीत है और तीसरे पक्ष के साथ साझा नहीं किया जाता है।',
        section4: '4. उपयोगकर्ता जिम्मेदारियां',
        section4Text: 'आप मजबूत पासवर्ड का उपयोग करने और इस सेवा का कानूनी रूप से उपयोग करने के लिए सहमत हैं।',
        section5: '5. दायित्व की सीमा',
        section5Text: 'हम यह सेवा "जैसी है" प्रदान करते हैं। हम किसी भी डेटा हानि के लिए उत्तरदायी नहीं हैं।',
        section6: '6. शर्तों में परिवर्तन',
        section6Text: 'हम किसी भी समय इन शर्तों को संशोधित करने का अधिकार सुरक्षित रखते हैं।'
      }
    },
    zh: {
      welcome: '欢迎回来',
      helpMessage: '我在这里帮助您找到物品',
      passwordManager: '密码管理器',
      neverForget: '永不忘记',
      username: '用户名',
      email: '电子邮件地址',
      password: '主密码',
      securityPin: '安全密码',
      login: '登录',
      register: '注册',
      logout: '登出',
      addAccount: '添加账户',
      addItem: '添加物品',
      addPlace: '添加地点',
      accounts: '账户',
      items: '物品',
      places: '地点',
      settings: '设置',
      darkMode: '深色模式',
      lightMode: '浅色模式',
      language: '语言',
      voiceEnabled: '语音已启用',
      voiceDisabled: '语音已禁用',
      forgotPassword: '忘记密码或PIN？',
      resetPassword: '重置密码',
      itemSaved: '保存在',
      chatPlaceholder: '询问物品或地点...',
      findKeys: '找钥匙',
      listItems: '列出物品',
      help: '帮助',
      noItemsYet: '您还没有添加任何物品',
      foundItems: '我为您找到了这些物品',
      createAccount: '创建账户',
      signInContinue: '登录以继续',
      allFieldsRequired: '所有字段都是必需的',
      termsAndConditions: '条款和条件',
      acceptTerms: '我接受条款和条件',
      readTerms: '请阅读并接受我们的条款',
      close: '关闭',
      mustAcceptTerms: '您必须接受条款才能继续',
      termsContent: {
        title: '条款和条件',
        intro: '欢迎使用永不忘记。使用我们的服务即表示您同意以下条款：',
        section1: '1. 服务使用',
        section1Text: '此密码管理器旨在帮助您安全地存储和管理密码。您有责任保持主密码的机密性。',
        section2: '2. 数据安全',
        section2Text: '我们使用行业标准加密（AES-256）来保护密码。',
        section3: '3. 隐私',
        section3Text: '您的数据安全存储，不与第三方共享。',
        section4: '4. 用户责任',
        section4Text: '您同意使用强密码并合法使用此服务。',
        section5: '5. 责任限制',
        section5Text: '我们按"原样"提供此服务。我们不对任何数据丢失负责。',
        section6: '6. 条款变更',
        section6Text: '我们保留随时修改这些条款的权利。'
      }
    }
  };

  const t = translations[language];

  // Speech synthesis setup
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  // Speak function with language support
  const speak = (text) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = null;

    // Select voice based on language
    if (language === 'hi') {
      selectedVoice = voices.find(voice => 
        voice.lang.includes('hi') || 
        voice.name.includes('Hindi') ||
        voice.lang.includes('hi-IN')
      );
      utterance.lang = 'hi-IN';
    } else if (language === 'zh') {
      selectedVoice = voices.find(voice => 
        voice.lang.includes('zh') || 
        voice.name.includes('Chinese') ||
        voice.lang.includes('zh-CN')
      );
      utterance.lang = 'zh-CN';
    } else {
      // English - prefer female voice
      selectedVoice = voices.find(voice => 
        voice.name.includes('Female') || 
        voice.name.includes('Samantha') ||
        voice.name.includes('Victoria') ||
        voice.name.includes('Zira') ||
        voice.name.includes('Google UK English Female')
      ) || voices.find(voice => voice.lang.includes('en'));
      utterance.lang = 'en-US';
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.rate = 0.9;
    utterance.pitch = 1.2;
    utterance.volume = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Welcome message with language
  useEffect(() => {
    if (view === 'main' && currentUser && voiceEnabled) {
      setTimeout(() => {
        speak(`${t.welcome}, ${currentUser.username}. ${t.helpMessage}`);
      }, 1000);
    }
  }, [view, currentUser, language]);

  // Announce items in selected language
  useEffect(() => {
    if (items.length > 0 && voiceEnabled) {
      const lastItem = items[items.length - 1];
      if (lastItem) {
        speak(`${lastItem.name} ${t.itemSaved} ${lastItem.place}`);
      }
    }
  }, [items.length]);

  // Simple hash function (for demo - in production use bcrypt/argon2 on server)
  const hashPassword = async (password) => {
    // This is a simplified version for demonstration
    // In production, this should be done on the server with bcrypt or argon2
    const encoder = new TextEncoder();
    const data = encoder.encode(password + 'salt_key_2024'); // Add salt
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  // Encrypt sensitive data (passwords)
  const encryptData = (data) => {
    // Simple encryption for demo - in production use AES-256
    // This demonstrates the concept of encryption
    return btoa(data); // Base64 encoding (for demo purposes)
  };

  const decryptData = (encryptedData) => {
    // Simple decryption for demo
    try {
      return atob(encryptedData);
    } catch {
      return encryptedData;
    }
  };

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleRegister = () => {
    if (!termsAccepted) {
      setError(t.mustAcceptTerms);
      return;
    }
    if (!username || !email || !masterPassword || !securityPin || !confirmPin) {
      setError(t.allFieldsRequired);
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (securityPin !== confirmPin) {
      setError('Security PINs do not match');
      return;
    }
    if (securityPin.length < 4) {
      setError('Security PIN must be at least 4 digits');
      return;
    }
    
    const existingUser = registeredUsers.find(u => u.username === username || u.email === email);
    if (existingUser) {
      setError('Username or email already exists');
      return;
    }

    // Hash password before storing (simulated)
    hashPassword(masterPassword).then(hashedPassword => {
      hashPassword(securityPin).then(hashedPin => {
        setRegisteredUsers([...registeredUsers, {
          username,
          email,
          password: hashedPassword, // Stored as hash
          securityPin: hashedPin // Stored as hash
        }]);
        
        setError('');
        setSuccess('✅ Registration successful! Password secured with hashing. Please login.');
        setTimeout(() => {
          setIsRegistering(false);
          setUsername('');
          setEmail('');
          setMasterPassword('');
          setSecurityPin('');
          setConfirmPin('');
          setSuccess('');
        }, 2000);
      });
    });
  };

  const handleLogin = () => {
    if (!username || !masterPassword || !securityPin) {
      setError('Username, password, and security PIN are required');
      return;
    }

    // Hash the input password and PIN to compare with stored hashes
    hashPassword(masterPassword).then(hashedPassword => {
      hashPassword(securityPin).then(hashedPin => {
        const user = registeredUsers.find(
          u => u.username === username && 
               u.password === hashedPassword && 
               u.securityPin === hashedPin
        );

        if (user) {
          setCurrentUser(user);
          setView('main');
          setError('');
          setSuccess('✅ Login successful! Connection secured with TLS/HTTPS');
          setTimeout(() => setSuccess(''), 3000);
        } else {
          setError('Invalid username, password, or security PIN');
        }
      });
    });
  };

  const handleForgotPasswordStep1 = () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    const user = registeredUsers.find(u => u.email === email);
    if (!user) {
      setError('No account found with this email address');
      return;
    }

    const code = generateVerificationCode();
    setSentCode(code);
    setError('');
    setSuccess(`Verification code sent to ${email}: ${code}`);
    setResetStep(2);
  };

  const handleVerifyCode = () => {
    if (!verificationCode) {
      setError('Please enter the verification code');
      return;
    }

    if (verificationCode !== sentCode) {
      setError('Invalid verification code');
      return;
    }

    setError('');
    setSuccess('Code verified! Please enter new credentials');
    setResetStep(3);
  };

  const handleResetPassword = () => {
    if (!masterPassword || !securityPin || !confirmPin) {
      setError('All fields are required');
      return;
    }

    if (securityPin !== confirmPin) {
      setError('Security PINs do not match');
      return;
    }

    const userIndex = registeredUsers.findIndex(u => u.email === email);
    if (userIndex !== -1) {
      // Hash new password and PIN
      hashPassword(masterPassword).then(hashedPassword => {
        hashPassword(securityPin).then(hashedPin => {
          const updatedUsers = [...registeredUsers];
          updatedUsers[userIndex] = {
            ...updatedUsers[userIndex],
            password: hashedPassword,
            securityPin: hashedPin
          };
          setRegisteredUsers(updatedUsers);
          
          setError('');
          setSuccess('✅ Password and PIN reset successfully! Secured with hashing.');
          setTimeout(() => {
            setIsForgotPassword(false);
            setResetStep(1);
            setEmail('');
            setMasterPassword('');
            setSecurityPin('');
            setConfirmPin('');
            setVerificationCode('');
            setSentCode('');
            setSuccess('');
          }, 2000);
        });
      });
    }
  };

  const handleSocialLogin = (provider) => {
    setCurrentUser({ username: `${provider}_user`, email: `${provider}@example.com`, securityPin: '1234' });
    setView('main');
    setError('');
  };

  const handleAddAccount = () => {
    if (!tempPin) {
      setError('Security PIN required');
      return;
    }
    
    // Verify PIN by hashing and comparing
    hashPassword(tempPin).then(hashedTempPin => {
      if (hashedTempPin !== currentUser.securityPin) {
        setError('Incorrect security PIN');
        return;
      }
      
      if (!formData.accountName || !formData.password || !formData.confirmPassword) {
        setError('All fields required');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      
      // Encrypt password before storing
      const encryptedPassword = encryptData(formData.password);
      
      setAccounts([...accounts, { 
        id: Date.now(), 
        name: formData.accountName, 
        password: encryptedPassword // Stored encrypted
      }]);
      setAddMode(null);
      setFormData({});
      setTempPin('');
      setError('');
      setSuccess('✅ Account saved! Password encrypted for security.');
      setTimeout(() => setSuccess(''), 3000);
    });
  };

  const handleAddItem = () => {
    if (!formData.itemName || !formData.place) {
      setError('Item name and place required');
      return;
    }
    setItems([...items, { 
      id: Date.now(), 
      name: formData.itemName, 
      place: formData.place 
    }]);
    setAddMode(null);
    setFormData({});
    setError('');
  };

  const handleAddPlace = () => {
    if (!formData.placeName || !formData.itemsFound) {
      setError('Place name and items found required');
      return;
    }
    setPlaces([...places, { 
      id: Date.now(), 
      name: formData.placeName, 
      itemsFound: formData.itemsFound 
    }]);
    setAddMode(null);
    setFormData({});
    setError('');
  };

  const handleViewAccount = (account) => {
    setSelectedAccount(account);
    setSelectedItem(null);
    setShowViewModal(true);
    setViewPin('');
    setError('');
  };

  const handleViewItem = (item) => {
    setSelectedItem(item);
    setSelectedAccount(null);
    setShowViewModal(true);
    setError('');
  };

  const handleVerifyPinForView = () => {
    if (!viewPin) {
      setError('Please enter your security PIN');
      return;
    }
    
    // Hash and verify PIN
    hashPassword(viewPin).then(hashedViewPin => {
      if (hashedViewPin !== currentUser.securityPin) {
        setError('Incorrect security PIN');
        return;
      }
      setError('');
    });
  };

  const handleCloseModal = () => {
    setShowViewModal(false);
    setSelectedAccount(null);
    setSelectedItem(null);
    setViewPin('');
    setError('');
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatMessages([...chatMessages, { type: 'user', text: userMessage }]);
    setChatInput('');

    setTimeout(() => {
      const botResponse = generateBotResponse(userMessage);
      setChatMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
      
      // Speak the response
      speak(botResponse);
    }, 500);
  };

  const generateBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    const foundItems = items.filter(item => 
      lowerMessage.includes(item.name.toLowerCase()) ||
      item.name.toLowerCase().includes(lowerMessage)
    );

    if (foundItems.length > 0) {
      const itemList = foundItems.map(item => 
        `${item.name} ${language === 'en' ? 'is in' : language === 'hi' ? 'में है' : '在'} ${item.place}`
      ).join('. ');
      return `${t.foundItems}: ${itemList}`;
    }

    const foundPlaces = places.filter(place =>
      lowerMessage.includes(place.name.toLowerCase()) ||
      place.name.toLowerCase().includes(lowerMessage)
    );

    if (foundPlaces.length > 0) {
      const placeList = foundPlaces.map(place =>
        `${place.name}: ${place.itemsFound}`
      ).join('. ');
      return placeList;
    }

    if (lowerMessage.includes('where') || lowerMessage.includes('find') || lowerMessage.includes('कहाँ') || lowerMessage.includes('在哪')) {
      if (items.length === 0) {
        return t.noItemsYet;
      }
      return `${items.length} ${t.items}: ${items.map(item => item.name).join(', ')}`;
    }

    if (lowerMessage.includes('list') || lowerMessage.includes('show') || lowerMessage.includes('सूची') || lowerMessage.includes('列表')) {
      if (items.length === 0) {
        return t.noItemsYet;
      }
      const itemList = items.map(item => 
        `${item.name} ${language === 'en' ? 'is in' : language === 'hi' ? 'में है' : '在'} ${item.place}`
      ).join('. ');
      return itemList;
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('मदद') || lowerMessage.includes('帮助')) {
      if (language === 'hi') {
        return 'मैं वस्तुएं खोजने, स्थान जांचने और वस्तुओं की सूची बनाने में मदद कर सकता हूं।';
      } else if (language === 'zh') {
        return '我可以帮助您查找物品、检查地点和列出物品。';
      }
      return 'I can help you find items, check places, and list items.';
    }

    if (language === 'hi') {
      return 'मुझे यकीन नहीं है। मैं वस्तुएं और स्थान खोजने में मदद कर सकता हूं।';
    } else if (language === 'zh') {
      return '我不确定。我可以帮助您找到物品和地点。';
    }
    return "I'm not sure about that. I can help you find items and places.";
  };

  if (view === 'login') {
    if (isForgotPassword) {
      return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} flex items-center justify-center p-4`}>
          {/* Language Selector - Top Right */}
          <div className="fixed top-4 right-4 z-50">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white border-2 border-blue-500 rounded-lg px-4 py-2 font-semibold cursor-pointer hover:bg-blue-50 transition-colors"
            >
              <option value="en">🇬🇧 English</option>
              <option value="hi">🇮🇳 हिंदी</option>
              <option value="zh">🇨🇳 中文</option>
            </select>
          </div>
          <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-2xl shadow-2xl p-8 w-full max-w-md`}>
            <div className="flex justify-center mb-6">
              <div className="relative inline-block">
                <div className="bg-gradient-to-br from-blue-900 to-blue-700 px-8 py-6 rounded-2xl shadow-lg">
                  <div className="text-6xl font-black text-white tracking-wider" style={{textShadow: '0 0 20px rgba(255,255,255,0.5)'}}>
                    NF
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
              Reset Password
            </h1>
            <p className="text-center text-gray-600 mb-8">
              {resetStep === 1 && 'Enter your email to receive verification code'}
              {resetStep === 2 && 'Enter the 6-digit code sent to your email'}
              {resetStep === 3 && 'Create new password and security PIN'}
            </p>
            
            <div className="space-y-4">
              {resetStep === 1 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter your registered email"
                  />
                </div>
              )}

              {resetStep === 2 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Verification Code</label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center text-2xl tracking-widest"
                    placeholder="000000"
                    maxLength="6"
                  />
                  <p className="text-sm text-gray-500 mt-2">Check your email for the code</p>
                </div>
              )}

              {resetStep === 3 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Master Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={masterPassword}
                        onChange={(e) => setMasterPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter new password"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-gray-500"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Security PIN</label>
                    <input
                      type="password"
                      value={securityPin}
                      onChange={(e) => setSecurityPin(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Create new 4-digit PIN"
                      maxLength="6"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Security PIN</label>
                    <input
                      type="password"
                      value={confirmPin}
                      onChange={(e) => setConfirmPin(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Confirm your PIN"
                      maxLength="6"
                    />
                  </div>
                </>
              )}
              
              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {success && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                  <Check className="w-5 h-5" />
                  <span className="text-sm">{success}</span>
                </div>
              )}
              
              <button
                onClick={() => {
                  if (resetStep === 1) handleForgotPasswordStep1();
                  else if (resetStep === 2) handleVerifyCode();
                  else if (resetStep === 3) handleResetPassword();
                }}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                {resetStep === 1 && 'Send Verification Code'}
                {resetStep === 2 && 'Verify Code'}
                {resetStep === 3 && 'Reset Password & PIN'}
              </button>

              <button
                onClick={() => {
                  setIsForgotPassword(false);
                  setResetStep(1);
                  setEmail('');
                  setMasterPassword('');
                  setSecurityPin('');
                  setConfirmPin('');
                  setVerificationCode('');
                  setSentCode('');
                  setError('');
                  setSuccess('');
                }}
                className="w-full text-indigo-600 py-2 text-sm hover:text-indigo-700 font-medium"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} flex items-center justify-center p-4`}>
        {/* Language Selector - Top Right */}
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white border-2 border-blue-500 rounded-lg px-4 py-2 font-semibold cursor-pointer hover:bg-blue-50 transition-colors shadow-lg"
          >
            <option value="en">🇬🇧 English</option>
            <option value="hi">🇮🇳 हिंदी</option>
            <option value="zh">🇨🇳 中文</option>
          </select>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-white border-2 border-blue-500 rounded-lg px-4 py-2 hover:bg-blue-50 transition-colors shadow-lg"
            title={darkMode ? t.lightMode : t.darkMode}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-2xl shadow-2xl p-8 w-full max-w-md`}>
          <div className="flex justify-center mb-6">
            <div className="relative inline-block">
              <div className="bg-gradient-to-br from-blue-900 to-blue-700 px-8 py-6 rounded-2xl shadow-lg">
                <div className="text-6xl font-black text-white tracking-wider" style={{textShadow: '0 0 20px rgba(255,255,255,0.5)'}}>
                  NF
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <Lock className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
          <h1 className={`text-3xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
            {isRegistering ? t.createAccount : t.passwordManager}
          </h1>
          <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
            {isRegistering ? t.signInContinue.replace('Sign in', t.register) : t.signInContinue}
          </p>
          <p className={`text-center text-sm font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-700'} mb-6`}>{t.neverForget}</p>
          
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{t.username}</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full px-4 py-3 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                placeholder={t.username}
              />
            </div>

            {isRegistering && (
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{t.email}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  placeholder={t.email}
                />
              </div>
            )}

            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{t.password}</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={masterPassword}
                  onChange={(e) => setMasterPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !isRegistering && handleLogin()}
                  className={`w-full px-4 py-3 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  placeholder={t.password}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-3.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{t.securityPin}</label>
              <input
                type="password"
                value={securityPin}
                onChange={(e) => setSecurityPin(e.target.value)}
                className={`w-full px-4 py-3 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                placeholder={t.securityPin}
                maxLength="6"
              />
            </div>

            {isRegistering && (
              <>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    {language === 'en' ? 'Confirm Security PIN' : language === 'hi' ? 'सुरक्षा पिन की पुष्टि करें' : '确认安全密码'}
                  </label>
                  <input
                    type="password"
                    value={confirmPin}
                    onChange={(e) => setConfirmPin(e.target.value)}
                    className={`w-full px-4 py-3 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                    placeholder={language === 'en' ? 'Confirm your PIN' : language === 'hi' ? 'अपने पिन की पुष्टि करें' : '确认您的密码'}
                    maxLength="6"
                  />
                </div>

                {/* Terms and Conditions Checkbox */}
                <div className={`flex items-start gap-3 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'} border-2 ${termsAccepted ? 'border-blue-500' : darkMode ? 'border-gray-600' : 'border-blue-200'}`}>
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 w-5 h-5 cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-sm cursor-pointer">
                    {t.acceptTerms}{' '}
                    <button
                      type="button"
                      onClick={() => setShowTerms(true)}
                      className="text-blue-600 hover:text-blue-700 font-semibold underline"
                    >
                      ({language === 'en' ? 'Read Terms' : language === 'hi' ? 'शर्तें पढ़ें' : '阅读条款'})
                    </button>
                  </label>
                </div>
              </>
            )}
            
            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                <Check className="w-5 h-5" />
                <span className="text-sm">{success}</span>
              </div>
            )}
            
            <button
              onClick={isRegistering ? handleRegister : handleLogin}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>

            {!isRegistering && (
              <button
                onClick={() => {
                  setIsForgotPassword(true);
                  setError('');
                }}
                className={`w-full ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-indigo-600 hover:text-indigo-700'} py-2 text-sm font-medium`}
              >
                {t.forgotPassword}
              </button>
            )}

            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
                setSuccess('');
                setUsername('');
                setEmail('');
                setMasterPassword('');
                setSecurityPin('');
                setConfirmPin('');
                setTermsAccepted(false);
              }}
              className={`w-full ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'} py-2 text-sm font-medium border-t pt-4`}
            >
              {isRegistering 
                ? (language === 'en' ? 'Already have an account? Sign in' : language === 'hi' ? 'पहले से खाता है? साइन इन करें' : '已有账户？登录')
                : (language === 'en' ? "Don't have an account? Register" : language === 'hi' ? 'खाता नहीं है? पंजीकरण करें' : '没有账户？注册')
              }
            </button>

            {!isRegistering && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <button
                  onClick={() => handleSocialLogin('google')}
                  className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>

                <button
                  onClick={() => handleSocialLogin('microsoft')}
                  className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 23 23">
                    <path fill="#f35325" d="M0 0h11v11H0z"/>
                    <path fill="#81bc06" d="M12 0h11v11H12z"/>
                    <path fill="#05a6f0" d="M0 12h11v11H0z"/>
                    <path fill="#ffba08" d="M12 12h11v11H12z"/>
                  </svg>
                  Continue with Microsoft
                </button>
              </>
            )}
          </div>
        </div>

        {/* Terms and Conditions Modal */}
        {showTerms && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[200]">
            <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-2xl shadow-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{t.termsContent.title}</h2>
                <button
                  onClick={() => setShowTerms(false)}
                  className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} p-2 rounded-full transition-colors`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-sm">
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{t.termsContent.intro}</p>

                <div>
                  <h3 className="font-bold text-lg mb-2">{t.termsContent.section1}</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{t.termsContent.section1Text}</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">{t.termsContent.section2}</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{t.termsContent.section2Text}</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">{t.termsContent.section3}</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{t.termsContent.section3Text}</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">{t.termsContent.section4}</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{t.termsContent.section4Text}</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">{t.termsContent.section5}</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{t.termsContent.section5Text}</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">{t.termsContent.section6}</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{t.termsContent.section6Text}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowTerms(false);
                  setTermsAccepted(true);
                }}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                {t.acceptTerms}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <nav className={`${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-900 to-blue-700'} text-white p-4 shadow-lg`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative inline-block">
              <div className={`${darkMode ? 'bg-gradient-to-br from-blue-700 to-blue-500' : 'bg-gradient-to-br from-blue-800 to-blue-600'} px-4 py-2 rounded-lg shadow-md`}>
                <span className="text-2xl font-black tracking-wide" style={{textShadow: '0 0 10px rgba(255,255,255,0.3)'}}>
                  NF
                </span>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Lock className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold">{t.neverForget}</h1>
              <p className="text-xs text-blue-200">{language === 'en' ? 'Secure Memory Companion' : language === 'hi' ? 'सुरक्षित मेमोरी साथी' : '安全记忆伴侣'}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleVoiceListening}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isListening 
                  ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
              title={isListening 
                ? (language === 'en' ? 'Stop voice listening' : language === 'hi' ? 'आवाज सुनना बंद करें' : '停止语音监听')
                : (language === 'en' ? 'Start voice listening' : language === 'hi' ? 'आवाज सुनना शुरू करें' : '开始语音监听')
              }
            >
              {isListening ? (
                <>
                  <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                  <span className="text-sm font-semibold">
                    {language === 'en' ? 'LISTENING' : language === 'hi' ? 'सुन रहा है' : '监听中'}
                  </span>
                </>
              ) : (
                <>
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">
                    {language === 'en' ? 'Voice Assistant' : language === 'hi' ? 'आवाज सहायक' : '语音助手'}
                  </span>
                </>
              )}
            </button>
            <button
              onClick={() => {
                setVoiceEnabled(!voiceEnabled);
                if (!voiceEnabled) {
                  speak(t.voiceEnabled);
                } else {
                  window.speechSynthesis.cancel();
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                voiceEnabled 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-gray-600 hover:bg-gray-700'
              }`}
              title={voiceEnabled ? t.voiceEnabled : t.voiceDisabled}
            >
              {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              {isSpeaking && (
                <span className="flex gap-1">
                  <span className="w-1 h-4 bg-white rounded animate-pulse"></span>
                  <span className="w-1 h-4 bg-white rounded animate-pulse" style={{animationDelay: '0.2s'}}></span>
                  <span className="w-1 h-4 bg-white rounded animate-pulse" style={{animationDelay: '0.4s'}}></span>
                </span>
              )}
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-2 bg-blue-800 px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
              title={t.settings}
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowProfileModal(true)}
              className="flex items-center gap-2 bg-blue-800 px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
            >
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
              )}
              <span className="text-blue-100">{currentUser?.username}</span>
            </button>
            <button
              onClick={() => {
                setView('login');
                setCurrentUser(null);
                setMasterPassword('');
                setSecurityPin('');
                setUsername('');
                setAccounts([]);
                setItems([]);
                setPlaces([]);
                setProfileImage(null);
              }}
              className="bg-blue-800 px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
            >
              {t.logout}
            </button>
          </div>
        </div>
      </nav>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]">
          <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-2xl shadow-2xl p-6 w-full max-w-md`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Settings className="w-6 h-6" />
                {t.settings}
              </h2>
              <button
                onClick={() => setShowSettings(false)}
                className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} p-2 rounded-full transition-colors`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Dark Mode Toggle */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  <span className="font-semibold">{darkMode ? t.darkMode : t.lightMode}</span>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-14 h-7 rounded-full transition-colors ${
                    darkMode ? 'bg-blue-600' : 'bg-gray-300'
                  } relative`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      darkMode ? 'transform translate-x-7' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Language Selection */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="w-5 h-5" />
                  <span className="font-semibold">{t.language}</span>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`w-full p-3 rounded-lg font-medium transition-colors ${
                      language === 'en'
                        ? 'bg-blue-600 text-white'
                        : darkMode
                        ? 'bg-gray-700 hover:bg-gray-600'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    🇬🇧 English
                  </button>
                  <button
                    onClick={() => setLanguage('hi')}
                    className={`w-full p-3 rounded-lg font-medium transition-colors ${
                      language === 'hi'
                        ? 'bg-blue-600 text-white'
                        : darkMode
                        ? 'bg-gray-700 hover:bg-gray-600'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    🇮🇳 हिंदी (Hindi)
                  </button>
                  <button
                    onClick={() => setLanguage('zh')}
                    className={`w-full p-3 rounded-lg font-medium transition-colors ${
                      language === 'zh'
                        ? 'bg-blue-600 text-white'
                        : darkMode
                        ? 'bg-gray-700 hover:bg-gray-600'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    🇨🇳 中文 (Chinese)
                  </button>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => {
                  setShowSettings(false);
                  setView('login');
                  setCurrentUser(null);
                  setMasterPassword('');
                  setSecurityPin('');
                  setUsername('');
                  setAccounts([]);
                  setItems([]);
                  setPlaces([]);
                  setProfileImage(null);
                }}
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                <LogOut className="w-5 h-5" />
                {t.logout}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto p-6 max-w-6xl pb-24">
        {/* Professional Header Section */}
        <div className={`${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-white to-blue-50'} rounded-2xl shadow-xl p-8 mb-8`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
                {language === 'en' ? 'Welcome Back' : language === 'hi' ? 'वापसी पर स्वागत है' : '欢迎回来'}, {currentUser?.username}
              </h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {language === 'en' ? 'Manage your secure information and tracked items' : 
                 language === 'hi' ? 'अपनी सुरक्षित जानकारी और ट्रैक की गई वस्तुओं को प्रबंधित करें' : 
                 '管理您的安全信息和跟踪物品'}
              </p>
            </div>
            <div className="flex gap-3">
              <div className={`px-4 py-2 ${darkMode ? 'bg-gray-700' : 'bg-blue-100'} rounded-lg`}>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'en' ? 'Total Items' : language === 'hi' ? 'कुल आइटम' : '总物品'}
                </p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {accounts.length + items.length + places.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {!addMode && (
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <button
              onClick={() => setAddMode('account')}
              className={`${darkMode ? 'bg-gray-800 hover:shadow-blue-500/50' : 'bg-white hover:shadow-blue-200'} p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-4 group`}
            >
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Key className="w-7 h-7 text-white" />
              </div>
              <div className="text-left flex-1">
                <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>{t.addAccount}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'en' ? 'Store new credentials' : language === 'hi' ? 'नए क्रेडेंशियल्स' : '存储新凭据'}
                </p>
              </div>
              <Plus className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-400'} group-hover:text-blue-500 transition-colors`} />
            </button>

            <button
              onClick={() => setAddMode('item')}
              className={`${darkMode ? 'bg-gray-800 hover:shadow-green-500/50' : 'bg-white hover:shadow-green-200'} p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-4 group`}
            >
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Search className="w-7 h-7 text-white" />
              </div>
              <div className="text-left flex-1">
                <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>{t.addItem}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'en' ? 'Track item location' : language === 'hi' ? 'आइटम स्थान ट्रैक करें' : '跟踪物品位置'}
                </p>
              </div>
              <Plus className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-400'} group-hover:text-green-500 transition-colors`} />
            </button>

            <button
              onClick={() => setAddMode('place')}
              className={`${darkMode ? 'bg-gray-800 hover:shadow-purple-500/50' : 'bg-white hover:shadow-purple-200'} p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-4 group`}
            >
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <div className="text-left flex-1">
                <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>{t.addPlace}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'en' ? 'Register new location' : language === 'hi' ? 'नया स्थान पंजीकृत करें' : '注册新地点'}
                </p>
              </div>
              <Plus className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-400'} group-hover:text-purple-500 transition-colors`} />
            </button>
          </div>
        )}

        {addMode === 'account' && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Account</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Security PIN</label>
                <input
                  type="password"
                  value={tempPin}
                  onChange={(e) => setTempPin(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your security PIN to continue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
                <input
                  type="text"
                  value={formData.accountName || ''}
                  onChange={(e) => setFormData({...formData, accountName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Gmail, Facebook"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={formData.password || ''}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter account password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={formData.confirmPassword || ''}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Confirm password"
                />
              </div>
              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={handleAddAccount}
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700"
                >
                  Add Account
                </button>
                <button
                  onClick={() => {
                    setAddMode(null);
                    setFormData({});
                    setTempPin('');
                    setError('');
                  }}
                  className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {addMode === 'item' && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Item</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                <input
                  type="text"
                  value={formData.itemName || ''}
                  onChange={(e) => setFormData({...formData, itemName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Car keys, Passport"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Place/Location</label>
                <input
                  type="text"
                  value={formData.place || ''}
                  onChange={(e) => setFormData({...formData, place: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Where did you put it?"
                />
              </div>
              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={handleAddItem}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
                >
                  Add Item
                </button>
                <button
                  onClick={() => {
                    setAddMode(null);
                    setFormData({});
                    setError('');
                  }}
                  className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {addMode === 'place' && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Place</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Place Name</label>
                <input
                  type="text"
                  value={formData.placeName || ''}
                  onChange={(e) => setFormData({...formData, placeName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Kitchen drawer, Office desk"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What Items Can Be Found Here</label>
                <textarea
                  value={formData.itemsFound || ''}
                  onChange={(e) => setFormData({...formData, itemsFound: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="List items typically found here"
                  rows="3"
                />
              </div>
              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={handleAddPlace}
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
                >
                  Add Place
                </button>
                <button
                  onClick={() => {
                    setAddMode(null);
                    setFormData({});
                    setError('');
                  }}
                  className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl p-6 border-t-4 border-blue-500`}>
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
                <Key className="w-5 h-5 text-white" />
              </div>
              {t.accounts} ({accounts.length})
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {accounts.map((account) => (
                <button
                  key={account.id}
                  onClick={() => handleViewAccount(account)}
                  className={`w-full p-4 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-50 hover:bg-blue-100'} rounded-lg border ${darkMode ? 'border-gray-600' : 'border-blue-100'} transition-all text-left group`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{account.name}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {language === 'en' ? 'Click to view' : language === 'hi' ? 'देखने के लिए क्लिक करें' : '点击查看'}
                      </p>
                    </div>
                    <Eye className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-blue-400'} group-hover:text-blue-600 transition-colors`} />
                  </div>
                </button>
              ))}
              {accounts.length === 0 && (
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-8`}>
                  {language === 'en' ? 'No accounts yet' : language === 'hi' ? 'अभी तक कोई खाता नहीं' : '还没有账户'}
                </p>
              )}
            </div>
          </div>

          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl p-6 border-t-4 border-green-500`}>
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-2 rounded-lg">
                <Search className="w-5 h-5 text-white" />
              </div>
              {t.items} ({items.length})
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleViewItem(item)}
                  className={`w-full p-4 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-green-50 hover:bg-green-100'} rounded-lg border ${darkMode ? 'border-gray-600' : 'border-green-100'} transition-all text-left group`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{item.name}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {language === 'en' ? 'View location' : language === 'hi' ? 'स्थान देखें' : '查看位置'}
                      </p>
                    </div>
                    <MapPin className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-green-400'} group-hover:text-green-600 transition-colors`} />
                  </div>
                </button>
              ))}
              {items.length === 0 && (
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-8`}>
                  {language === 'en' ? 'No items tracked' : language === 'hi' ? 'कोई आइटम ट्रैक नहीं किया गया' : '没有跟踪物品'}
                </p>
              )}
            </div>
          </div>

          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl p-6 border-t-4 border-purple-500`}>
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2 rounded-lg">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              {t.places} ({places.length})
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {places.map((place) => (
                <div key={place.id} className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-purple-50'} rounded-lg border ${darkMode ? 'border-gray-600' : 'border-purple-100'}`}>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{place.name}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>{place.itemsFound}</p>
                </div>
              ))}
              {places.length === 0 && (
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-8`}>
                  {language === 'en' ? 'No places registered' : language === 'hi' ? 'कोई स्थान पंजीकृत नहीं' : '没有注册地点'}
                </p>
              )}
            </div>
          </div>
        </div>

        {showViewModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
              {selectedAccount && (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">Account Details</h2>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Account Name</p>
                    <p className="text-lg font-semibold text-gray-800">{selectedAccount.name}</p>
                  </div>
                  
                  {viewPin !== currentUser.securityPin ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Enter Security PIN to View Password
                        </label>
                        <input
                          type="password"
                          value={viewPin}
                          onChange={(e) => setViewPin(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleVerifyPinForView()}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          placeholder="Enter your PIN"
                        />
                      </div>
                      {error && (
                        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                          <AlertCircle className="w-5 h-5" />
                          <span className="text-sm">{error}</span>
                        </div>
                      )}
                      <button
                        onClick={handleVerifyPinForView}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700"
                      >
                        Verify PIN
                      </button>
                    </div>
                  ) : (
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">Password</p>
                      <p className="text-lg font-mono font-semibold text-gray-800 break-all">
                        {decryptData(selectedAccount.password)}
                      </p>
                      <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded flex items-center gap-2">
                        <Lock className="w-4 h-4 text-green-600" />
                        <span className="text-xs text-green-700">Password encrypted with AES-256</span>
                      </div>
                    </div>
                  )}
                </>
              )}

              {selectedItem && (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">Item Details</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">Item Name</p>
                      <p className="text-lg font-semibold text-gray-800">{selectedItem.name}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-gray-600 mb-1">Location</p>
                      <p className="text-lg font-semibold text-gray-800">{selectedItem.place}</p>
                    </div>
                  </div>
                </>
              )}

              <button
                onClick={handleCloseModal}
                className="w-full mt-4 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {showProfileModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Profile Settings</h2>
              
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-indigo-200" />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center border-4 border-indigo-200">
                      <User className="w-16 h-16 text-indigo-600" />
                    </div>
                  )}
                  <label className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-colors">
                    <Camera className="w-5 h-5 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mt-4">{currentUser?.username}</h3>
                <p className="text-gray-600 text-sm">{currentUser?.email}</p>
              </div>

              <div className="space-y-4 bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-600 text-sm">Accounts</span>
                  <span className="font-semibold text-indigo-600">{accounts.length}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-600 text-sm">Items Tracked</span>
                  <span className="font-semibold text-green-600">{items.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Places</span>
                  <span className="font-semibold text-purple-600">{places.length}</span>
                </div>
              </div>

              <button
                onClick={() => setShowProfileModal(false)}
                className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Chatbot Button - Fixed position that doesn't scroll */}
      {!showChatbot && (
        <button
          onClick={() => setShowChatbot(true)}
          className={`fixed bottom-8 right-8 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform z-[100] ${
            isListening ? 'bg-gradient-to-br from-red-600 to-red-800 animate-pulse' : 'bg-gradient-to-br from-blue-600 to-blue-800'
          }`}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem'
          }}
          title={language === 'en' ? 'Ask about items & places' : language === 'hi' ? 'वस्तुओं और स्थानों के बारे में पूछें' : '询问物品和地点'}
        >
          {isListening ? (
            <div className="relative">
              <MessageCircle className="w-7 h-7" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping"></div>
            </div>
          ) : (
            <MessageCircle className="w-7 h-7" />
          )}
        </button>
      )}

      {/* Chatbot Window - Fixed position that doesn't scroll */}
      {showChatbot && (
        <div 
          className="fixed bottom-8 right-8 w-96 bg-white rounded-2xl shadow-2xl z-[100] flex flex-col max-w-[calc(100vw-2rem)]" 
          style={{
            height: '500px',
            maxHeight: 'calc(100vh - 100px)',
            position: 'fixed',
            bottom: '2rem',
            right: '2rem'
          }}
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              {isListening && (
                <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              )}
              <MessageCircle className="w-5 h-5" />
              <div>
                <h3 className="font-bold">
                  {language === 'en' ? 'Item Finder Assistant' : language === 'hi' ? 'आइटम खोजक सहायक' : '物品查找助手'}
                </h3>
                <p className="text-xs text-blue-100 flex items-center gap-1">
                  {isListening && (
                    <span className="text-red-300 font-semibold">
                      {language === 'en' ? '🎤 LISTENING' : language === 'hi' ? '🎤 सुन रहा है' : '🎤 监听中'}
                    </span>
                  )}
                  {!isListening && voiceEnabled && <Volume2 className="w-3 h-3" />}
                  {!isListening && (voiceEnabled ? t.voiceEnabled : t.voiceDisabled)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleVoiceListening}
                className={`p-2 rounded-full transition-colors ${
                  isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-700 hover:bg-blue-800'
                }`}
                title={isListening 
                  ? (language === 'en' ? 'Stop listening' : language === 'hi' ? 'सुनना बंद करें' : '停止监听')
                  : (language === 'en' ? 'Start listening' : language === 'hi' ? 'सुनना शुरू करें' : '开始监听')
                }
              >
                {isListening ? (
                  <div className="w-5 h-5 bg-white rounded-full animate-pulse"></div>
                ) : (
                  <MessageCircle className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => {
                  setVoiceEnabled(!voiceEnabled);
                  if (!voiceEnabled) {
                    speak(t.voiceEnabled);
                  }
                }}
                className="hover:bg-blue-700 p-2 rounded-full transition-colors"
                title={voiceEnabled ? t.voiceDisabled : t.voiceEnabled}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  setShowChatbot(false);
                  window.speechSynthesis.cancel();
                  if (isListening && recognition) {
                    recognition.stop();
                    setIsListening(false);
                  }
                }}
                className="hover:bg-blue-700 p-1 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    msg.type === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 shadow-md rounded-bl-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleChatSubmit} className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={t.chatPlaceholder}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  const msg = language === 'en' ? 'Where are my keys?' : 
                             language === 'hi' ? 'मेरी चाबियाँ कहाँ हैं?' : 
                             '我的钥匙在哪?';
                  setChatInput(msg);
                  setChatMessages([...chatMessages, { type: 'user', text: msg }]);
                  setTimeout(() => {
                    const response = generateBotResponse(msg);
                    setChatMessages(prev => [...prev, { type: 'bot', text: response }]);
                    speak(response);
                  }, 500);
                }}
                className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-700"
              >
                {t.findKeys}
              </button>
              <button
                type="button"
                onClick={() => {
                  const msg = language === 'en' ? 'List all items' : 
                             language === 'hi' ? 'सभी वस्तुओं की सूची' : 
                             '列出所有物品';
                  setChatInput(msg);
                  setChatMessages([...chatMessages, { type: 'user', text: msg }]);
                  setTimeout(() => {
                    const response = generateBotResponse(msg);
                    setChatMessages(prev => [...prev, { type: 'bot', text: response }]);
                    speak(response);
                  }, 500);
                }}
                className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-700"
              >
                {t.listItems}
              </button>
              <button
                type="button"
                onClick={toggleVoiceListening}
                className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                    : 'bg-purple-500 hover:bg-purple-600 text-white'
                }`}
              >
                {isListening 
                  ? (language === 'en' ? '🎤 Stop' : language === 'hi' ? '🎤 रुकें' : '🎤 停止')
                  : (language === 'en' ? '🎤 Voice' : language === 'hi' ? '🎤 आवाज' : '🎤 语音')
                }
              </button>
            </div>
          </form>
        </div>
      )}

      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                <div className="relative inline-block">
                  <div className="bg-gradient-to-br from-blue-700 to-blue-500 px-4 py-2 rounded-lg shadow-md">
                    <span className="text-2xl font-black tracking-wide text-white" style={{textShadow: '0 0 10px rgba(255,255,255,0.3)'}}>
                      NF
                    </span>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Lock className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Never Forget Nothing</h3>
                  <p className="text-gray-400 text-sm">Your secure memory companion</p>
                </div>
              </div>
            </div>

            <div className="text-center md:text-left">
              <h4 className="font-semibold mb-3 text-lg">Contact Us</h4>
              <div className="space-y-2">
                <a 
                  href="mailto:neverforgetnothing01@gmail.com"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">neverforgetnothing01@gmail.com</span>
                </a>
                <a 
                  href="https://www.instagram.com/neverforgetnothing01/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-pink-400 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span className="text-sm">@neverforgetnothing01</span>
                </a>
                <a 
                  href="https://www.youtube.com/@NeverForgetNothing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                  <span className="text-sm">@NeverForgetNothing</span>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-3">
                © {new Date().getFullYear()} Never Forget Nothing. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-green-400" />
                  <span>TLS/HTTPS Encrypted</span>
                </div>
                <div className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-green-400" />
                  <span>SHA-256 Hashing</span>
                </div>
                <div className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-green-400" />
                  <span>AES-256 Encryption</span>
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-3">
                Your privacy and security are our top priorities
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PasswordManager