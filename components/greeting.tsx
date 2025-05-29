import { motion } from 'framer-motion';

export const Greeting = () => {
  return (
    <div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20 px-8 size-full flex flex-col justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5 }}
        className="text-2xl font-semibold space-y-4"
      >
        <p>Meet Tiffany Tay.</p>
        <p> </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.6 }}
        className="text-2xl text-zinc-500 space-y-4"
      >
        <p>
          Hi! Tiffany built me so you can get to know her. So, ask me anything!
        </p>
        <p>
          Heads up though: I’m still learning and am mostly correct but may
          occasionally come up with answers all by myself.
        </p>
      </motion.div>
    </div>
  );
};
