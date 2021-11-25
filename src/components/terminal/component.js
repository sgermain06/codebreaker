import React, { useEffect, useState, useRef, useCallback } from 'react';
import clsx from 'clsx';

import { makeStyles } from '@mui/styles';

import isEmpty from 'lodash/isEmpty';

import styles from './styles';

const useStyles = makeStyles(styles);

function Terminal(props) {

    const classes = useStyles();

    const codeRef = useRef(null);
    const inputRef = useRef(null);

    const {
        terminalController,
        terminalLines,
        addLine,
        updateLine,
        updateCurrentLine,
        appendLine,
        appendCurrentLine,
        clearTerminal,
    } = props;

    const prompt = '$ ';

    const [previousCommandIndex, setPreviousCommandIndex] = useState(-1);
    const [cursorPosition, setCursorPosition] = useState(0);
    const [cursorOffset, setCursorOffset] = useState(0);
    const [focus, setFocus] = useState(false);
    const [commandLoaded, setCommandLoaded] = useState(true);
    const [stdInCallback, setStdInCallback] = useState(null);
    const [stdInCharacterMode, setStdInCharacterMode] = useState(false);

    const handleStdIn = (callback, { characterMode = false } = {}) => {
        setStdInCharacterMode(characterMode);
        setStdInCallback(() => callback);
    }

    const terminalOutput = (data, stream, {
        prompt = '',
        lineIndex = -1,
        characterMode = false,
        updateMode = false,
        caretAtEnd = true,
        color,
    } = {}) => {
        if (caretAtEnd) {
            setCursorOffset(data.length);
        }

        if (color) {
            data = `^[${color};${data}^]`;
        }

        if (lineIndex !== -1) {
            if (characterMode) {
                appendLine(lineIndex, data);
            }
            else {
                updateLine(lineIndex, { prompt, value: data, error: stream === 'stderr' });
            }
        }
        else {
            if (characterMode) {
                appendCurrentLine(data);
            }
            else {
                if (updateMode) {
                    updateCurrentLine({ prompt, value: data, error: stream === 'stderr' });
                }
                else {
                    addLine({ prompt, value: data, error: stream === 'stderr' });
                }
            }
        }
    };

    const handleStdOut = (data, options) => {
        terminalOutput(data, 'stdout', options);
    };

    const handleStdErr = (data, options) => {
        terminalOutput(data, 'stderr', { ...options, prompt: '\u2718 ' });
    };

    terminalController.attachTerminal({
        stdin: handleStdIn,
        stdout: handleStdOut,
        stderr: handleStdErr,
    });

    // Window key capture handling
    useEffect(() => {
        inputRef.current.focus();
        window.onkeydown = (e) => {
            // Catching Ctrl + E and Ctrl + L
            if (e.ctrlKey) {
                switch (e.keyCode) {
                    case 76:
                    case 69:
                        e.preventDefault();
                        break;
                    default:
                        break;
                }
            }
        }

        return () => {
            window.onkeydown = null;
        }
    }, []);

    const newLine = useCallback(() => {
        addLine({ prompt, value: '' });
        setCursorPosition(0);
    }, [addLine, prompt]);
    
    // Window scrolling to the bottom
    useEffect(() => {
        codeRef.current.scrollTop = codeRef.current.scrollHeight - codeRef.current.clientHeight;
        if (isEmpty(terminalLines)) {
            newLine();
        }
    }, [terminalLines, codeRef, newLine]);

    useEffect(() => {
        if (commandLoaded) {
            inputRef.current.value = '';
        }
    }, [commandLoaded]);

    const terminalFunctions = {
        clear: () => {
            clearTerminal();
        },
    };

    const handleKeyUp = async (event) => {
        if (!commandLoaded && !stdInCallback) return;

        switch (event.key) {
            case 'a': 
                if (event.ctrlKey) {
                    event.preventDefault();
                    event.currentTarget.selectionStart = event.currentTarget.selectionEnd = 0;
                }
                break;
            case 'e': 
                if (event.ctrlKey) {
                    event.preventDefault();
                    event.currentTarget.selectionStart = event.currentTarget.selectionEnd = event.currentTarget.value.length;
                }
                break;
            case 'c':
                if (event.ctrlKey) {
                    event.preventDefault();
                    setPreviousCommandIndex(-1);
                    if (stdInCallback) {
                        stdInCallback('^C');
                    }
                    else {
                        updateCurrentLine({ prompt, value: `${event.currentTarget.value}^C`});
                        newLine();
                    }
                    event.currentTarget.value = '';
                }
                break;
            case 'l':
                if (event.ctrlKey) {
                    terminalFunctions.clear();
                }
                break;
            case 'Enter':
                setPreviousCommandIndex(-1);
                if (stdInCallback) {
                    stdInCallback('\n');
                    event.target.value = '';
                }
                else {
                    // addLine({ prompt, value: event.currentTarget.value });
                    if (event.currentTarget.value.trim() !== '') {
                        setCommandLoaded(false);
                        const command = event.target.value;
                        event.target.value = '';
                        const commandReturn = await terminalController.command(command) || { value: '' };
                        setCommandLoaded(true);
                        if (commandReturn.command) {
                            if (terminalFunctions[commandReturn.command]) {
                                terminalFunctions[commandReturn.command]();
                            }
                        }
                        else {
                            newLine();
                        }
                        event.target.value = '';
                    }
                    else {
                        event.target.value = '';
                        newLine();
                    }
                }
                break;

            case 'ArrowUp':
                if (event.shiftKey || event.ctrlKey) {
                    event.preventDefault();
                }
                if (previousCommandIndex < terminalController.history.length) {
                    const nextIndex = previousCommandIndex + 1;
                    if (nextIndex < terminalController.history.length) {
                        const value = terminalController.history[nextIndex].command;
                        event.currentTarget.value = value;
                        updateCurrentLine({ prompt, value });
                        setCursorPosition(value.length);
                        setPreviousCommandIndex(nextIndex);
                    }
                }
                break;

            case 'ArrowDown':
                if (event.shiftKey || event.ctrlKey) {
                    event.preventDefault();
                }
                if (previousCommandIndex > -1) {
                    const nextIndex = previousCommandIndex - 1;
                    let value = '';
                    if (nextIndex >= 0) {
                        value = terminalController.history[nextIndex].command;
                    }
                    event.currentTarget.value = value;
                    setCursorPosition(value.length);
                    updateCurrentLine({ prompt, value });
                    setPreviousCommandIndex(nextIndex);
                }
                break;

            default:
                break;
        }
    }

    const handleChange = (event) => {
        if (stdInCallback) {
            stdInCallback(event.currentTarget.value);
            if (stdInCharacterMode) {
                event.currentTarget.value = '';
            }
        }
        else {
            if (commandLoaded) {
                updateCurrentLine({ prompt, value: event.currentTarget.value });
            }
            else {
                event.currentTarget.value = '';
            }
        }
    }

    const handleSelect = (event) => {
        if (event.currentTarget.selectionStart !== event.currentTarget.selectionEnd) {
            event.currentTarget.selectionStart = event.currentTarget.selectionEnd;
        }
        setCursorPosition(event.currentTarget.selectionStart);
    }

    const handleCodeSelect = () => {
        if (document.getSelection().toString() === '') {
            inputRef.current.focus();
        };
    }

    const displayPrompt = (prompt, error = false) => <span className={clsx(error ? classes.error : classes.prompt)}>{prompt}</span>;

    const displayLine = line => {
        const colorRegex = /\^\[(.*?);(.*?)\^\]/g;
        const matches = [...line.matchAll(colorRegex)];
        if (isEmpty(matches)) {
            return <span>{line}</span>;
        }
        else {
            const returnElements = [];
            let remainder = line;
            matches.forEach(match => {
                const [ original, color, text ] = match;
                const split = remainder.split(original, 2);
                if (!isEmpty(split[0])) {
                    returnElements.push({ text: split[0] });
                }
                returnElements.push({ color, text })
                remainder = split[1];
            });
            if (!isEmpty(remainder)) {
                returnElements.push({ text: remainder });
            }

            return returnElements.map((element, index) => {
                if (element.color) {
                    return <span key={index} style={{ color: element.color }}>{element.text}</span>
                }
                else {
                    return <span key={index}>{element.text}</span>
                }
            });
        }
    };
    const displayLineWithCursor = line => <span>{line.value.slice(0, (cursorPosition + cursorOffset))}<span className={clsx(classes.cursor, (focus && commandLoaded) ? classes.active : '')}>{line.value[cursorPosition + cursorOffset] || '\u00a0'}</span>{line.value.slice(cursorPosition + cursorOffset + 1)}</span>;

    console.log(terminalLines);
    return (
        <div className={classes.root}>
            <div className={classes.header}>Terminal</div>
            <div className={classes.screen}>
                <input onSelect={handleSelect} ref={inputRef} className={classes.input} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} onKeyUp={handleKeyUp} onChange={handleChange} />
                <code ref={codeRef} className={classes.content} onMouseUp={handleCodeSelect} tabIndex={-1} onKeyUp={() => inputRef.current.focus()}>
                    {terminalLines.map((line, index) => 
                        <div key={`terminalLine-${index}`}>
                            <span className={clsx(line.error ? classes.commandError : '')}>
                                {line.prompt && displayPrompt(line.prompt, line.error)}
                                {
                                    (index < terminalLines.length - 1)
                                        ? displayLine(line.value)
                                        : displayLineWithCursor(line)
                                }
                            </span>
                        </div>
                    )}
                </code>
            </div>
        </div>
    );
};

export default Terminal;