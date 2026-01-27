import React, { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

interface BlurTextProps {
    text: string;
    delay?: number;
    className?: string;
    animateBy?: 'words' | 'letters';
    direction?: 'top' | 'bottom';
    onAnimationComplete?: () => void;
}

const BlurText: React.FC<BlurTextProps> = ({
    text,
    delay = 200,
    className = '',
    animateBy = 'words',
    direction = 'top',
    onAnimationComplete,
}) => {
    const elements = animateBy === 'words' ? text.split(' ') : text.split('');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: delay / 1000,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: {
            filter: 'blur(10px)',
            opacity: 0,
            y: direction === 'top' ? -20 : 20,
        },
        visible: {
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut'
            }
        },
    };

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            onAnimationComplete={onAnimationComplete}
            className={className}
            style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center' }}
        >
            {elements.map((element, index) => (
                <motion.span
                    key={index}
                    variants={itemVariants}
                    style={{
                        display: 'inline-block',
                        whiteSpace: 'pre',
                        willChange: 'filter, opacity, transform'
                    }}
                >
                    {element === '' ? ' ' : element}
                    {animateBy === 'words' && index < elements.length - 1 && ' '}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default BlurText;
