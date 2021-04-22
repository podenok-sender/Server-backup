import { FormView } from './view/FormView'
import { ajax } from 'jquery'
import { useForm } from '../../hooks/useForm'
import { useEffect, useState } from 'react'
import env from "react-dotenv"
import { useHistory, useParams } from 'react-router'

export const Form = () => {
    const regExps = {
        code: /^[a-zA-Z0-9]{32}$/,
        name1: /(^[ЁА-Я]{1}[ёа-я]{0,}-[ЁА-Я]{1}[ёа-я]{0,}$)|(^[ЁА-Я]{1}[ёа-я]{1,}$)/,
        name23: /^[ЁА-Я]{1}[ёа-я]{1,}$/,
        group: /^[0-9]{2}[0-8]{1}[0-9]{1}[013456789]{1}[0-9]$/
    }

    const { id } = useParams()
    const history = useHistory()

    useEffect(() => {
        if (id && !regExps.code.test(id)) {
            history.replace('')
        } else if (id) {
            handleInfo()
        }
    }, [])

    const { values, setValues, handleChange } = useForm({
        code: {
            value: id && regExps.code.test(id) ? id : '',
            error: null
        },
        name1: {
            value: '',
            error: null
        },
        name2: {
            value: '',
            error: null
        },
        name3: {
            value: '',
            error: null
        },
        lab: {
            value: '1',
            error: null
        },
        group: {
            value: '',
            error: null
        },
        comments: {
            value: '',
            error: null
        }
    })

    const disableKeys = ['name1', 'name2', 'name3', 'group']
    const disabled =
        disableKeys.filter(key => values[key].value.length && !values[key].error).length <
        disableKeys.length

    const [files, setFiles] = useState([])

    const [code, setCode] = useState('')

    const [progress, setProgress] = useState(false)

    const handleInfo = () => {
        if (!values.code.error) {
            setProgress(true)
            console.log('info')
            ajax({
                type: 'POST',
                url: env.API_URL || 'PHP/API.php',
                charset: 'utf-8',
                data: {
                    action: 'info',
                    id: values.code.value
                },
                success: function (data, textStatus, request) {
                    setProgress(false)
                    if (data.OK) {
                        setCode(data.id)

                        setValues({
                            code: {
                                value: data.id
                            },
                            name1: {
                                value: data.name1
                            },
                            name2: {
                                value: data.name2
                            },
                            name3: {
                                value: data.name3
                            },
                            lab: {
                                value: data.lab
                            },
                            group: {
                                value: data.group
                            },
                            comments: {
                                value: data.comments
                            }
                        })

                        setFiles(
                            data.files.name.map(name => ({
                                name: name
                            }))
                        )
                    } else {
                        history.replace('')
                        setValues({
                            ...values,
                            code: {
                                value: ''
                            }
                        })
                    }
                },
                error: function (request, textStatus, errorThrown) {
                    setProgress(false)
                    alert(textStatus)
                }
            })
        }
    }

    const handleDownload = (code, tar, name) => {
        setProgress(true)
        console.log('download')
        ajax({
            url: env.API_URL || 'PHP/API.php',
            type: 'POST',
            dataType: 'binary',
            xhrFields: {
                responseType: 'blob'
            },
            data: {
                action: 'download',
                id: code,
                file: name,
                tar: tar ? 'true' : 'false'
            },
            success: function (data, status, xhr) {
                setProgress(false)
                console.log('download success')
                var blob = new Blob([data], {
                    type: xhr.getResponseHeader('Content-Type')
                })
                var link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = tar ? 'archive.tar.gz' : name
                link.click()
            },
            error: function (request, textStatus, errorThrown) {
                setProgress(false)
                alert(textStatus)
            }
        })
    }

    const handleSave = callback => {
        setProgress(true)
        const obj = {
            action: 'save',
            id: values.code.value,
            name1: values.name1.value,
            name2: values.name2.value,
            name3: values.name3.value,
            group: values.group.value,
            lab: values.lab.value,
            comments: values.comments.value,
            copyID: code
        }

        const formData = new FormData()

        Object.keys(obj).forEach(key => {
            formData.append(key, obj[key])
        })

        files
            .filter(file => file.constructor.name !== 'File')
            .forEach((obj, index) => {
                formData.append(`copyFiles[name][${index}]`, obj.name)
            })

        files
            .filter(file => file.constructor.name === 'File')
            .forEach(file => {
                formData.append('uploaded[]', file, file.name)
            })

        console.log(obj)
        console.log(formData)

        ajax({
            type: 'POST',
            url: env.API_URL || 'PHP/API.php',
            charset: 'utf-8',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data, textStatus, request) {
                setProgress(false)
                if (data.OK) {
                    if (data.id) {
                        history.replace(data.id)
                        setCode(data.id)
                        setValues({
                            ...values,
                            code: {
                                value: data.id
                            }
                        })
                        if (callback) {
                            callback(data.id)
                        }
                    }
                }
            },
            error: function (request, textStatus, errorThrown) {
                setProgress(false)
                console.log(textStatus)
            }
        })
    }

    const handleSend = code => {
        setProgress(true)
        console.log('send', code)
        ajax({
            type: 'POST',
            url: env.API_URL || 'PHP/API.php',
            charset: 'utf-8',
            data: {
                action: 'sent',
                id: code
            },
            success: function (data, textStatus, request) {
                setProgress(false)
                if (!data.OK) {
                    console.log(data)
                }
            },
            error: function (request, textStatus, errorThrown) {
                setProgress(false)
                alert(textStatus)
            }
        })
    }

    return (
        <FormView
            code={code}
            values={values}
            disabled={disabled}
            handleChange={handleChange}
            files={files}
            setFiles={setFiles}
            handleInfo={handleInfo}
            handleDownload={handleDownload}
            handleSave={handleSave}
            handleSend={handleSend}
            progress={progress}
            regExps={regExps}></FormView>
    )
}
