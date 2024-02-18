import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { generateColorByUser } from '../utility/usernameGeneration';
import { FileDisplay } from './FileDisplay';
import { blobToArrayBuffer } from '../utility/fileTransfer';
import { FileChipInfo } from './interfaces';

const InputBox = styled.textarea<{
    $height: string;
    $isDragging: boolean;
    $isDraggingOver: boolean;
}>`
    justify-content: center;
    width: 97%;
    font-family: IBM Plex Sans;
    font-size: 16px;
    box-sizing: border-box;
    background-color: #1a1a1a;
    height: ${(props) => props.$height};
    color: #ffffff;
    border: none;
    display: block;
    resize: none;
    outline: none;
    overflow-y: auto;
    border-radius: 20px;
    padding: 15px;
    margin: auto;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background-color: #transparent;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: grey;
        border-radius: 10px;
        background-clip: content-box;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #666666;
    }
    ${(props) => ({
        ...(props.$isDraggingOver && {
            outline: '2px solid transparent',
            boxShadow: '0 0 0 2px #3498db',
            fontWeight: 'bold'
        }),
        ...(props.$isDragging &&
            !props.$isDraggingOver && {
                outline: '2px solid transparent',
                boxShadow: '0 0 0 2px #3498db'
            })
    })}
`;

interface ChatInputProps {
    onSubmit: (content: string, files: File[]) => void;
}

const MIN_INPUT_HEIGHT = 50;
const MAX_INPUT_HEIGHT = 350;
const MAX_FILES = 5;
const MAX_FILE_SIZE = 10000000;

const ChatInput = (props: ChatInputProps) => {
    const inputBoxRef = useRef<HTMLTextAreaElement>(null);
    const fileDisplayRef = useRef<HTMLDivElement>(null);

    const [chatInput, setChatInput] = useState<string>('');
    const [isDragging, setIsDragging] = useState(false);
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const [files, setFiles] = useState<File[]>([]);

    function handleDragStart() {
        setIsDragging(true);
    }

    function handleDragEnd(ev: any) {
        if (ev.clientX == 0 && ev.clientY == 0) {
            setIsDragging(false);
        }
    }

    useEffect(() => {
        document.addEventListener('dragover', handleDragStart);
        document.addEventListener('dragleave', handleDragEnd);

        return () => {
            document.removeEventListener('dragover', handleDragStart);
            document.removeEventListener('dragleave', handleDragEnd);
        };
    }, []);

    function handleDragOver(ev: React.DragEvent<HTMLTextAreaElement>) {
        setIsDraggingOver(true);
        ev.preventDefault();
    }

    function handleDragOverStart(ev: React.DragEvent<HTMLTextAreaElement>) {
        ev.preventDefault();
        setIsDraggingOver(true);
    }
    function handleDragOverEnd(ev: React.DragEvent<HTMLTextAreaElement>) {
        ev.preventDefault();
        setIsDraggingOver(false);
    }

    function handleDrop(ev: React.DragEvent<HTMLTextAreaElement>) {
        ev.preventDefault();
        const droppedFiles = Array.from(ev.dataTransfer.files);

        if (droppedFiles.length > MAX_FILES) {
            alert(`At most ${MAX_FILES} files can be uploaded at a time`);
            return;
        }

        droppedFiles.forEach((file) => {
            if (file.size > MAX_FILE_SIZE) {
                alert('File size must be less than 10MB');
                return;
            }
        });

        setFiles((prev) => [...prev, ...droppedFiles]);

        setIsDraggingOver(false);
        setIsDragging(false);
    }

    useLayoutEffect(() => {
        autoResize(inputBoxRef);
    }, [files]);

    function autoResize(ref: React.RefObject<HTMLTextAreaElement>) {
        let element: HTMLTextAreaElement | null = ref?.current;
        const fileDisplayHeight = fileDisplayRef?.current?.clientHeight
            ? fileDisplayRef?.current?.clientHeight + 10
            : 0;
        if (
            element &&
            element.scrollHeight >= MIN_INPUT_HEIGHT &&
            element.scrollHeight <= MAX_INPUT_HEIGHT &&
            element.parentElement
        ) {
            element.style.height = '1px';
            element.parentElement.style.height =
                element.scrollHeight + fileDisplayHeight + 'px';
            element.style.height = element.scrollHeight + 'px';
        }
    }

    function handleOnKeyDown(e?: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e == undefined) {
            return;
        }
        if (e.key === 'Enter' && e.shiftKey) {
        } else if (e.key === 'Enter') {
            (chatInput.length > 0 || files.length > 0) &&
                props.onSubmit(chatInput, files);
            setChatInput('');
            setFiles([]);
            if (inputBoxRef?.current?.parentElement && inputBoxRef?.current) {
                inputBoxRef.current.parentElement.style.height = `${MIN_INPUT_HEIGHT}px`;
                inputBoxRef.current.style.height = `${MIN_INPUT_HEIGHT}px`;
            }
            e.preventDefault();
        }
    }

    useEffect(() => {
        inputBoxRef?.current?.addEventListener('input', () =>
            autoResize(inputBoxRef)
        );
        return () => {
            inputBoxRef?.current?.removeEventListener('input', () =>
                autoResize(inputBoxRef)
            );
        };
    }, []);

    return (
        <>
            {files.length > 0 && (
                <FileDisplay
                    fileDisplayRef={fileDisplayRef}
                    files={files.map((file) => {
                        return { fileName: file.name };
                    })}
                />
            )}
            <InputBox
                $height={`${MIN_INPUT_HEIGHT}px`}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={handleOnKeyDown}
                placeholder={
                    isDragging ? 'Drop File Here...' : 'Enter message...'
                }
                ref={inputBoxRef}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragOverStart}
                onDragLeave={handleDragOverEnd}
                $isDragging={isDragging}
                $isDraggingOver={isDraggingOver}
            ></InputBox>
        </>
    );
};

export default ChatInput;
