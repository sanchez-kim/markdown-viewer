const { app, BrowserWindow, Menu, dialog, shell, protocol, net } = require('electron');
const path = require('path');
const fs = require('fs');
const url = require('node:url');

// Enable live reload for Electron during development
if (process.env.NODE_ENV === 'development') {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron'),
    hardResetMethod: 'exit'
  });
}

let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.cjs'),
      webSecurity: process.env.NODE_ENV === 'development' ? false : true,
      allowRunningInsecureContent: false
    },
    icon: path.join(__dirname, '../../static/favicon.png'),
    titleBarStyle: 'default',
    show: false
  });

  // Load the SvelteKit app
  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    mainWindow.loadURL('http://localhost:3081');
  } else {
    // Load built application using custom protocol
    const indexPath = path.join(__dirname, '../../build/index.html');
    
    if (fs.existsSync(indexPath)) {
      console.log('Loading file via custom protocol:', indexPath);
      
      // Use custom protocol to avoid file:// issues
      mainWindow.loadURL('app://index.html').catch(err => {
        console.error('Failed to load via app protocol:', err);
        // Fallback to direct file loading
        mainWindow.loadFile(indexPath).catch(fallbackErr => {
          console.error('Failed to load index.html:', fallbackErr);
          dialog.showErrorBox('Load Error', `Failed to load application:\n${fallbackErr.message}`);
        });
      });
    } else {
      console.error('Index file not found at:', indexPath);
      dialog.showErrorBox('File Not Found', `Could not find index.html at:\n${indexPath}`);
      app.quit();
    }
  }

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  // 프로덕션에서도 에러 발생 시 DevTools 열기
  if (!isDev) {
    mainWindow.webContents.on('did-fail-load', () => {
      mainWindow.webContents.openDevTools();
    });
  }

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Create application menu
  createMenu();
}

function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open File',
          accelerator: 'CmdOrCtrl+O',
          click: async () => {
            const result = await dialog.showOpenDialog(mainWindow, {
              properties: ['openFile'],
              filters: [
                { name: 'Markdown files', extensions: ['md', 'markdown'] },
                { name: 'All files', extensions: ['*'] }
              ]
            });
            
            if (!result.canceled && result.filePaths.length > 0) {
              const filePath = result.filePaths[0];
              const content = fs.readFileSync(filePath, 'utf8');
              const fileName = path.basename(filePath);
              
              // Send file content to renderer
              mainWindow.webContents.send('file-opened', { content, fileName });
            }
          }
        },
        {
          label: 'Save File',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            mainWindow.webContents.send('save-file');
          }
        },
        { type: 'separator' },
        {
          label: 'Export as PDF',
          accelerator: 'CmdOrCtrl+P',
          click: () => {
            mainWindow.webContents.send('export-pdf');
          }
        },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About Markdown Viewer',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About Markdown Viewer',
              message: 'Markdown Viewer',
              detail: 'A standalone markdown editor with real-time preview.\n\nBuilt with SvelteKit and Electron.'
            });
          }
        },
        {
          label: 'GitHub Repository',
          click: () => {
            shell.openExternal('https://github.com/sanchez-kim/markdown-viewer');
          }
        }
      ]
    }
  ];

  // macOS specific menu adjustments
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    });

    // Window menu
    template[4].submenu = [
      { role: 'close' },
      { role: 'minimize' },
      { role: 'zoom' },
      { type: 'separator' },
      { role: 'front' }
    ];
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Register custom protocol for local file serving
app.whenReady().then(() => {
  // Register a custom protocol to serve local files
  protocol.handle('app', (request) => {
    const filePath = request.url.slice('app://'.length);
    const fullPath = path.resolve(__dirname, '../../build', filePath || 'index.html');
    console.log('Protocol request:', request.url, '-> File:', fullPath);
    return net.fetch(url.pathToFileURL(fullPath).toString());
  });
  
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Security: Prevent navigation to external websites
app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (navigationEvent, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    
    if (parsedUrl.origin !== 'http://localhost:3081' && parsedUrl.protocol !== 'file:') {
      navigationEvent.preventDefault();
    }
  });
});