"use client";
import React, { useRef, useState, useEffect } from 'react';
import { Home, Play } from 'lucide-react';
import Header from '@/app/components/header/header';
import Init from '@/app/themes/raw/init';
import PlatformFeatures from '../../components/platform_features';
import Modules from './modules_ui';

export default function RawPage() {
  // const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isReady, setIsReady] = useState(true);

  return (
    
      <Init />

  );
}