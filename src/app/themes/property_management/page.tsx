import React from 'react';
import { Home, Play } from 'lucide-react';
import PropertyManagementLanding from './landing_module';
import {PropertyManagementFeatures1} from './features1_module';
import PropertyManagementFeatures2 from './features2_module';
import RawGetStarted from '../raw/get_started_module';


export default function PropertyManagementPage() {
  return (
    <>
      <PropertyManagementLanding></PropertyManagementLanding>
      <PropertyManagementFeatures1></PropertyManagementFeatures1>
      <PropertyManagementFeatures2></PropertyManagementFeatures2>
      <RawGetStarted></RawGetStarted>
    </>
  );
}