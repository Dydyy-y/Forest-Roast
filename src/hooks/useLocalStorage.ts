import { useState, useEffect, useCallback } from 'react';
//fait avec l'ia

/**
 * Custom Hook pour synchroniser un state React avec localStorage
 * @param key - Clé localStorage (ex: "auth_token", "theme", "cart")
 * @param initialValue - Valeur par défaut si rien n'est stocké
 * @returns [valeur, setValeur] - Comme useState(), mais persisté !
 */
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  /**
   * État React pour stocker la valeur actuelle
   * 
   * INITIALISATION :
   * 1. On essaie de lire localStorage
   * 2. Si la clé existe, on parse le JSON et on l'utilise
   * 3. Sinon, on utilise initialValue
   */
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Lire depuis localStorage
      const item = window.localStorage.getItem(key);
      
      // Parser le JSON si la clé existe, sinon retourner initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // En cas d'erreur (JSON invalide), retourner initialValue
      console.warn(`⚠️ Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  /**
   * Fonction pour mettre à jour la valeur
   * 
   * DOUBLE ACTION :
   * 1. Met à jour le state React (déclenche un re-render)
   * 2. Sauvegarde dans localStorage (persistance)
   * 
   * @param value - Nouvelle valeur à stocker
   */
  const setValue = useCallback((value: T) => {
    try {
      // Mettre à jour le state React
      setStoredValue(value);
      
      // Sauvegarder dans localStorage
      window.localStorage.setItem(key, JSON.stringify(value));
      
      console.log(`💾 Saved to localStorage ["${key}"]`, value);
    } catch (error) {
      console.error(`❌ Error saving to localStorage key "${key}":`, error);
    }
  }, [key]);

  /**
   * 🎓 EXPLICATION : Pourquoi JSON.stringify() ?
   * 
   * localStorage ne stocke QUE des strings (texte)
   * Si on veut stocker un objet, un tableau, un nombre, etc., on doit le convertir en string
   * 
   * EXEMPLE :
   * localStorage.setItem('user', { name: 'John' })  ❌ Stocke "[object Object]" (inutile)
   * localStorage.setItem('user', JSON.stringify({ name: 'John' }))  ✅ Stocke '{"name":"John"}'
   * 
   * Ensuite, pour relire :
   * const user = JSON.parse(localStorage.getItem('user'))  → { name: 'John' }
   */

  /**
   * Effect pour écouter les changements d'autres onglets
   * 
   * CONCEPT AVANCÉ (Bonus) : Si l'utilisateur ouvre 2 onglets de ton site,
   * et modifie une valeur dans l'onglet 1, l'onglet 2 sera automatiquement mis à jour !
   * 
   * POURQUOI ? L'événement "storage" du navigateur est déclenché quand
   * un autre onglet modifie localStorage
   */
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      // Vérifier si c'est NOTRE clé qui a changé
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(`⚠️ Error parsing storage event for key "${key}":`, error);
        }
      }
    };

    // Écouter l'événement "storage"
    window.addEventListener('storage', handleStorageChange);

    // Cleanup : retirer l'event listener quand le composant est démonté
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  /**
   * 🎓 EXPLICATION : useEffect avec cleanup
   * 
   * useEffect(() => { ... }, [dependencies]) s'exécute :
   * - Au premier render du composant
   * - À chaque fois qu'une dépendance change (ici : key)
   * 
   * Le "return () => { ... }" est appelé :
   * - Quand le composant est démonté (unmount)
   * - Avant de ré-exécuter l'effet si une dépendance change
   * 
   * POURQUOI LE CLEANUP ?
   * Si on n'enlève pas l'event listener, il restera actif même après
   * la destruction du composant → fuite mémoire (memory leak)
   */

  // Retourner [valeur, setValeur] exactement comme useState()
  return [storedValue, setValue];
}

export default useLocalStorage;
