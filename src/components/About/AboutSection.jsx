import { lazy, Suspense, useEffect, useRef, useMemo } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import styles from './AboutSection.module.css';
import D3WordCloud from './D3WordCloud';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.2 });
  const gridControls = useAnimation();
  const titleControls = useAnimation();
  const bioControls = useAnimation();
  const cloudControls = useAnimation();

  const skills = useMemo(() => [
    { text: 'JavaScript', value: 80 },
    { text: 'React', value: 50 },
    { text: 'CSS', value: 45 },
    { text: 'Git', value: 45 },
    { text: 'HTML', value: 30 },
    { text: 'UI/UX', value: 30 },
    { text: 'Node.js', value: 25 },
    { text: 'Ruby on Rails', value: 25 },
    { text: 'SASS', value: 25 },
    { text: 'Docker', value: 25 },
    { text: 'Vite', value: 20 },
    { text: 'PHP', value: 20 },
    { text: 'Figma', value: 20 },
    { text: 'Accessibility', value: 20 },
  ], []);

  const cloudOptions = useMemo(() => ({
    rotations: 4,
    rotationAngles: [0, 0],
    fontSizes: [14, 64],
    fontFamily: 'Source Code Pro',
    colors: ['var(--color-white)', 'var(--color-white-secondary)'],
    enableTooltip: false,
    padding: 20,
  }), []);

  useEffect(() => {
    const animate = (controls, config) => controls.start(config);

    if (isInView) {
      animate(titleControls, { opacity: 1, x: 0 });
      animate(gridControls, { opacity: 1, y: 0 });
      animate(bioControls, { opacity: 1, x: 0 });
      animate(cloudControls, { opacity: 1, scale: 1 });
    } else {
      animate(titleControls, { opacity: 0, x: -30 });
      animate(gridControls, { opacity: 0, y: 40 });
      animate(bioControls, { opacity: 0, x: -50 });
      animate(cloudControls, { opacity: 0, scale: 0.8 });
    }
  }, [isInView, gridControls, titleControls, bioControls, cloudControls]);

  const paragraphVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5
      }
    })
  };

  return (
    <section id="about" className={styles.about}>
      <motion.h2
        className={styles.title}
        animate={titleControls}
        initial={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.6 }}
      >
        <span>About</span>
        <span className={styles.rule} aria-hidden="true" />
      </motion.h2>

      <motion.div
        className={styles.grid}
        ref={ref}
        animate={gridControls}
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.article 
          className={styles.bio}
          animate={bioControls}
          initial={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            "I'm a Full-Stack Developer and Web Designer with a passion for creating intuitive and efficient digital experiences. I work with modern web and relevant technologies like HTML, CSS, JavaScript, React, Ruby on Rails, Next.js and many more, always focusing on clean code and great user experience.",
            "With experience in software project management and UI/UX design, I bring both technical expertise and a strong design sense to my work. My goal is to build high-quality, user-friendly applications that make a difference."
          ].map((text, i) => (
            <motion.p
              key={i}
              custom={i}
              variants={paragraphVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ 
                x: 10,
                transition: { duration: 0.2 }
              }}
            >
              {text.split(' ').map((word, j) => {
                const isStrong = ['Full-Stack', 'Developer', 'Web', 'Designer', 'HTML', 'CSS', 'JavaScript', 'React', 'Ruby', 'Rails', 'Next.js', 'clean', 'code', 'great', 'user', 'experience', 'software', 'project', 'management', 'UI/UX', 'design', 'high-quality', 'user-friendly', 'applications'].includes(word.replace(/[.,]/g, ''));
                return isStrong ? <strong key={j}>{word} </strong> : word + ' ';
              })}
            </motion.p>
          ))}
        </motion.article>

        <motion.div 
          className={styles.cloudWrapper}
          animate={cloudControls}
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          <D3WordCloud words={skills} options={cloudOptions} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;