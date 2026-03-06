# TP – Introduction aux tests : Unitaires & E2E

Technologies utilisées :

* Vitest – tests unitaires
* Playwright – tests end-to-end
* React
* TypeScript
* Vite

## Objectifs pédagogiques

* Comprendre la différence entre test unitaire et test E2E
* Tester des fonctions métiers isolées
* Tester une interface utilisateur complète dans un navigateur
* Simuler des interactions utilisateur
* Vérifier qu’une application fonctionne comme attendu du point de vue utilisateur

## Partie 1 – Installation des outils de test

Dans votre projet React existant.

Installation de Vitest
Installer vitest => https://vitest.dev/guide/
Installation de Playwright => https://playwright.dev/docs/intro

## Partie 2 – Tests Unitaires avec Vitest

Les tests unitaires doivent vérifier la logique métier isolée. Vous devez écrire au moins 5 tests unitaires.

* Créer un dossier :
```
src/tests/
```
### Test 1 – Calcul du total du panier

* Créer un utilitaire :
```ts
src/utils/cart.ts
export interface CartItem {
  price: number
  quantity: number
}

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0)
}
```
* Créer un test :

```
cart.test.ts
```

Tests attendus pour vérifier le bon comportement pour les cas suivants :

* Total correct pour plusieurs produits
* Panier vide
* Quantité multiple

### Test 2 – Fonction de recherche produit

Dans :
```ts 
src/utils/search.ts
export function filterProducts(products, query) {
  return products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )
}

```

Tests attendus pour vérifier le bon comportement pour les cas suivants :
- Recherche simple
- Recherche insensible à la casse
- Résultat vide

### Test 3 – Service API produits

Fichier :
```ts
services/product.service.ts

Exemple :

export async function fetchProducts() {
  const res = await fetch("/api/products")
  return res.json()
}
```
Tests attendus pour vérifier le bon comportement pour les cas suivants :

- vérifier que la fonction retourne des données
- Mock du fetch

### Test 4 – Fonction d’authentification

Test d’une fonction

```ts
services/auth.service.ts
export function isAuthenticated() {
  return !!localStorage.getItem("token")
}
```
Tests attendus pour vérifier le bon comportement pour les cas suivants :

- Retourne true si token
- Retourne false si pas de token

### Test 5 – Ajout produit panier

Pour 
```ts
utils/cartActions.ts
export function addProduct(cart, product) {
  const existing = cart.find(p => p.id === product.id)

  if (existing) {
    existing.quantity++
    return [...cart]
  }

  return [...cart, { ...product, quantity: 1 }]
}
```
Tests attendus pour vérifier le bon comportement pour les cas suivants :
- Ajoute un produit
- Incrémente la quantité si déjà présent

## Partie 3 – Tests End-to-End avec Playwright 

Les tests E2E simulent un vrai utilisateur dans le navigateur.

Les tests sont à ajouter dans :
```
tests/
```

### Test E2E 1 – Affichage des produits (Home)

Objectif :

Vérifier que la page d’accueil affiche les produits.

```ts
tests/home.spec.ts
```
Exemple :
```js
import { test, expect } from '@playwright/test'

test('homepage displays products', async ({ page }) => {

  await page.goto('http://localhost:5173')

  await expect(page.locator("text=Voir le détail")).toBeVisible()

})
```

### Test E2E 2 – Navigation vers détail produit

Objectif :

Tester la navigation.

Scénario utilisateur :

- Ouvrir homepage
- Cliquer sur "Voir le détail"
- Vérifier que la page produit apparaît

### Test E2E 3 – Ajouter un produit au panier

Scénario :
Ouvrir homepage
Ouvrir produit
Cliquer sur "Ajouter au panier"
Aller au panier
Vérifier que le produit est présent

## Livrables attendus

À la fin du TP vous devez avoir :

### Tests unitaires
Minimum 5 fonctionnalités testées (ce qui implique de penser à gérer tous les cas de tests) :
- Panier
- Recherche de produits
- Récupération des produits
- Authentification
- Ajout de produit

### Tests E2E
Minimum 2 fonctionnalités testées (ce qui implique de penser à gérer tous les cas de tests) :
- Affichage produits
- Accèder au détail d'un produit
