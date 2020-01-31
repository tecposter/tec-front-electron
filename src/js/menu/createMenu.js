import { Menu } from 'electron';
import ctrl from '../ctrl';

const isMac = process.platform === 'darwin';
const mainCtrl = ctrl.getMainCtrl();

const createMenu = () => {
  const template = [
    ...(isMac ? [{
      label: 'TecPoster',
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    }] : []),

    {
      label: 'Post',
      submenu: [
        {
          label: 'New Post',
          accelerator: 'CmdOrCtrl+N',
          click: () => mainCtrl.triggerCreatePost(),
        },
        {
          label: 'Edit Post',
          accelerator: 'CmdOrCtrl+E',
          click: () => mainCtrl.triggerEditPost(),
        },
      ],
    },

    {
      label: 'Edit',
      submenu: [
        {
          role: 'undo',
        },
        {
          role: 'redo',
        },
        {
          type: 'separator',
        },
        {
          role: 'cut',
        },
        {
          role: 'copy',
        },
        {
          role: 'paste',
        },
      ],
    },

    {
      label: 'View',
      submenu: [
        {
          role: 'reload',
        },
        {
          role: 'toggledevtools',
        },
        {
          type: 'separator',
        },
        {
          role: 'resetzoom',
        },
        {
          role: 'zoomin',
        },
        {
          role: 'zoomout',
        },
        {
          type: 'separator',
        },
        {
          role: 'togglefullscreen',
        },
      ],
    },

    {
      role: 'window',
      submenu: [
        {
          role: 'minimize',
        },
        {
          role: 'close',
        },
      ],
    },

    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  return menu;
};

export default createMenu;
