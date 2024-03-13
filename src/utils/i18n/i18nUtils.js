export const getLanguageByCode = (code) => {
    const languageMap = {
        en : "English",
        fr : "French",
        ta : "Tamil",
        hi : "Hindi"
    }

    return languageMap[code] || null;
}

export const getCodeByLanguage = (lang) => {
    const languageMap = {
        en: "English",
        fr: "French",
        ta: "Tamil",
        hi: "Hindi"
    };

    const reverseLanguageMap = {};
    Object.keys(languageMap).forEach((code) => {
        reverseLanguageMap[languageMap[code]] = code;
    });

    return reverseLanguageMap[lang] || "Unknown"; 
};
