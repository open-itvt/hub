import fs from 'fs';
import path from 'path';

export const metadata = {
  title: "iTVT - Pobierz aplikacje na Androida",
};

function formatSize(bytes) {
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

export default function AndroidFilesPage() {
  const filesDir = path.join(process.cwd(), 'public', 'static', 'android');
  let files = [];

  try {
    files = fs.readdirSync(filesDir)
      .filter(f => fs.statSync(path.join(filesDir, f)).isFile())
      .sort()
      .map(f => ({
        name: f,
        size: fs.statSync(path.join(filesDir, f)).size,
        mtime: fs.statSync(path.join(filesDir, f)).mtime,
      }));
  } catch {
    // directory doesn't exist yet
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">
          <span className="text-blue-400">iTVT</span> Android – pliki do pobrania
        </h1>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 shadow-xl">
          <table className="w-full text-left">
            <thead>
              <tr className="text-zinc-400 text-sm border-b border-zinc-800">
                <th className="pb-3 font-semibold">Plik</th>
                <th className="pb-3 font-semibold text-right">Rozmiar</th>
                <th className="pb-3 font-semibold text-right">Data</th>
              </tr>
            </thead>
            <tbody>
              {files.map(file => (
                <tr key={file.name} className="border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/40 transition-colors">
                  <td className="py-3">
                    <a
                      href={`/static/android/${file.name}`}
                      className="text-blue-400 hover:text-blue-300 hover:underline font-medium"
                    >
                      {file.name}
                    </a>
                  </td>
                  <td className="py-3 text-right text-zinc-400 text-sm">{formatSize(file.size)}</td>
                  <td className="py-3 text-right text-zinc-500 text-sm">{formatDate(file.mtime)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {files.length === 0 && (
            <p className="text-zinc-500 text-center py-8">Brak plików do wyświetlenia.</p>
          )}
        </div>

        <p className="text-zinc-600 text-xs text-center mt-6">
          Aplikacje dla systemu Android. Pobierając plik, akceptujesz warunki korzystania z serwisu.
        </p>
      </div>
    </div>
  );
}
