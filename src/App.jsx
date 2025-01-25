import { useState } from "react";

function TranslationApp() {
  const [sourceText, setSourceText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("es");
  const [translatedText, setTranslatedText] = useState("");

  const handleTranslate = async () => {
    const apiKey = "YOUR_GOOGLE_API_KEY";
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: sourceText,
          source: sourceLang,
          target: targetLang,
          format: "text",
        }),
      }
    );

    const data = await response.json();
    setTranslatedText(data.data.translations[0].translatedText);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Language Translation App</h1>
      <textarea
        className="border p-2 w-full max-w-lg rounded mb-4"
        placeholder="Enter text"
        value={sourceText}
        onChange={(e) => setSourceText(e.target.value)}
      />
      <div className="flex gap-4 mb-4">
        <select
          className="border p-2 rounded"
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          {/* Add more languages */}
        </select>
        <select
          className="border p-2 rounded"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          {/* Add more languages */}
        </select>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleTranslate}
      >
        Translate
      </button>
      <div className="w-full max-w-lg p-4 border rounded">
        <h2 className="text-lg font-semibold mb-2">Translated Text:</h2>
        <p>{translatedText || "Your translation will appear here."}</p>
      </div>
    </div>
  );
}

export default TranslationApp;
