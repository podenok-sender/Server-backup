import { Dropzone } from '../../Dropzone/Dropzone'

import {
    Button,
    Fade,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    LinearProgress,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Tooltip
} from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'

const useStyles = makeStyles(theme => ({
    gridContainer: {
        padding: theme.spacing(3),
        maxWidth: 400,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 4
    },
    gridItem: {
        width: '100%'
    },
    cursorHelp: {
        cursor: 'auto'
    },
    tooltip: {
        fontSize: 14,
        maxWidth: 220
    },
    select: {
        maxHeight: 250
    }
}))

export const FormView = props => {
    const classes = useStyles()
    const {
        code,
        values,
        handleChange,
        files,
        setFiles,
        handleInfo,
        handleDownload,
        handleSave,
        handleSend,
        progress,
        regExps
    } = props

    const disabled = props.disabled || values.code.error

    return (
        <form>
            <Grid className={classes.gridContainer} container spacing={2}>
                <Grid item xs={12}>
                    <Fade in={progress}>
                        <LinearProgress
                            style={{
                                borderRadius: 4
                            }}></LinearProgress>
                    </Fade>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="code"
                        error={Boolean(values.code.error)}
                        helperText={values.code.error}
                        value={values.code.value}
                        onChange={e => {
                            handleChange(e, regExps.code, 'Некорректный код', [''])
                        }}
                        className={classes.gridItem}
                        id="outlined-basic"
                        label="Код лабораторной"
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <Tooltip
                                    arrow
                                    classes={{ tooltip: classes.tooltip }}
                                    title="Код состоит из 32 символов. Оставьте пустым для загрузки новой лабораторной"
                                    placement="top">
                                    <InputAdornment className={classes.cursorHelp} position="end">
                                        <InfoIcon />
                                    </InputAdornment>
                                </Tooltip>
                            )
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        disabled={values.code.error || values.code.value === ''}
                        onClick={handleInfo}
                        className={classes.gridItem}
                        variant="contained"
                        color="primary">
                        Импортировать
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="name1"
                        error={Boolean(values.name1.error)}
                        helperText={values.name1.error}
                        value={values.name1.value}
                        onChange={e => {
                            handleChange(
                                e,
                                regExps.name1,
                                'Фамилия может содержать только кириллицу и один дефис',
                                []
                            )
                        }}
                        required
                        className={classes.gridItem}
                        id="outlined-basic"
                        label="Фамилия"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="name2"
                        error={Boolean(values.name2.error)}
                        helperText={values.name2.error}
                        value={values.name2.value}
                        onChange={e => {
                            handleChange(
                                e,
                                regExps.name23,
                                'Имя может содержать только кириллицу',
                                []
                            )
                        }}
                        required
                        className={classes.gridItem}
                        id="outlined-basic"
                        label="Имя"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="name3"
                        error={Boolean(values.name3.error)}
                        helperText={values.name3.error}
                        value={values.name3.value}
                        onChange={e => {
                            handleChange(
                                e,
                                regExps.name23,
                                'Отчество может содержать только кириллицу',
                                []
                            )
                        }}
                        required
                        className={classes.gridItem}
                        id="outlined-basic"
                        label="Отчество"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl required variant="outlined" className={classes.gridItem}>
                        <InputLabel id="demo-simple-select-outlined-label">
                            Номер лабораторной
                        </InputLabel>
                        <Select
                            MenuProps={{
                                className: classes.select
                            }}
                            name="lab"
                            value={values.lab.value}
                            onChange={e => {
                                handleChange(e)
                            }}
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Номер лабораторной">
                            <MenuItem value={'1'}>Лабораторная №1</MenuItem>\
                            <MenuItem value={'2'}>Лабораторная №2</MenuItem>\
                            <MenuItem value={'3'}>Лабораторная №3</MenuItem>\
                            <MenuItem value={'4'}>Лабораторная №4</MenuItem>\
                            <MenuItem value={'5'}>Лабораторная №5</MenuItem>\
                            <MenuItem value={'6'}>Лабораторная №6</MenuItem>\
                            <MenuItem value={'7'}>Лабораторная №7</MenuItem>\
                            <MenuItem value={'8'}>Лабораторная №8</MenuItem>\
                            <MenuItem value={'9'}>Курсовой проект</MenuItem>\
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="group"
                        error={Boolean(values.group.error)}
                        helperText={values.group.error}
                        value={values.group.value}
                        onChange={e => {
                            handleChange(
                                e,
                                regExps.group,
                                'Некорректный номер группы',
                                []
                            )
                        }}
                        required
                        className={classes.gridItem}
                        id="outlined-basic"
                        label="Группа"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="comments"
                        value={values.comments.value}
                        onChange={handleChange}
                        multiline
                        className={classes.gridItem}
                        id="outlined-basic"
                        label="Комментарии"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Dropzone
                        files={files}
                        setFiles={setFiles}
                        className={classes.gridItem}
                        handleDownload={(tar, name) => {
                            handleDownload(code, tar, name)
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Button
                        disabled={disabled}
                        onClick={() => {
                            handleSave(code => {
                                handleSend(code)
                            })
                        }}
                        className={classes.gridItem}
                        variant="contained"
                        color="primary">
                        Отправить
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        disabled={disabled}
                        onClick={() => {
                            handleSave(code => {
                                handleDownload(code, true)
                            })
                        }}
                        className={classes.gridItem}
                        variant="contained"
                        color="primary">
                        Скачать tar
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        disabled={disabled}
                        onClick={() => {
                            handleSave()
                        }}
                        className={classes.gridItem}
                        variant="contained"
                        color="primary">
                        Сохранить
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}
