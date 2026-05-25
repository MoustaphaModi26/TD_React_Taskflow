import { useState, useEffect } from 'react'

/**
 * Hook personnalisé qui synchronise un état React avec le localStorage.
 * @param {string} key - La clé de stockage dans le localStorage.
 * @param {*} initialValue - La valeur initiale si aucune donnée n'existe.
 * @returns {[*, Function]} - Un tuple [valeur, setter] identique à useState.
 */
function useLocalStorage(key, initialValue) {
  // Lecture synchrone du localStorage au montage du composant
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      // Si des données existent, on les désérialise, sinon on utilise la valeur initiale
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Erreur lors de la lecture du localStorage :', error)
      return initialValue
    }
  })

  // Synchronisation : à chaque changement de storedValue, on persiste dans le localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error('Erreur lors de l\'écriture dans le localStorage :', error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

export default useLocalStorage
