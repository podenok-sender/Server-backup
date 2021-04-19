import 'css-file-icons'
import { Grid, makeStyles, Menu, MenuItem } from '@material-ui/core'

import GetAppIcon from '@material-ui/icons/GetApp'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles(theme => {
    return {
        fileName: {
            width: 50,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            boxSizing: 'border-box'
        },
        center: {
            display: 'inline-block',
            width: '100%',
            textAlign: 'center'
        },
        animate: {
            display: 'inline-block',
            paddingLeft: '100%',
            animation: '$marquee 3000ms linear infinite'
        },
        '@keyframes marquee': {
            '0%': {
                transform: 'translate(0, 0)'
            },
            '100%': {
                transform: 'translate(-100%, 0)'
            }
        }
    }
})

export const FileView = props => {
    const classes = useStyles()

    const {
        name,
        isLocal,
        extensions,
        extension,
        anchorEl,
        handleClick,
        handleClose,
        handleDelete,
        handleDownload,
        calcWidth
    } = props

    return (
        <>
            <div
                onClick={handleClick}
                className={`fi fi-${
                    extensions.includes(extension) ? extension : 'java'
                } fi-size-md fi-round-md`}>
                <div className="fi-content">{extension}</div>
            </div>
            <div className={classes.fileName}>
                <span className={`${calcWidth(name) >= 50 ? classes.animate : classes.center}`}>
                    {name}
                </span>
            </div>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <Grid container>
                    {!isLocal ? (
                        <MenuItem onClick={handleDownload}>
                            <GetAppIcon />
                        </MenuItem>
                    ) : null}
                    <MenuItem onClick={handleDelete}>
                        <DeleteIcon />
                    </MenuItem>
                </Grid>
            </Menu>
        </>
    )
}
