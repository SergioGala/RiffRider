export const themes = {
  electronic: {
    light: {
      primary: '#00FF00',
      secondary: '#FF00FF',
      background: '#1A1A1A',
      text: '#FFFFFF',
      accent: '#00FFFF',
      hover: '#FF00FF',
      font: "'Orbitron', sans-serif",
      buttonGradient: ' #00FF00',
      boxShadow: '0 0 15px #00FF00',
      animation: {
        name: 'neonPulse',
        keyframes: `
          @keyframes neonPulse {
            0%, 100% { box-shadow: 0 0 5px #00FF00, 0 0 10px #00FF00, 0 0 15px #00FF00, 0 0 20px #00FF00; }
            50% { box-shadow: 0 0 10px #00FF00, 0 0 20px #00FF00, 0 0 30px #00FF00, 0 0 40px #00FF00; }
          }
        `
      },
      pattern: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2300FF00' fill-opacity='0.1'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
    },
    dark: {
      primary: '#00FF00',
      secondary: '#FF00FF',
      background: '#0F0F0F',
      text: '#FFFFFF',
      accent: '#00FFFF',
      hover: '#FF00FF',
      font: "'Orbitron', sans-serif",
      buttonGradient: '#00FF00',
      boxShadow: '0 0 15px #00FF00',
      animation: {
        name: 'electroBeat',
        keyframes: `
          @keyframes electroBeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `
      },
      pattern: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2300FF00' fill-opacity='0.1'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
    }
  },
  
  pop: {
    light: {
      primary: '#FF69B4',
      secondary: '#00CED1',
      background: '#FFF0F5',
      text: '#333333',
      accent: '#FF1493',
      hover: '#40E0D0',
      font: "'Quicksand', sans-serif",
      buttonGradient: 'linear-gradient(45deg, #FF69B4, #00CED1)',
      boxShadow: '0 0 10px #FF69B4',
      animation: {
        name: 'popBounce',
        keyframes: `
          @keyframes popBounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `
      },
      pattern: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23FF69B4' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
    },
    dark: {
      primary: '#FF1493',
      secondary: '#20B2AA',
      background: '#191970',
      text: '#FFFFFF',
      accent: '#FF69B4',
      hover: '#48D1CC',
      font: "'Quicksand', sans-serif",
      buttonGradient: 'linear-gradient(45deg, #FF1493, #20B2AA)',
      boxShadow: '0 0 10px #FF1493',
      animation: {
        name: 'popPulse',
        keyframes: `
          @keyframes popPulse {
            0% { box-shadow: 0 0 0 0 rgba(255, 105, 180, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(255, 105, 180, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 105, 180, 0); }
          }
        `
      },
      pattern: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23FF1493' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
    }
  },
rock: {
  light: {
    primary: '#FF4500',
    secondary: '#1C1C1C',
    background: "#2F4F4F",
    text: '#FFFFFF',
    accent: '#FFA500',
    hover: '#FF6347',
    font: "'Rock Salt', cursive",
    buttonGradient: 'linear-gradient(45deg, #FF4500, #1C1C1C)',
    boxShadow: '0 0 10px #FF4500',
    animation: {
      name: 'rockShake',
      keyframes: `
        @keyframes rockShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544V0h.284zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44.97 9.9 46.386l-9.9-9.9v-2.828zm0 5.657L8.485 47.8 7.07 49.212 0 42.143v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.515 40.485 60h2.83zm-5.657 0L30 52.343 22.344 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4zM59.716 0l-28 28 1.414 1.414L60 2.544V0h-.284zM60 5.373L34.544 30.828l1.414 1.415L60 8.2V5.374zm0 5.656L37.373 33.656l1.414 1.414L60 13.86v-2.83zm0 5.656l-19.8 19.8 1.415 1.413L60 19.514v-2.83zm0 5.657l-16.97 16.97 1.414 1.415L60 25.172v-2.83zM60 28L45.858 42.142l1.414 1.414L60 30.828V28zm0 5.657L48.686 44.97l1.415 1.415 9.9-9.9v-2.828zm0 5.657L51.515 47.8l1.414 1.413 7.07-7.07v-2.83zm0 5.657l-5.657 5.657 1.414 1.415L60 47.8v-2.83zm0 5.657l-2.828 2.83 1.414 1.413L60 53.456v-2.83zM39.9 16.385l1.414-1.414L30 3.658 18.686 14.97l1.415 1.415 9.9-9.9 9.9 9.9zm-2.83 2.828l1.415-1.414L30 9.313 21.515 17.8l1.414 1.413 7.07-7.07 7.07 7.07zm-2.827 2.83l1.414-1.416L30 14.97l-5.657 5.657 1.414 1.415L30 17.8l4.243 4.242zm-2.83 2.827l1.415-1.414L30 20.626l-2.828 2.83 1.414 1.414L30 23.456l1.414 1.414zM56.87 59.414L58.284 58 30 29.716 1.716 58l1.414 1.414L30 32.544l26.87 26.87z' fill='%23FF4500' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")"
  },
  dark: {
    primary: '#FF6347',
    secondary: '#2F4F4F',
    background: '#2C2C2C',
    text: '#FFFFFF',
    accent: '#FFA07A',
    hover: '#FF4500',
    font: "'Rock Salt', cursive",
    buttonGradient: 'linear-gradient(45deg, #FF6347, #2F4F4F)',
    boxShadow: '0 0 10px #FF6347',
    animation: {
      name: 'rockFlash',
      keyframes: `
        @keyframes rockFlash {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544V0h.284zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44.97 9.9 46.386l-9.9-9.9v-2.828zm0 5.657L8.485 47.8 7.07 49.212 0 42.143v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.515 40.485 60h2.83zm-5.657 0L30 52.343 22.344 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4zM59.716 0l-28 28 1.414 1.414L60 2.544V0h-.284zM60 5.373L34.544 30.828l1.414 1.415L60 8.2V5.374zm0 5.656L37.373 33.656l1.414 1.414L60 13.86v-2.83zm0 5.656l-19.8 19.8 1.415 1.413L60 19.514v-2.83zm0 5.657l-16.97 16.97 1.414 1.415L60 25.172v-2.83zM60 28L45.858 42.142l1.414 1.414L60 30.828V28zm0 5.657L48.686 44.97l1.415 1.415 9.9-9.9v-2.828zm0 5.657L51.515 47.8l1.414 1.413 7.07-7.07v-2.83zm0 5.657l-5.657 5.657 1.414 1.415L60 47.8v-2.83zm0 5.657l-2.828 2.83 1.414 1.413L60 53.456v-2.83zM39.9 16.385l1.414-1.414L30 3.658 18.686 14.97l1.415 1.415 9.9-9.9 9.9 9.9zm-2.83 2.828l1.415-1.414L30 9.313 21.515 17.8l1.414 1.413 7.07-7.07 7.07 7.07zm-2.827 2.83l1.414-1.416L30 14.97l-5.657 5.657 1.414 1.415L30 17.8l4.243 4.242zm-2.83 2.827l1.415-1.414L30 20.626l-2.828 2.83 1.414 1.414L30 23.456l1.414 1.414zM56.87 59.414L58.284 58 30 29.716 1.716 58l1.414 1.414L30 32.544l26.87 26.87z' fill='%23FF6347' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")"
  }
},
hiphop: {
  light: {
    primary: '#FFD700',
    secondary: '#4B0082',
    background: '#F5F5F5',
    text: '#000000',
    accent: '#FF4500',
    hover: '#DAA520',
    font: "'Rubik', sans-serif",
    buttonGradient: 'linear-gradient(45deg, #FFD700, #4B0082)',
    boxShadow: '0 0 10px #FFD700',
    animation: {
      name: 'boomBox',
      keyframes: `
        @keyframes boomBox {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
  },
  dark: {
    primary: '#FFD700',
    secondary: '#4B0082',
    background: '#1A1A1A',
    text: '#FFFFFF',
    accent: '#FF4500',
    hover: '#DAA520',
    font: "'Rubik', sans-serif",
    buttonGradient: 'linear-gradient(45deg, #FFD700, #4B0082)',
    boxShadow: '0 0 15px #FFD700',
    animation: {
      name: 'scratch',
      keyframes: `
        @keyframes scratch {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
  }
},
jazz: {
  light: {
    primary: '#8B4513',
    secondary: '#DEB887',
    background: ' #F4A460',
    text: '#000000',
    accent: '#CD853F',
    hover: '#D2691E',
    font: "'Playfair Display', serif",
    buttonGradient: 'linear-gradient(45deg, #8B4513, #DEB887)',
    boxShadow: '0 0 10px rgba(139, 69, 19, 0.5)',
    animation: {
      name: 'smoothJazz',
      keyframes: `
        @keyframes smoothJazz {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.05) rotate(2deg); }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B4513' fill-opacity='0.1'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
  },
  dark: {
    primary: '#CD853F',
    secondary: '#8B4513',
    background: ' #2F1E0E',
    text: '#FFDAB9',
    accent: '#DEB887',
    hover: '#D2691E',
    font: "'Playfair Display', serif",
    buttonGradient: 'linear-gradient(45deg, #CD853F, #8B4513)',
    boxShadow: '0 0 15px rgba(205, 133, 63, 0.5)',
    animation: {
      name: 'jazzImprov',
      keyframes: `
        @keyframes jazzImprov {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-5px) rotate(-2deg); }
          75% { transform: translateY(5px) rotate(2deg); }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23CD853F' fill-opacity='0.1'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
  }
},
classical: {
  light: {
    primary: '#B8860B',
    secondary: '#4169E1',
    background: '#FFFFF0',
    text: '#000000',
    accent: '#8B0000',
    hover: '#DAA520',
    font: "'Orbitron', sans-serif",
    buttonGradient: 'linear-gradient(45deg, #B8860B, #4169E1)',
    boxShadow: '0 0 10px rgba(184, 134, 11, 0.5)',
    animation: {
      name: 'conductorWave',
      keyframes: `
        @keyframes conductorWave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23B8860B' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")"
  },
  dark: {
    primary: '#DAA520',
    secondary: '#4169E1',
    background: ' #1C1C1C',
    text: '#F5F5DC',
    accent: '#8B0000',
    hover: '#B8860B',
    font: "'Orbitron', sans-serif",
    buttonGradient: 'linear-gradient(45deg, #DAA520, #4169E1)',
    boxShadow: '0 0 15px rgba(218, 165, 32, 0.5)',
    animation: {
      name: 'orchestraRise',
      keyframes: `
        @keyframes orchestraRise {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.05); }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23DAA520' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")"
  }
},
reggae: {
  light: {
    primary: '#009E49',
    secondary: '#FED100',
    background: '#E6F3FF',
    text: '#000000',
    accent: '#EE2737',
    hover: '#00C957',
    font:  "Rastafari",
    buttonGradient: 'linear-gradient(45deg, #009E49, #FED100)',
    boxShadow: '0 0 10px rgba(0, 158, 73, 0.5)',
    animation: {
      name: 'reggaeVibe',
      keyframes: `
        @keyframes reggaeVibe {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23009E49' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
  },
  dark: {
    primary: '#00C957',
    secondary: '#FFD700',
    background: ' #2C2C2C',
    text: '#FFFFFF',
    accent: '#FF4500',
    hover: '#32CD32',
    font: "Rastafari",
    buttonGradient: 'linear-gradient(45deg, #00C957, #FFD700)',
    boxShadow: '0 0 15px rgba(0, 201, 87, 0.5)',
    animation: {
      name: 'reggaeGroove',
      keyframes: `
        @keyframes reggaeGroove {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-1deg); }
          75% { transform: rotate(1deg); }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300C957' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
  }
},
metal: {
  light: {
    primary: '#C0C0C0',
    secondary: '#8B0000',
    background: ' #D3D3D3',
    text: '#000000',
    accent: '#FF4500',
    hover: '#B8860B',
    font: "Metal Mania",
    buttonGradient: 'linear-gradient(45deg, #C0C0C0, #8B0000)',
    boxShadow: '0 0 10px rgba(192, 192, 192, 0.7)',
    animation: {
      name: 'metalShine',
      keyframes: `
        @keyframes metalShine {
          0% { filter: brightness(100%); }
          50% { filter: brightness(150%); }
          100% { filter: brightness(100%); }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
  },
  dark: {
    primary: '#1C1C1C',
    secondary: '#8B0000',
    background: ' #1A1A1A',
    text: '#FFFFFF',
    accent: '#FF4500',
    hover: '#C0C0C0',
    font: "Metal Mania",
    buttonGradient: 'linear-gradient(45deg, #1C1C1C, #8B0000)',
    boxShadow: '0 0 15px rgba(139, 0, 0, 0.7)',
    animation: {
      name: 'metalBurn',
      keyframes: `
        @keyframes metalBurn {
          0%, 100% { box-shadow: 0 0 5px #FF4500; }
          50% { box-shadow: 0 0 20px #FF4500, 0 0 30px #8B0000; }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
  }
},
punk: {
  light: {
    primary: '#FF1493',
    secondary: '#000000',
    background: ' #FFFFFF',
    text: '#000000',
    accent: '#00FF00',
    hover: '#FF4500',
    font: "VT323",
    buttonGradient: 'linear-gradient(45deg, #FF1493, #000000)',
    boxShadow: '0 0 10px rgba(255, 20, 147, 0.7)',
    animation: {
      name: 'punkRock',
      keyframes: `
        @keyframes punkRock {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FF1493' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")"
  },
  dark: {
    primary: '#FF1493',
    secondary: '#FFFFFF',
    background: '#1A1A1A',
    text: '#FFFFFF',
    accent: '#00FF00',
    hover: '#FF4500',
    font: "VT323",
    buttonGradient: 'linear-gradient(45deg, #FF1493, #FFFFFF)',
    boxShadow: '0 0 15px rgba(255, 20, 147, 0.7)',
    animation: {
      name: 'punkAnarchy',
      keyframes: `
        @keyframes punkAnarchy {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FF1493' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")"
  }
},
folk: {
  light: {
    primary: '#8B4513',
    secondary: '#6B8E23',
    background: ' #F0E68C',
    text: '#000000',
    accent: '#D2691E',
    hover: '#556B2F',
    font:  "Dancing Script",
    buttonGradient: 'linear-gradient(45deg, #8B4513, #6B8E23)',
    boxShadow: '0 0 10px rgba(139, 69, 19, 0.5)',
    animation: {
      name: 'folkStrumming',
      keyframes: `
        @keyframes folkStrumming {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px) rotate(-1deg); }
          75% { transform: translateX(2px) rotate(1deg); }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B4513' fill-opacity='0.15'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
  },
  dark: {
    primary: '#D2691E',
    secondary: '#556B2F',
    background: '#3C3C3C',
    text: '#F5DEB3',
    accent: '#8B4513',
    hover: '#6B8E23',
    font:  "Dancing Script",
    buttonGradient: 'linear-gradient(45deg, #D2691E, #556B2F)',
    boxShadow: '0 0 15px rgba(210, 105, 30, 0.5)',
    animation: {
      name: 'folkDance',
      keyframes: `
        @keyframes folkDance {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D2691E' fill-opacity='0.15'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
  }
},
rnb: {
  light: {
    primary: '#9932CC',
    secondary: '#FF8C00',
    background: '#F8F8FF',
    text: '#000000',
    accent: '#4B0082',
    hover: '#DDA0DD',
    font: "Roboto Condensed",
    buttonGradient: 'linear-gradient(45deg, #9932CC, #FF8C00)',
    boxShadow: '0 0 10px rgba(153, 50, 204, 0.5)',
    animation: {
      name: 'rnbGroove',
      keyframes: `
        @keyframes rnbGroove {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.05) rotate(1deg); }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239932CC' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")"
  },
  dark: {
    primary: '#8A2BE2',
    secondary: '#FFA500',
    background: ' #4B0082',
    text: '#FFFFFF',
    accent: '#FF69B4',
    hover: '#9370DB',
    font: "Roboto Condensed",
    buttonGradient: 'linear-gradient(45deg, #8A2BE2, #FFA500)',
    boxShadow: '0 0 15px rgba(138, 43, 226, 0.5)',
    animation: {
      name: 'rnbSoulful',
      keyframes: `
        @keyframes rnbSoulful {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238A2BE2' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")"
  }
},
disco: {
  light: {
    primary: '#FF69B4',
    secondary: '#FFD700',
    background: ' #F0F8FF',
    text: '#000000',
    accent: '#00CED1',
    hover: '#FF1493',
    font: "Monoton",
    buttonGradient: 'linear-gradient(45deg, #FF69B4, #FFD700)',
    boxShadow: '0 0 10px rgba(255, 105, 180, 0.7)',
    animation: {
      name: 'discoFever',
      keyframes: `
        @keyframes discoFever {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.05) rotate(-5deg); }
          75% { transform: scale(1.05) rotate(5deg); }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF69B4' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
  },
  dark: {
    primary: '#FF1493',
    secondary: '#FFD700',
    background: ' #4B0082',
    text: '#FFFFFF',
    accent: '#00FFFF',
    hover: '#FF69B4',
    font: "Monoton",
    buttonGradient: 'linear-gradient(45deg, #FF1493, #FFD700)',
    boxShadow: '0 0 15px rgba(255, 20, 147, 0.7)',
    animation: {
      name: 'discoNights',
      keyframes: `
        @keyframes discoNights {
          0%, 100% { box-shadow: 0 0 5px #FF1493, 0 0 10px #FFD700, 0 0 15px #00FFFF; }
          50% { box-shadow: 0 0 10px #FF1493, 0 0 20px #FFD700, 0 0 30px #00FFFF; }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF1493' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
  }
},
techno: {
  light: {
    primary: '#00FFFF',
    secondary: '#FF00FF',
    background: ' #E0E0E0',
    text: '#000000',
    accent: '#00FF00',
    hover: '#0000FF',
    font: "'Orbitron', sans-serif",
    buttonGradient: 'linear-gradient(45deg, #00FFFF, #FF00FF)',
    boxShadow: '0 0 10px rgba(0, 255, 255, 0.7)',
    animation: {
      name: 'technoBeats',
      keyframes: `
        @keyframes technoBeats {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300FFFF' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
  },
  dark: {
    primary: '#00FFFF',
    secondary: '#FF00FF',
    background: ' #000000',
    text: '#FFFFFF',
    accent: '#00FF00',
    hover: '#0000FF',
    font: "'Orbitron', sans-serif",
    buttonGradient: 'linear-gradient(45deg, #00FFFF, #FF00FF)',
    boxShadow: '0 0 15px rgba(0, 255, 255, 0.7)',
    animation: {
      name: 'technoPulse',
      keyframes: `
        @keyframes technoPulse {
          0%, 100% { box-shadow: 0 0 5px #00FFFF, 0 0 10px #FF00FF; }
          50% { box-shadow: 0 0 20px #00FFFF, 0 0 30px #FF00FF; }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300FFFF' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
  }
},
indie: {
  light: {
    primary: '#FF6347',
    secondary: '#48D1CC',
    background: ' #F5F5F5',
    text: '#333333',
    accent: '#FFA07A',
    hover: '#20B2AA',
    font: "'Courier Prime', monospace",
    buttonGradient: 'linear-gradient(45deg, #FF6347, #48D1CC)',
    boxShadow: '0 0 10px rgba(255, 99, 71, 0.5)',
    animation: {
      name: 'indieVinylSpin',
      keyframes: `
        @keyframes indieVinylSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6347' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
  },
  dark: {
    primary: '#FF6347',
    secondary: '#48D1CC',
    background: ' #34495E',
    text: '#FFFFFF',
    accent: '#FFA07A',
    hover: '#20B2AA',
    font: "Pacifico",
    buttonGradient: 'linear-gradient(45deg, #FF6347, #48D1CC)',
    boxShadow: '0 0 15px rgba(255, 99, 71, 0.5)',
    animation: {
      name: 'indieGuitarStrum',
      keyframes: `
        @keyframes indieGuitarStrum {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6347' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
  }
},
grunge: {
  light: {
    primary: '#8B0000',
    secondary: '#2F4F4F',
    background: ' #A9A9A9',
    text: '#000000',
    accent: '#CD5C5C',
    hover: '#556B2F',
    font: "Pacifico",
    buttonGradient: 'linear-gradient(45deg, #8B0000, #2F4F4F)',
    boxShadow: '0 0 10px rgba(139, 0, 0, 0.5)',
    animation: {
      name: 'grungeDistortion',
      keyframes: `
        @keyframes grungeDistortion {
          0%, 100% { transform: skew(0deg); }
          25% { transform: skew(2deg); }
          75% { transform: skew(-2deg); }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238B0000' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")"
  },
  dark: {
    primary: '#8B0000',
    secondary: '#2F4F4F',
    background: '#1C1C1C',
    text: '#D3D3D3',
    accent: '#CD5C5C',
    hover: '#556B2F',
    font: "'Grunge', sans-serif",
    buttonGradient: 'linear-gradient(45deg, #8B0000, #2F4F4F)',
    boxShadow: '0 0 15px rgba(139, 0, 0, 0.5)',
    animation: {
      name: 'grungeFeedback',
      keyframes: `
        @keyframes grungeFeedback {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238B0000' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")"
  }
},
synthwave: {
  light: {
    primary: '#FF1493',
    secondary: '#00FFFF',
    background: '#FF6AD5',
    text: '#FFFFFF',
    accent: '#FFA500',
    hover: '#FF00FF',
    font: "Audiowide",
    buttonGradient: 'linear-gradient(45deg, #FF1493, #00FFFF)',
    boxShadow: '0 0 10px rgba(255, 20, 147, 0.7)',
    animation: {
      name: 'synthwaveGlow',
      keyframes: `
        @keyframes synthwaveGlow {
          0%, 100% { text-shadow: 0 0 5px #FF1493, 0 0 10px #FF1493; }
          50% { text-shadow: 0 0 20px #FF1493, 0 0 30px #00FFFF; }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF1493' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
  },
  dark: {
    primary: '#FF1493',
    secondary: '#00FFFF',
    background: ' #4B0082',
    text: '#FFFFFF',
    accent: '#FFA500',
    hover: '#FF00FF',
    font: "Audiowide",
    buttonGradient: 'linear-gradient(45deg, #FF1493, #00FFFF)',
    boxShadow: '0 0 15px rgba(255, 20, 147, 0.7)',
    animation: {
      name: 'synthwavePulse',
      keyframes: `
        @keyframes synthwavePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF1493' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
  }
},
lofi: {
  light: {
    primary: '#20B2AA',
    secondary: '#FFA07A',
    background: '#F0F8FF',
    text: '#4A4A4A',
    accent: '#DDA0DD',
    hover: '#5F9EA0',
    font: "Gloria Hallelujah",
    buttonGradient: 'linear-gradient(45deg, #20B2AA, #FFA07A)',
    boxShadow: '0 0 10px rgba(32, 178, 170, 0.3)',
    animation: {
      name: 'lofiWave',
      keyframes: `
        @keyframes lofiWave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2320B2AA' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
  },
  dark: {
    primary: '#20B2AA',
    secondary: '#FFA07A',
    background: ' #34495E',
    text: '#E0E0E0',
    accent: '#DDA0DD',
    hover: '#5F9EA0',
    font: "Gloria Hallelujah",
    buttonGradient: 'linear-gradient(45deg, #20B2AA, #FFA07A)',
    boxShadow: '0 0 15px rgba(32, 178, 170, 0.3)',
    animation: {
      name: 'lofiVinyl',
      keyframes: `
        @keyframes lofiVinyl {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `
    },
    pattern: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2320B2AA' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
  }
}
};

