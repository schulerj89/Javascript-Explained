const COMMAND_TYPES = {
  FUNCTION: 'function',
  SET_TIMEOUT: 'setTimeout',
  RETURN: 'return',
  VARIABLE: 'variable'
};

const VARIABLE_DECLARATION_REGEX = /^(let|const|var)\s+[a-zA-Z_$][0-9a-zA-Z_$]*\s*=/;
const VARIABLE_MATCH_REGEX = /^(let|const|var)\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*(.*)/;

const parseCode = (code) => {
  const commands = [];
  const lines = code.split('\n');

  lines.forEach(line => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith(COMMAND_TYPES.FUNCTION)) {
      const funcName = trimmedLine.split(' ')[1].split('(')[0];
      commands.push({ type: COMMAND_TYPES.FUNCTION, name: funcName });
    } else if (trimmedLine.startsWith(COMMAND_TYPES.SET_TIMEOUT)) {
        commands.push({ type: COMMAND_TYPES.SET_TIMEOUT, code: 'test', delay: 1000 });
    } else if (trimmedLine.startsWith(COMMAND_TYPES.RETURN)) {
      commands.push({ type: COMMAND_TYPES.RETURN });
    } else if (VARIABLE_DECLARATION_REGEX.test(trimmedLine)) {
      const match = trimmedLine.match(VARIABLE_MATCH_REGEX);
      if (match) {
        const [, , varName, value] = match;
        commands.push({ type: COMMAND_TYPES.VARIABLE, name: varName, value: value.trim() });
      }
    }
  });

  return commands;
};

const executeCommand = (command, setCallStack, setHeap, setWebAPI, setCallbackQueue, speed) => {
  const addToCallStack = (name) => {
    setCallStack(prevStack => [...prevStack, name]);
  };

  const removeFromCallStack = () => {
    setCallStack(prevStack => prevStack.slice(0, -1));
  };

  const addToHeap = (variable) => {
    setHeap(prevHeap => [...prevHeap, variable]);
  };

  const addToCallbackQueue = (task) => {
    setCallbackQueue(prevQueue => [...prevQueue, task]);
  };

  const addToWebAPI = (task) => {
    setWebAPI(prevAPI => [...prevAPI, task]);
  };

  const removeFromWebAPI = (task) => {
    setWebAPI(prevAPI => prevAPI.filter(api => api !== task));
  };

  return new Promise((resolve) => {
    switch (command.type) {
      case COMMAND_TYPES.FUNCTION:
        addToCallStack(`${command.name}()`);
        setTimeout(() => {
          removeFromCallStack();
          resolve();
        }, speed);
        break;
      case COMMAND_TYPES.SET_TIMEOUT:
        const timeoutId = setTimeout(async () => {
          await executeCommands(parseCode(command.code), setCallStack, setHeap, setWebAPI, setCallbackQueue, speed);
          addToCallbackQueue('setTimeout callback');
          removeFromWebAPI(`setTimeout(${timeoutId})`);
          resolve();
        }, command.delay);
        addToWebAPI(`setTimeout(${timeoutId})`);
        break;
      case COMMAND_TYPES.RETURN:
        removeFromCallStack();
        setTimeout(resolve, speed);
        break;
      case COMMAND_TYPES.VARIABLE:
        addToHeap({ name: command.name, value: command.value });
        setTimeout(resolve, speed);
        break;
      default:
        resolve();
    }
  });
};

const executeCommands = async (commands, setCallStack, setHeap, setWebAPI, setCallbackQueue, speed) => {
  for (const command of commands) {
    await executeCommand(command, setCallStack, setHeap, setWebAPI, setCallbackQueue, speed);
  }
};

export const parseAndExecuteCode = async (code, setCallStack, setHeap, setWebAPI, setCallbackQueue, speed) => {
  // Clear previous state
  setCallStack([]);
  setHeap([]);
  setWebAPI([]);
  setCallbackQueue([]);

  const commands = parseCode(code);
  await executeCommands(commands, setCallStack, setHeap, setWebAPI, setCallbackQueue, speed);

  // Delay to allow all setTimeout callbacks to complete
  await new Promise(resolve => setTimeout(resolve, speed + 100));

  // Final pop of main function from call stack
  setCallStack([]);
};
