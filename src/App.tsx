import { Navigate, Route, Routes } from 'react-router'
import { SiteLayout } from './components/layout/SiteLayout'
import { LEGAL_DOCUMENTS } from './content/legal'
import { ChangelogPage } from './pages/ChangelogPage'
import { HomePage } from './pages/HomePage'
import { LegalPage } from './pages/LegalPage'
import { ThanksPage } from './pages/ThanksPage'
import { ROUTES } from './routes'

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        {LEGAL_DOCUMENTS.map((doc) => (
          <Route key={doc.path} path={doc.path} element={<LegalPage doc={doc} />} />
        ))}
        <Route path={ROUTES.changelog} element={<ChangelogPage />} />
        <Route path={ROUTES.thanks} element={<ThanksPage />} />
        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
      </Route>
    </Routes>
  )
}

export default App
