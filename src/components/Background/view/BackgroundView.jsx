import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    canvas: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        zIndex: -999,
        backgroundColor: 'white'
    }
}))

export const BackgroundView = () => {
    const classes = useStyles()

    return <canvas className={classes.canvas} id="background-canvas"></canvas>
}
