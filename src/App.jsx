import { createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { Background } from './components/Background/Background'
import { Form } from './components/Form/Form'

const theme = createMuiTheme({
    palette: {
        // type: 'dark',
        primary: {
            main: '#007F5B'
            // main: '#e61c5d'
            // main: '#00BFA5'
        }
    }
})

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Background />
            <Form></Form>
        </ThemeProvider>
    )
}

export default App
