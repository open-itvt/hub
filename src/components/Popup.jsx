import React from 'react';

const PopupMigrate = ({ onClose }) => {
  return (
    <div
      id="popup"
      className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
    >
      <div className="bg-black p-8 rounded shadow-lg text-center max-w-md w-full mx-4">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-700 text-white text-xs font-semibold uppercase tracking-wider mb-4">
          Ważne
        </div>

        <h2 className="text-2xl font-bold mb-3 text-white">
          <span className="text-blue-400">Hub iTVT</span> zostanie wycofany<br />
          z dniem <span className="text-blue-400">20.06.2026</span>
        </h2>

        <p className="text-gray-400 mb-2 text-sm leading-relaxed">
          Zapraszamy do nowej platformy VOD &mdash; iVOD.
        </p>
        <p className="text-gray-400 mb-4 text-sm leading-relaxed">
          Obecna wersja będzie wspierana do czasu zakończenia pełnej migracji.
        </p>

        <a
          href="https://vod.itvt.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-blue-400 font-semibold text-base mb-4 hover:underline"
        >
          Przejdź do vod.itvt.xyz →
        </a>

        <hr className="border-gray-800 my-4" />

        <p className="text-gray-500 text-xs leading-relaxed mb-1">
          Korzystając z serwisu, wyrażasz zgodę na przechowywanie plików cookies oraz
          przetwarzanie danych o systemie i przeglądarce w celu optymalizacji działania strony.
        </p>
        <a
          href="https://vod.itvt.xyz/#prywatnosc"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-gray-600 text-xs hover:text-gray-400 mb-4"
        >
          Więcej o przetwarzaniu danych →
        </a>

        <button
          onClick={onClose}
          className="px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:brightness-110 transition-all"
        >
          Rozumiem
        </button>
      </div>
    </div>
  );
};

export default PopupMigrate;
