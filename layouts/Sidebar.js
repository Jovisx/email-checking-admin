import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import matchPath from 'utils/matchPath';
import { Link } from 'i18n';


const SidebarWrapper = styled.div`
  position: fixed;
  width: 300px;
  height: calc(100% - 80px);
  top: 80px;
  background-color: var(--color-white);
  box-shadow: 0px 0px 5px rgba(0,0,0,.2);
  z-index: 99;
  box-sizing: border-box;
`;

const DesktopMenuWrapper = styled.div`
  align-items: center;

  .sidebar-nav-item {
    cursor: pointer;
    display: flex;
    padding: 16px 20px;
    align-items: center;
    text-transform: uppercase;
    color: var(--color-text-sidebar);
    border-bottom: 1px solid var(--color-border-hover);

    i {
      font-size: 24px;
      margin-right: 6px;
      color: var(--color-text-sidebar);
    }

    span {
      margin-top: 2px;
    }

    &.active {
      color: var(--color-title-sidebar);
      background-color: var(--color-bg-secondary);

      i {
        color: var(--color-title-sidebar);
      }

      ::after {
        content: none;
      }
    }
  }
`;

export const menuItems = {
  emails: {
    label: 'EMAIL POOL',
    icon: 'icon-market',
    link: true,
    href: '/emails',
  },
  process: {
    label: 'PROCESS POOL',
    icon: 'icon-coins',
    link: true,
    href: '/processes',
  }
};

export const getMenuTypeFromRoute = route => {
  const location = matchPath(route, { path: '/:menu' });
  if (location && location.params.menu) {
    return location.params.menu;
  }
  return null;
};

const Sidebar = () => {
  const router = useRouter();
  const selectedMenu = getMenuTypeFromRoute(router.route) || 'eamilPool';

  const desktopMenu = (
    <DesktopMenuWrapper>
      {
        Object.keys(menuItems).map(key => {
          const item = menuItems[key];
          return (
            <Link key={key} href={item.href}>
              <a id="sidebar-nav-exchange" className={`sidebar-nav-item ${key === selectedMenu ? 'active' : ''}`}>
                <i className={item.icon} />
                <span>{item.label}</span>
              </a>
            </Link>
          );
        })
      }
    </DesktopMenuWrapper>
  );

  return (
    <SidebarWrapper>
      {desktopMenu}
    </SidebarWrapper>
  );
};

Sidebar.propTypes = {};

Sidebar.defaultProps = {};

export default Sidebar;
