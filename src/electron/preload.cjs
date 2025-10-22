const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // File operations
  onFileOpened: (callback) => {
    ipcRenderer.on('file-opened', (event, data) => callback(data));
  },
  
  onSaveFile: (callback) => {
    ipcRenderer.on('save-file', () => callback());
  },
  
  onExportPDF: (callback) => {
    ipcRenderer.on('export-pdf', () => callback());
  },
  
  // Platform detection
  platform: process.platform,
  
  // Check if running in Electron
  isElectron: true,
  
  // Remove listeners
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  }
});