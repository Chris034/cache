// Function to convert a Blob to an ArrayBuffer using FileReader
export const blobToArrayBuffer = (blob: Blob) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = function () {
            resolve(this.result);
        };
        fileReader.onerror = function (error) {
            reject(error);
        };
        fileReader.readAsArrayBuffer(blob);
    });
};

export const downloadFile = async (buffer: any, fileName: string) => {
    const uint8Array = new Uint8Array(buffer.data.data);
    const blob = new Blob([uint8Array.buffer], {
        type: 'application/octet-stream'
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
};
