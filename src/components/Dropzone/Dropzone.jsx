import { useDropzone } from 'react-dropzone'

import { DropzoneView } from './view/DropzoneView'

export const Dropzone = props => {
    const { files, setFiles, handleDownload } = props

    const { open, getRootProps, getInputProps } = useDropzone({
        onDrop: receivedFiles => {
            setFiles([
                ...files,
                ...receivedFiles.filter(
                    receivedFile => !files.find(file => file.name === receivedFile.name)
                )
            ])
        },
        noClick: true
    })

    const deleteFile = name => {
        setFiles(files.filter(file => file.name !== name))
    }

    return (
        <DropzoneView
            files={files}
            open={open}
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            handleDownload={handleDownload}
            deleteFile={deleteFile}
        />
    )
}
