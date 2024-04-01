"use client";

import { Menu, MenuButton, MenuItem, RenderProp } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import Image from 'next/image';
import { JSXElementConstructor, PropsWithChildren, ReactElement } from 'react';
import Ellipses from "@/svgs/ellipses.svg";

export default function AppMenu(
  { children, menuButton }:
  PropsWithChildren<{
    menuButton?: RenderProp<Readonly<{ open: boolean; }>, ReactElement<any, string | JSXElementConstructor<any>>>
  }>
) {
  return (
    <Menu menuButton={menuButton ?? <MenuButton><Image src={Ellipses} alt="More Options" /></MenuButton>} transition>
      <MenuItem>Item 1</MenuItem>
      {children}
    </Menu>
  );
}
