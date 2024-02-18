import styled from 'styled-components';
import { generateColorByUser } from '../utility/usernameGeneration';
import { FileChipInfo } from './interfaces';
import { downloadFile } from '../utility/fileTransfer';

const FileChipGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: center;
    margin: 0px 30px 10px 30px;
`;

const FileChip = styled.div<{ $backgroundColor: string }>`
    background-color: ${(props) => props.$backgroundColor};
    color: black;
    padding: 5px 10px;
    border-radius: 8px;
    border: 1px solid black;
    font-family: IBM Plex Sans;
    font-size: 16px;
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
            <FileChipGroup ref={fileDisplayRef}>
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
