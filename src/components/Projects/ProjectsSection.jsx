import { motion } from 'framer-motion';
import styles from './ProjectsSection.module.css';

const ProjectsSection = () => (
  <section className={styles.projects} id="projects">
    <motion.h2
      className={styles.title}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <span className={styles.rule} aria-hidden="true" />
      <span>Projects</span>
    </motion.h2>
  </section>
);

export default ProjectsSection;