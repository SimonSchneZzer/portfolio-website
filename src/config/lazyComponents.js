import { lazy } from 'react';

export const HeroSection = lazy(() => import('../components/Hero/HeroSection'));
export const AboutSection = lazy(() => import('../components/About/AboutSection'));
export const CVSection = lazy(() => import('../components/CV/CVSection'));
export const ProjectsSection = lazy(() => import('../components/Projects/ProjectsSection'));
export const ContactSection = lazy(() => import('../components/Contact/ContactSection')); 