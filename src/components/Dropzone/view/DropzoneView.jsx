import { Card, CardActionArea, CardContent, Grid, makeStyles, Typography } from '@material-ui/core'

import { File } from '../../File/File'

const useStyles = makeStyles(theme => {
    return {
        card: {
            border: '1px dashed',
            borderColor: 'rgba(0, 0, 0, 0.27)',
            boxShadow: 'none',
            '&:hover': {
                borderColor: 'black'
            }
        },
        cardContent: {
            minHeight: 83,
            maxHeight: 166,
            overflowY: 'auto',
            overflowX: 'hidden'
        }
    }
})

export const DropzoneView = props => {
    const classes = useStyles()

    const { files, open, getRootProps, getInputProps, deleteFile, handleDownload } = props

    return (
        <Card className={classes.card}>
            <CardActionArea disableTouchRipple={true} {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <CardContent
                    className="dropzone-clickable"
                    onClick={e => {
                        if (
                            e.target.className.length &&
                            e.target.className.split(' ').includes('dropzone-clickable')
                        ) {
                            open()
                        }
                    }}>
                    <Grid
                        className={classes.cardContent + ' dropzone-clickable'}
                        container
                        spacing={2}
                        justify="center"
                        alignItems="center">
                        {files.length ? (
                            files.map(file => (
                                <Grid className="dropzone-clickable" key={file.name} item>
                                    <File
                                        deleteFile={() => {
                                            deleteFile(file.name)
                                        }}
                                        isLocal={file.constructor.name === 'File'}
                                        name={file.name}
                                        handleDownload={() => {
                                            handleDownload(false, file.name)
                                        }}
                                    />
                                </Grid>
                            ))
                        ) : (
                            <Grid item className="dropzone-clickable">
                                <Typography className="dropzone-clickable">
                                    Загрузка файлов
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
