import { createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { Background } from './components/Background/Background'
import { Form } from './components/Form/Form'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

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
            <BrowserRouter>
                <Switch>
                    <Route exact path={['/', '/:id']} component={Form}></Route>
                    <Route exact path="*">
                        404
                    </Route>
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
