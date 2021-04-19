import { useState } from 'react'
import { FileView } from './view/FileView'

export const File = props => {
    // prettier-ignore
    const extensions = ["mp3", "wav", "aif", "cda", "mid", "midi", "mpa", "mkv", "ogg", "wpa", "wpl", "7z", "zip", "rar", "tar.gz", "pkg", "z", "csv", "dat", "json", "xml", "dat", "db", "dbf", "sql", "ns", "3ds", "max", "ai", "psd", "ttf", "woff", "woff2", "png", "bmp", "jpg", "jpeg", "gif", "tif", "tiff", "svg", "rss", "torrent", "ppt", "pps", "pptx", "odp", "asp", "c", "cs", "java", "jsp", "swift", "php", "hh", "go", "py", "js", "html", "xhtml", "css", "vb", "rb", "scss", "sass", "less", "jsx", "sh", "pl", "xls", "xlsx", "xlsm", "ods", "dll", "bak", "ini", "dmp", "sys", "cfg", "tmp", "icns", "doc", "docx", "log", "txt", "pdf", "avi", "mov", "mp4", "mpg", "mpeg", "mkv", "wmv", "wps", "exe"]

    const match = props.name.match(/\.([0-9a-zA-Z]+$)/)
    const extension = match ? match[1] : props.name.toLowerCase() === 'makefile' ? 'make' : '?'

    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleDelete = () => {
        props.deleteFile()
        handleClose()
    }

    const handleDownload = () => {
        props.handleDownload()
        handleClose()
    }

    const calcWidth = text => {
        const root = document.querySelector('#root')
        const span = document.createElement('span')

        span.appendChild(document.createTextNode(text))
        span.style.display = 'inline-block'
        span.style.visibility = 'none'
        root.append(span)
        const width = window.getComputedStyle(span).width.split('px')[0]
        root.removeChild(span)
        return width
    }

    return (
        <FileView
            name={props.name}
            isLocal={props.isLocal}
            extensions={extensions}
            extension={extension}
            anchorEl={anchorEl}
            handleClick={handleClick}
            handleClose={handleClose}
            handleDelete={handleDelete}
            handleDownload={handleDownload}
            calcWidth={calcWidth}
        />
    )
}
