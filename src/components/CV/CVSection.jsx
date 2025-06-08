import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import styles from './CVSection.module.css';

export default function CVSection({ delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.2 });
  const titleControls = useAnimation();
  const leftColumnControls = useAnimation();
  const rightColumnControls = useAnimation();

  useEffect(() => {
    const animate = (controls, config) => controls.start(config);
    const isMobile = window.innerWidth <= 768;

    if (isInView) {
      animate(titleControls, { opacity: 1, y: 0 });
      if (isMobile) {
        // Mobile animation: simple zoom
        animate(leftColumnControls, { opacity: 1, scale: 1 });
        animate(rightColumnControls, { opacity: 1, scale: 1 });
      } else {
        // Desktop animation: side sliding
        animate(leftColumnControls, { opacity: 1, x: 0 });
        animate(rightColumnControls, { opacity: 1, x: 0 });
      }
    } else {
      animate(titleControls, { opacity: 0, y: -30 });
      if (isMobile) {
        // Mobile animation: simple zoom out
        animate(leftColumnControls, { opacity: 0, scale: 0.8 });
        animate(rightColumnControls, { opacity: 0, scale: 0.8 });
      } else {
        // Desktop animation: side sliding
        animate(leftColumnControls, { opacity: 0, x: -100 });
        animate(rightColumnControls, { opacity: 0, x: 100 });
      }
    }
  }, [isInView, titleControls, leftColumnControls, rightColumnControls]);

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <section id="cv" className={styles.cvSection}>
      <motion.div
        className={styles.title}
        animate={titleControls}
        initial={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6, delay }}
      >
        <span className={styles.rule} />
        <h2>CV</h2>
        <span className={styles.rule} />
      </motion.div>

      <div className={styles.content} ref={ref}>
        <div className={styles.columns}>
          <motion.div
            animate={leftColumnControls}
            initial={isMobile ? 
              { opacity: 0, scale: 0.8 } : 
              { opacity: 0, x: -100 }
            }
            transition={{ duration: 0.6, delay: delay + 0.2 }}
          >
            <h3>Ausbildung</h3>
            <ul>
              {[
                { text: "Fachhochschule Salzburg (seit 09/2023) – Multimedia Technology" },
                { text: "HTL Hallein (2017–2022) – Betriebsinformatik" },
                { text: "Gymnasium Hallein (2013–2017)" }
              ].map((item, i) => (
                <motion.li
                  key={i}
                  custom={i}
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ 
                    x: 10,
                    transition: { duration: 0.2 }
                  }}
                >
                  <strong>{item.text.split(' – ')[0]}</strong>
                  {item.text.includes(' – ') ? ` – ${item.text.split(' – ')[1]}` : ''}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            animate={rightColumnControls}
            initial={isMobile ? 
              { opacity: 0, scale: 0.8 } : 
              { opacity: 0, x: 100 }
            }
            transition={{ duration: 0.6, delay: delay + 0.2 }}
          >
            <h3>Berufserfahrung</h3>
            <ul>
              {[
                { text: "Kinderschutzzentrum Salzburg (Zivildienst, 2022–2023)" },
                { text: "SPAR ICS – Praktika in E-Commerce (2021) & Store Retail (2019)" },
                { text: "Schischule Lech (2018–2021) – Landesschilehrer" }
              ].map((item, i) => (
                <motion.li
                  key={i}
                  custom={i}
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ 
                    x: 10,
                    transition: { duration: 0.2 }
                  }}
                >
                  <strong>{item.text.split(' – ')[0]}</strong>
                  {item.text.includes(' – ') ? ` – ${item.text.split(' – ')[1]}` : ''}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}