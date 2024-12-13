import { motion } from 'framer-motion';

const shapes = [
  // Arc-like curve
  <path d="M0 200 Q 200 0 400 200" stroke="currentColor" fill="none" strokeWidth="60" />,
  // Wave
  <path d="M0 150 Q 100 50 200 150 Q 300 250 400 150" stroke="currentColor" fill="none" strokeWidth="60" />,
  // Leaf shape
  <path d="M200 0 C 50 100 50 300 200 400 C 350 300 350 100 200 0" stroke="none" fill="currentColor" />,
  // Abstract corner
  <path d="M0 400 C 150 400 400 150 400 0" stroke="currentColor" fill="none" strokeWidth="60" />,
  // Double wave
  <path d="M0 150 Q 100 50 200 150 Q 300 250 400 150 M0 250 Q 100 150 200 250 Q 300 350 400 250" 
    stroke="currentColor" fill="none" strokeWidth="40" />,
  // Circular pattern
  <path d="M200 0 A 200 200 0 0 1 400 200 A 200 200 0 0 1 200 400 A 200 200 0 0 1 0 200 A 200 200 0 0 1 200 0 Z" 
    stroke="currentColor" fill="none" strokeWidth="40" />,
  // Abstract mountain
  <path d="M0 400 L 150 100 L 250 300 L 400 50 L 400 400 Z" 
    stroke="none" fill="currentColor" />,
  // Spiral
  <path d="M200 200 m 0 -150 a 150 150 0 1 0 150 150 a 100 100 0 1 1 -100 100" 
    stroke="currentColor" fill="none" strokeWidth="40" />,
  // Abstract squares
  <path d="M100 100 h 200 v 200 h -200 Z M150 150 h 100 v 100 h -100 Z" 
    stroke="currentColor" fill="none" strokeWidth="40" />,
  // Diagonal pattern
  <path d="M-50 0 L450 500 M-100 50 L400 550 M0 -50 L500 450" 
    stroke="currentColor" fill="none" strokeWidth="30" />
];

const gradients = [
  'from-emerald-400 to-cyan-300',
  'from-blue-400 to-indigo-400',
  'from-purple-400 to-pink-400',
  'from-rose-400 to-orange-400'
];

export default function AbstractShape() {
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <div className={`w-full h-full bg-gradient-to-br ${randomGradient}`}>
      <motion.div
        className="w-full h-full relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full text-white/20"
        >
          {randomShape}
        </svg>
        <div className="absolute inset-0 noise-bg opacity-20" />
      </motion.div>
    </div>
  );
} 