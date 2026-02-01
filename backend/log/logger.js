const LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const currentlevel = LOG_LEVELS[process.env.LOG_LEVEL] ?? LOG_LEVELS.info;

const canlog = (level) => {
  LOG_LEVELS[level] >= currentlevel;
};

const logger = {
  debug: (...args) => {
    if (canlog("debug")) console.log("[DEBUG]", ...args);
  },
  info: (...args) => {
    if (canlog("info")) console.log("[INFO]", ...args);
  },
  warn: (...args) => {
    if (canlog("warn")) console.log("[WARN]", ...args);
  },
  error: (...args) => {
    if (canlog("error")) console.log("[ERROR]", ...args);
  },
};

export default logger;
