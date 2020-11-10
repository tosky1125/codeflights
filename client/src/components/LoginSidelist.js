import React from 'react';
import * as FaIcons from 'react-icons/fa';

const SidebarUserData = [
  {
    title: 'Main',
    path: '/',
    icon: <FaIcons.FaHome />,
    className: 'nav-text',
  },
  {
    title: 'My Page',
    path: '/mypage',
    icon: <FaIcons.FaUserCircle />,
    className: 'nav-text',
  },
  {
    title: 'POSTING',
    path: '/posting',
    icon: <FaIcons.FaTelegramPlane />,
    className: 'nav-text',
  },
];

export default SidebarUserData;
