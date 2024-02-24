import styled from 'styled-components';
import { generateColorByUser } from '../utility/usernameGeneration';
import { FileChipInfo } from './interfaces';
import { downloadFile } from '../utility/fileTransfer';

const FileChipGroup = styled.div<{
    $justifyContent: string;
    $marginBottom: string;
}>`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: ${(props) => props.$justifyContent};
    max-width: 100%;

    flex-wrap: wrap; // Allow chips to wrap instead of overflowing
    margin: ${(props) => `0px 0px ${props.$marginBottom} 0px`};
`;

const FileChip = styled.div<{ $backgroundColor: string }>`
    color: ${(props) => props.$backgroundColor};
    background-color: transparent;
    padding: 8px 16px;
    border: 1px solid ${(props) => props.$backgroundColor};
    font-family: IBM Plex Sans;
    font-size: 12px;
    align-items: center; // Center content within the chip

    &:hover {
        background-color: ${(props) => props.$backgroundColor};
        color: black;
        cursor: pointer;
        transition: all ease-in 0.1s;
    }

    @media (max-width: 550px) {
        padding: 3px 6px; // Reduce padding on smaller screens
    }
`;

interface FileDisplayProps {
    fileDisplayRef?: React.RefObject<HTMLDivElement>;
    files: FileChipInfo[];
    canDownload?: boolean;
}

export const FileDisplay = (props: FileDisplayProps) => {
    const { fileDisplayRef, files, canDownload } = props;

    function handleOnClick(file: FileChipInfo) {
        if (file.data) {
            downloadFile(file as any, file.fileName);
        }
    }

    return (
        <div>
            <FileChipGroup
                ref={fileDisplayRef}
                $justifyContent={canDownload ? 'left' : 'center'}
                $marginBottom={canDownload ? '7px' : '15px'}
            >
                {files.map((file, index) => {
                    return (
                        <FileChip
                            key={index}
                            $backgroundColor={generateColorByUser(
                                file.fileName
                            )}
                            onClick={() => canDownload && handleOnClick(file)}
                        >
                            {file.fileName}
                        </FileChip>
                    );
                })}
            </FileChipGroup>
        </div>
    );
};
