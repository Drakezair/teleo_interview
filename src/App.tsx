import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css'
import { ScreenshotsList } from './components'

const queryClient = new QueryClient();


function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ScreenshotsList />
    </QueryClientProvider>

  )
}

export default App
