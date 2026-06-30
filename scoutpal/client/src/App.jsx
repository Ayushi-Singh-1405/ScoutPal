import Home from './pages/Home';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
            SP
          </div>
          <div>
            <h1 className="text-base font-semibold text-gray-900">ScoutPal</h1>
            <p className="text-xs text-gray-500">Your AI scout for qualifying leads</p>
          </div>
        </div>
      </header>
      <Home />
    </div>
  );
}
