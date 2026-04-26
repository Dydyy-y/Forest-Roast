# DOSSIER DE PRÉPARATION À L'ORAL — Forest Roast / Meridian Coffee

> Projet e-commerce de café premium — React 18 + TypeScript (frontend) | Node.js/Express + SQLite/Sequelize (backend)

---

## SOMMAIRE DES THÈMES

1. [Présentation générale du projet](#1-présentation-générale-du-projet)
2. [Architecture et stack technique](#2-architecture-et-stack-technique)
3. [React — Concepts fondamentaux](#3-react--concepts-fondamentaux)
4. [Contextes et état global (AuthContext / CartContext)](#4-contextes-et-état-global-authcontext--cartcontext)
5. [Hooks — Concepts et usage dans le projet](#5-hooks--concepts-et-usage-dans-le-projet)
6. [TypeScript dans le projet](#6-typescript-dans-le-projet)
7. [Routing et navigation](#7-routing-et-navigation)
8. [Services et communication avec l'API](#8-services-et-communication-avec-lapi)
9. [Composants clés](#9-composants-clés)
10. [Backend Node.js / Express](#10-backend-nodejs--express)
11. [Base de données et Sequelize](#11-base-de-données-et-sequelize)
12. [Authentification et JWT](#12-authentification-et-jwt)
13. [Système de Panier](#13-système-de-panier)
14. [Sécurité](#14-sécurité)
15. [Questions de code pointues](#15-questions-de-code-pointues)

---

---

## 1. PRÉSENTATION GÉNÉRALE DU PROJET

### Q1. Présente ton projet en 2-3 minutes.
**Réponse :**
Forest Roast (affiché "Meridian Coffee" en front) est une application e-commerce de café premium en fullstack. Le frontend est en React 18 avec TypeScript, bundlé par Vite, et utilise Chakra UI comme design system. Le backend est une API REST en Node.js/Express avec une base de données SQLite pilotée par l'ORM Sequelize.

L'utilisateur peut parcourir un catalogue de cafés, filtrer par torréfaction/arômes/prix, voir le détail d'un produit avec ses origines, s'inscrire, se connecter, gérer son profil, ajouter des produits à son panier et passer une commande.

---

### Q2. Quelles sont les grandes fonctionnalités de l'application ?
**Réponse :**
- Catalogue produits avec recherche textuelle et filtres avancés (torréfaction, profils d'arômes, prix)
- Page détail produit avec suggestions de produits similaires
- Authentification (inscription + connexion avec JWT)
- Panier persistant côté serveur (lié au compte utilisateur)
- Gestion de profil utilisateur (modification des infos + mot de passe)
- Page d'abonnement (3 formules)
- Routes protégées : panier, profil et confirmation de commande nécessitent d'être connecté

---

### Q3. Pourquoi as-tu choisi React pour ce projet ?
**Réponse :**
React permet de créer des interfaces dynamiques grâce à son système de composants réutilisables et son cycle de rendu déclaratif. Le `Virtual DOM` optimise les mises à jour du DOM réel. React est le framework/librairie UI le plus utilisé dans l'industrie, donc bien documenté et avec un écosystème très riche (React Router, Chakra UI, etc.).

---

### Q4. Pourquoi TypeScript plutôt que JavaScript ?
**Réponse :**
TypeScript ajoute le typage statique à JavaScript, ce qui permet de :
- Détecter les erreurs au moment de l'écriture du code (et non à l'exécution)
- Avoir l'autocomplétion dans l'éditeur
- Documenter les interfaces de données (ex: `Product`, `Cart`, `AuthUser`)
- Rendre le code plus maintenable en équipe

Dans ce projet, les types sont définis dans `src/types/` pour les entités métier, ce qui sécurise tous les appels API.

---

### Q5. Pourquoi SQLite pour la base de données ?
**Réponse :**
SQLite est une base de données embarquée (un seul fichier `.db`), très pratique pour le développement car elle ne nécessite pas d'installer un serveur séparé (contrairement à PostgreSQL ou MySQL). Pour un projet en production à grande échelle, on migrerait vers PostgreSQL. Sequelize facilite cette migration car il est compatible avec plusieurs SGBD.

---

### Q6. À quoi sert Vite dans ce projet ?
**Réponse :**
Vite est le bundler et serveur de développement. Il remplace Webpack (utilisé par Create React App). Ses avantages :
- Démarrage ultra-rapide grâce à l'utilisation des modules ES natifs (ESM)
- Hot Module Replacement (HMR) quasi-instantané
- Build de production optimisé via Rollup
Il lit le fichier `vite.config.ts` et le `index.html` racine comme point d'entrée.

---

---

## 2. ARCHITECTURE ET STACK TECHNIQUE

### Q7. Décris l'architecture globale de l'application.
**Réponse :**
L'architecture est client-serveur découplée :
- **Frontend (SPA)** : React tourne dans le navigateur, fait des appels HTTP vers l'API.
- **Backend (API REST)** : Express sur le port 8080 expose les endpoints `/api/...`.
- **Base de données** : SQLite stockée dans un fichier local, manipulée via Sequelize.
- **Communication** : JSON via HTTP, authentifié avec des tokens JWT dans le header `Authorization: Bearer <token>`.

```
[Navigateur React] ──HTTP/JSON──> [Express API :8080]
                                        │
                                   [SQLite via Sequelize]
```

---

### Q8. Comment est structuré le frontend ?
**Réponse :**
```
src/
├── main.tsx          → Point d'entrée (montage ReactDOM + ChakraProvider)
├── App.tsx           → Stack de providers (BrowserRouter > AuthProvider > CartProvider)
├── theme.ts          → Thème Chakra UI personnalisé
├── router/           → Définition des routes React Router
├── pages/            → Composants de pages (une par route)
├── components/       → Composants réutilisables (Navbar, Footer, ProductCard...)
│   └── features/     → Composants métier (RelatedProducts)
│   └── shared/       → Composants transversaux (Layout, Navbar, Footer)
├── context/          → Providers React Context (Auth, Cart)
├── hooks/            → Hooks custom (useLocalStorage)
├── services/         → Couche d'accès API (classes avec fetch)
├── types/            → Interfaces et types TypeScript
└── constants/        → Constantes métier
```

---

### Q9. Comment est structuré le backend ?
**Réponse :**
```
18_06_ecom/
├── main.js           → Point d'entrée Express (middlewares + démarrage)
├── controllers/      → Logique métier (une fonction par endpoint)
├── models/           → Définitions Sequelize (entités DB)
├── routes/           → Déclaration des routes HTTP (url + méthode + controller)
├── middlewares/      → auth (JWT), admin (vérif rôle), ownership (vérif propriété)
├── helpers/          → Utilitaires JWT et bcrypt
├── services/         → Logique métier complexe (product_logic_service)
└── scripts/          → Seed de la base de données (init-db.js)
```

---

### Q10. Qu'est-ce qu'une API REST ?
**Réponse :**
REST (Representational State Transfer) est un style d'architecture pour les APIs. Ses principes :
- **Sans état (stateless)** : chaque requête contient toutes les infos nécessaires (le token JWT est envoyé à chaque requête)
- **Basée sur les ressources** : les URLs représentent des ressources (`/api/products`, `/api/users/:id`)
- **Verbes HTTP** : GET (lire), POST (créer), PUT (modifier), DELETE (supprimer)
- **JSON** : format d'échange standard

Dans ce projet : `GET /api/products` liste les produits, `POST /api/carts/:id/products/:pid` ajoute un produit au panier.

---

### Q11. Qu'est-ce que le design pattern MVC dans ce projet ?
**Réponse :**
MVC (Model-View-Controller) est partiellement appliqué côté backend :
- **Model** : les fichiers Sequelize dans `models/` définissent la structure des données en base
- **View** : ici l'API renvoie du JSON (les "vues" sont le frontend React)
- **Controller** : les fichiers dans `controllers/` contiennent la logique métier de chaque endpoint

Côté frontend, on pourrait parler de séparation pages/services/contextes mais ce n'est pas strictement MVC.

---

### Q12. Qu'est-ce que Chakra UI et pourquoi l'utiliser ?
**Réponse :**
Chakra UI est un design system React (bibliothèque de composants UI). Il fournit des composants prêts à l'emploi (`Box`, `Button`, `Input`, `Drawer`, `Tabs`...) stylisés et accessibles (conforme ARIA). Il utilise Emotion (CSS-in-JS) pour le styling via des props : `<Box bg="red.500" p={4}>`. Cela accélère le développement et assure une cohérence visuelle. Le thème customisé dans `theme.ts` surcharge les valeurs par défaut (palette, typographie).

---

---

## 3. REACT — CONCEPTS FONDAMENTAUX

### Q13. Qu'est-ce qu'un composant React ?
**Réponse :**
Un composant React est une fonction JavaScript (ou classe) qui retourne du JSX (HTML-like). Il encapsule de l'UI et de la logique. Chaque composant peut recevoir des **props** (données passées par le parent) et maintenir un **state** (données internes). Quand le state ou les props changent, React re-rend le composant.

Exemple dans ce projet : `<ProductCard product={p} onAddToCart={fn} />` est un composant qui reçoit un produit et un callback.

---

### Q14. Qu'est-ce que le JSX ?
**Réponse :**
JSX est une extension syntaxique de JavaScript qui ressemble à du HTML mais s'écrit dans du JS/TS. Il est transformé en appels `React.createElement()` par le compilateur (Babel/TypeScript). Exemple :
```jsx
// JSX
<Button color="red">Valider</Button>
// Devient
React.createElement(Button, { color: "red" }, "Valider")
```
Dans les fichiers `.tsx` du projet, tout le rendu visuel est écrit en JSX.

---

### Q15. Qu'est-ce que le Virtual DOM ?
**Réponse :**
Le Virtual DOM est une représentation JavaScript légère de l'arbre DOM réel du navigateur. Quand le state change, React crée un nouveau Virtual DOM, le compare à l'ancien (**diffing**), et met à jour **uniquement** les nœuds réellement modifiés dans le vrai DOM (**reconciliation**). Cela évite de régénérer toute la page à chaque changement, ce qui est beaucoup plus performant.

---

### Q16. Quelle est la différence entre props et state ?
**Réponse :**
- **Props** : données passées de **parent à enfant**, en lecture seule dans l'enfant. Ex : `product` dans `ProductCard`
- **State** : données **internes** à un composant, mutables via `useState`. Ex : `loading`, `searchQuery` dans `HomePage`

Un composant peut modifier son propre state mais pas ses props.

---

### Q17. Qu'est-ce que le cycle de vie d'un composant React (avec les Hooks) ?
**Réponse :**
Avec les Hooks (React 18), le cycle de vie se gère via `useEffect` :
- **Montage** (mount) : `useEffect(() => { ... }, [])` — exécuté une seule fois après le premier rendu
- **Mise à jour** : `useEffect(() => { ... }, [dep])` — exécuté à chaque fois que `dep` change
- **Démontage** (unmount) : la fonction **de cleanup** retournée dans `useEffect` : `return () => { clearTimeout(...) }`

Dans `CartContext` par exemple : `useEffect` charge le panier au montage quand l'utilisateur est connecté.

---

### Q18. Qu'est-ce qu'un "callback" ? Donne un exemple dans ce projet.
**Réponse :**
Un callback est une fonction passée en argument à une autre fonction, pour être appelée plus tard (généralement après un événement ou une opération asynchrone).

Dans ce projet, `ProductCard` reçoit deux callbacks en props :
```typescript
onAddToCart?: (product: Product) => void  // appelé au clic sur "Ajouter au panier"
onCardClick?: (product: Product) => void  // appelé au clic sur la carte
```
Le composant parent (ex: `HomePage`) décide quoi faire (naviguer, appeler l'API, etc.), et le transmet à `ProductCard`. Cela **isole** le composant de la logique métier.

---

### Q19. Qu'est-ce que `e.stopPropagation()` et pourquoi est-il utilisé dans `ProductCard` ?
**Réponse :**
`stopPropagation()` empêche un événement de "remonter" dans l'arbre DOM (propagation / bubbling). Dans `ProductCard`, la carte entière est cliquable (`onCardClick`). Mais le bouton "Ajouter au panier" est à l'intérieur de la carte. Sans `stopPropagation`, cliquer sur le bouton déclencherait **aussi** le clic sur la carte (navigation vers le détail), ce qui n'est pas souhaité. `e.stopPropagation()` isole le clic du bouton.

---

### Q20. Qu'est-ce que le "lifting state up" ?
**Réponse :**
C'est un pattern React : quand plusieurs composants ont besoin des mêmes données, on "remonte" le state dans leur plus proche ancêtre commun, et on le passe en props. Dans ce projet, le cart est dans un Context (`CartContext`) plutôt qu'en state local, car `Navbar` (badge), `CartPage`, et `ProductCard` en ont tous besoin.

---

---

## 4. CONTEXTES ET ÉTAT GLOBAL (AuthContext / CartContext)

### Q21. Qu'est-ce que React Context et pourquoi l'utiliser ?
**Réponse :**
React Context est une API qui permet de partager des données entre composants **sans passer les props à chaque niveau** (évite le "prop drilling"). On crée un `Context`, on enveloppe l'arbre avec un `Provider`, et tout composant enfant peut consommer les données via `useContext`.

Dans ce projet : `AuthContext` expose `user`, `token`, `login`, `logout` à tous les composants de l'app sans avoir à passer ces infos de Navbar → App → Page → Bouton.

---

### Q22. Comment fonctionne `AuthContext` ?
**Réponse :**
```typescript
// 1. Création du context
const AuthContext = createContext<AuthContextType | null>(null)

// 2. Provider : stocke le state, expose les fonctions
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("auth_token", null)
  const [user, setUser] = useLocalStorage("auth_user", null)
  
  const login = useCallback((token, user) => {
    setToken(token); setUser(user)
  }, [])
  
  const logout = useCallback(() => {
    setToken(null); setUser(null)
  }, [])
  
  return <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, updateUser }}>
    {children}
  </AuthContext.Provider>
}

// 3. Hook custom pour consommer
export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth doit être utilisé dans AuthProvider")
  return ctx
}
```
L'état est persisté via `useLocalStorage` → survit aux rechargements de page.

---

### Q23. Pourquoi `isAuthenticated` est-il calculé (`token !== null && token !== ""`) plutôt que stocké en state ?
**Réponse :**
`isAuthenticated` est une **valeur dérivée** de `token`. Il n'a pas besoin d'être un state distinct car il peut toujours être calculé à partir de `token`. Si on le stockait séparément, on risquerait des désynchronisations (token présent mais `isAuthenticated` à false). En le calculant directement, on garantit la cohérence.

---

### Q24. Explique le fonctionnement de `CartContext`.
**Réponse :**
`CartContext` dépend d'`AuthContext`. Il :
1. **Surveille l'authentification** : `useEffect([isAuthenticated, user])` — quand l'utilisateur se connecte, charge le panier depuis l'API (`GET /api/carts/user/:id`). Quand il se déconnecte, remet le cart à `null`.
2. **`addToCart(productId)`** : s'assure que le cart est chargé, puis appelle `POST /api/carts/:cartId/products/:productId`, et met à jour le state local.
3. **`loadingProductId`** : stocke l'id du produit en cours d'ajout/suppression → permet d'afficher un spinner **uniquement** sur le bon bouton (UX fine).
4. **`refreshCart()`** : recharge le panier depuis l'API.

---

### Q25. Quelle est la différence entre `useContext` et Redux ?
**Réponse :**
| | React Context | Redux |
|---|---|---|
| Complexité | Simple, natif React | Plus lourd (actions, reducers, store) |
| Cas d'usage | State global simple (auth, thème) | State complexe avec de nombreuses mutations |
| Re-renders | Tous les consommateurs re-rendent | Optimisable avec `useSelector` |
| DevTools | Non | Redux DevTools (time travel, replay) |
| Boilerplate | Minimal | Plus important |

Pour ce projet, Context est suffisant car l'état global se limite à l'auth et au panier.

---

### Q26. Qu'est-ce que le "prop drilling" et comment ce projet l'évite-t-il ?
**Réponse :**
Le prop drilling c'est quand on passe des props de composant en composant sur plusieurs niveaux juste pour les faire parvenir à un descendant profond. Ex : `App → Page → Section → Card` avec `user` à chaque niveau. Ce projet l'évite via **React Context** : `Navbar` utilise `useCart()` directement sans que ses parents lui passent quoi que ce soit.

---

---

## 5. HOOKS — CONCEPTS ET USAGE DANS LE PROJET

### Q27. Qu'est-ce qu'un Hook React ?
**Réponse :**
Un Hook est une fonction qui commence par `use` et qui permet d'utiliser les fonctionnalités de React (state, cycle de vie, context) dans des composants fonctionnels. Avant les Hooks (React 16.8), ces fonctionnalités n'étaient disponibles que dans les classes.

Règles des hooks : 
1. Ne pas appeler dans des boucles, conditions ou fonctions imbriquées
2. Appeler uniquement dans des composants React ou d'autres hooks

---

### Q28. Explique `useState`.
**Réponse :**
`useState` crée une variable d'état locale dans un composant. Il retourne un tableau : `[valeur, fonctionMutation]`.
```typescript
const [loading, setLoading] = useState(false)
// loading : valeur actuelle
// setLoading : fonction pour modifier la valeur (déclenche un re-render)
```
Dans `HomePage` : `const [products, setProducts] = useState<Product[]>([])` — la liste vide est la valeur initiale.

---

### Q29. Explique `useEffect` et ses dépendances.
**Réponse :**
`useEffect` exécute un effet de bord (appel API, abonnement, timer) **après** le rendu. Le tableau de dépendances contrôle quand il se re-exécute :
- `[]` vide → une seule fois au montage (équivalent `componentDidMount`)
- `[dep]` → à chaque changement de `dep`
- Sans tableau → à chaque rendu

```typescript
// Dans HomePage : debounce de la recherche
useEffect(() => {
  const timer = setTimeout(() => setDebouncedSearch(searchQuery), 400)
  return () => clearTimeout(timer) // CLEANUP : annule le timer si searchQuery change avant 400ms
}, [searchQuery])
```
La fonction de **retour** est le cleanup (équivalent `componentWillUnmount`).

---

### Q30. Explique `useCallback` et pourquoi il est utilisé dans `AuthContext`.
**Réponse :**
`useCallback` mémoïse une fonction — elle ne change pas de référence entre les rendus si ses dépendances ne changent pas.

```typescript
const login = useCallback((token, user) => {
  setToken(token)
  setUser(user)
}, []) // [] = jamais recréée
```

Sans `useCallback`, `login` serait une nouvelle référence à chaque rendu d'`AuthProvider`, ce qui déclencherait inutilement tous les `useEffect` qui dépendent de `login` dans les composants enfants. C'est une optimisation de performance.

---

### Q31. Explique `useMemo` et son utilisation dans `CoffeePage`.
**Réponse :**
`useMemo` mémoïse le **résultat** d'un calcul coûteux — il ne recalcule que si ses dépendances changent.

```typescript
const filteredProducts = useMemo(() => {
  return allProducts
    .filter(p => p.name.includes(search))
    .filter(p => roastFilter.includes(p.roastLevel))
    .sort(...)
}, [allProducts, search, roastFilter, sortBy, priceRange])
```

Sans `useMemo`, ce calcul tournerait à chaque rendu (même si les filtres n'ont pas changé). Ici, il ne se recalcule que quand les données ou les filtres changent.

---

### Q32. Explique `useRef`.
**Réponse :**
`useRef` crée une référence mutable qui **ne déclenche pas de re-render** quand elle change. Usages courants :
1. **Référencer un élément DOM** : `const inputRef = useRef<HTMLInputElement>(null)` → `inputRef.current.focus()`
2. **Stocker une valeur qui persiste entre les rendus** sans re-render

Dans `HomePage` : `const catalogRef = useRef<HTMLDivElement>(null)` → utilisé pour `catalogRef.current?.scrollIntoView({ behavior: 'smooth' })` (scroll doux vers le catalogue).

---

### Q33. Explique `useParams`, `useNavigate` et `useDisclosure`.
**Réponse :**
- **`useParams()`** (React Router) : lit les paramètres dynamiques de la route. Dans `ProductDetailPage` : `const { id } = useParams()` récupère l'`:id` depuis `/product/:id`
- **`useNavigate()`** (React Router) : retourne une fonction pour naviguer programmatiquement. Ex : `navigate('/login')` au lieu d'un `<Link>`
- **`useDisclosure()`** (Chakra UI) : gère l'état `isOpen/onOpen/onClose` d'un composant toggle (Drawer, Modal...). Dans `Navbar` pour le menu mobile, dans `CoffeePage` pour le panneau de filtres.

---

### Q34. Explique le hook custom `useLocalStorage`. Qu'est-ce que cela signifie "hook custom" ?
**Réponse :**
Un hook custom est simplement une fonction qui commence par `use` et qui utilise d'autres hooks React. Cela permet de **réutiliser de la logique stateful**.

`useLocalStorage<T>(key, initialValue)` :
1. **Initialisation lazy** : `useState(() => { /* lit localStorage */ })` — la fonction n'est appelée qu'au premier rendu
2. **`setValue`** mémoïsé via `useCallback` : met à jour React state ET localStorage simultanément
3. **Sync multi-onglets** : `useEffect` écoute l'événement `'storage'` du navigateur → si un autre onglet modifie la même clé localStorage, le state est synchronisé
4. **Générique `<T>`** : fonctionne pour n'importe quel type (string, object, null)

Il est utilisé dans `AuthContext` pour persister `token` et `user`.

---

### Q35. Qu'est-ce que l'initialisation "lazy" dans `useState` ?
**Réponse :**
Au lieu de passer directement une valeur à `useState`, on peut passer une **fonction** :
```typescript
// Sans lazy (recalcule à chaque rendu même si ignoré après le 1er)
const [val, setVal] = useState(JSON.parse(localStorage.getItem(key) || ''))

// Avec lazy (ne s'exécute qu'au premier rendu)
const [val, setVal] = useState(() => JSON.parse(localStorage.getItem(key) || ''))
```
React n'appelle la fonction qu'**une seule fois** lors du montage. C'est important pour les opérations coûteuses comme lire le localStorage.

---

### Q36. Qu'est-ce qu'un debounce et comment est-il implémenté dans `HomePage` ?
**Réponse :**
Le debounce retarde l'exécution d'une fonction jusqu'à ce que l'utilisateur cesse de déclencher l'événement pendant un délai donné. Sans debounce, chaque frappe dans une barre de recherche déclencherait un appel API.

Implémentation dans `HomePage` :
```typescript
const [searchQuery, setSearchQuery] = useState('')
const [debouncedSearch, setDebouncedSearch] = useState('')

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchQuery) // ne s'exécute que si searchQuery ne change plus
  }, 400) // attend 400ms
  
  return () => clearTimeout(timer) // annule le timer si l'utilisateur retape
}, [searchQuery])

// L'appel API utilise debouncedSearch, pas searchQuery
useEffect(() => {
  productService.search({ search: debouncedSearch })
  // ...
}, [debouncedSearch])
```

---

---

## 6. TYPESCRIPT DANS LE PROJET

### Q37. Qu'est-ce qu'une interface TypeScript et comment est-elle utilisée dans ce projet ?
**Réponse :**
Une interface TypeScript définit la forme d'un objet — les propriétés attendues et leurs types. Elle est effacée à la compilation (elle ne génère pas de JavaScript).

Dans `product.types.ts` :
```typescript
interface Product {
  id: number
  name: string
  price: number
  stock: number
  category?: Category     // ? = optionnel
  images?: ProductImage[] // tableau d'images
  roastLevel?: RoastLevel // union type
}
```
Cela garantit que partout où un `Product` est manipulé, ses propriétés sont correctement typées.

---

### Q38. Qu'est-ce qu'un type générique `<T>` et comment est-il utilisé dans ce projet ?
**Réponse :**
Un générique permet d'écrire du code réutilisable qui fonctionne avec différents types. `T` est un paramètre de type (comme un paramètre de fonction, mais pour les types).

Dans `useLocalStorage` :
```typescript
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void]
```
On peut appeler `useLocalStorage<string>('token', '')` ou `useLocalStorage<User | null>('user', null)` — le même code s'adapte.

Dans `BaseService<T>` : la classe de base gère les requêtes `fetch` pour n'importe quel type (`Product`, `Cart`, `AuthUser`...).

---

### Q39. Qu'est-ce qu'un type "union" en TypeScript ? Exemple dans le projet.
**Réponse :**
Un union type est une valeur qui peut être de plusieurs types, séparés par `|` :
```typescript
// Dans product.types.ts
type RoastLevel = 'light' | 'medium' | 'medium-dark' | 'dark'

// Dans ProductDetailPage
const [loading, setLoading] = useState<boolean>(false)
// ou
const [error, setError] = useState<string | null>(null) // soit une string, soit null
```

---

### Q40. Qu'est-ce que `Record<K, V>` en TypeScript ? Exemple dans le projet.
**Réponse :**
`Record<K, V>` est un type utilitaire TypeScript qui représente un objet dont les clés sont de type `K` et les valeurs de type `V`.

Dans `product.constants.ts` :
```typescript
const ROAST_LABELS: Record<RoastLevel, string> = {
  light: 'Claire',
  medium: 'Médium',
  'medium-dark': 'Médium-foncé',
  dark: 'Foncée'
}
```
TypeScript vérifie que toutes les valeurs possibles de `RoastLevel` sont présentes comme clés. Si tu oublies `'dark'`, c'est une erreur de compilation.

---

### Q41. Qu'est-ce que le fichier `tsconfig.json` ?
**Réponse :**
C'est la configuration du compilateur TypeScript. Il indique notamment :
- `"target"` : vers quel version JS compiler (ES2020...)
- `"strict"` : active les vérifications strictes (non-null, any implicite...)
- `"jsx": "react-jsx"` : comment transformer le JSX
- `"paths"` : alias d'imports
- `"include"` / `"exclude"` : quels fichiers compiler

Le projet a deux tsconfigs : `tsconfig.json` (app) et `tsconfig.node.json` (fichiers Node comme `vite.config.ts`).

---

---

## 7. ROUTING ET NAVIGATION

### Q42. Qu'est-ce que React Router et comment est-il configuré dans ce projet ?
**Réponse :**
React Router `v6` est la bibliothèque de routing pour les SPA React. Il permet de définir quel composant (page) afficher selon l'URL, sans rechargement de page.

Configuration dans `src/router/index.tsx` :
```typescript
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/product/:id" element={<ProductDetailPage />} />
  <Route path="/profile" element={
    <ProtectedRoute><ProfilePage /></ProtectedRoute>
  } />
  <Route path="*" element={<NotFoundPage />} />
</Routes>
```
`BrowserRouter` dans `App.tsx` active le routing basé sur l'URL du navigateur (pas les hash `#`).

---

### Q43. Qu'est-ce qu'une SPA (Single Page Application) et quels en sont les avantages/inconvénients ?
**Réponse :**
Une SPA est une application web qui charge une seule page HTML et met à jour dynamiquement le contenu via JavaScript, sans rechargement complet de page.

**Avantages :**
- Navigation ultra-rapide (pas de rechargement)
- Expérience utilisateur fluide (comme une app native)
- Séparation claire frontend/backend

**Inconvénients :**
- SEO difficile (le HTML initial est vide, le contenu est injecté en JS)
- Chargement initial plus long (bundle JS à télécharger)
- Gestion de l'historique navigateur plus complexe

---

### Q44. Qu'est-ce que `ProtectedRoute` et comment fonctionne-t-il ?
**Réponse :**
`ProtectedRoute` est un composant wrapper qui vérifie si l'utilisateur est authentifié avant d'afficher les enfants. S'il n'est pas connecté, il redirige vers `/login`.

```typescript
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
    // replace = remplace l'entrée dans l'historique (pas de "retour" vers la page protégée)
  }
  return <>{children}</>
}
```

Dans le router : `<Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />`

---

### Q45. Pourquoi utilise-t-on `<Navigate replace />` plutôt que juste `<Navigate />` ?
**Réponse :**
- `<Navigate to="/login" />` : ajoute `/login` à l'historique du navigateur. L'utilisateur peut appuyer sur "Retour" pour retourner sur `/cart` et être redirigé en boucle.
- `<Navigate to="/login" replace />` : **remplace** l'entrée courante dans l'historique. L'utilisateur ne peut pas revenir à la page protégée via le bouton "Retour" du navigateur.

---

### Q46. Quelle est la différence entre `useNavigate` et `<Link>` ?
**Réponse :**
- **`<Link to="/profile">`** : navigation déclarative dans le JSX, génère un `<a>` accessible
- **`useNavigate()`** : navigation **impérative** dans la logique JS

```typescript
const navigate = useNavigate()
// Après un login réussi :
navigate('/') // navigation programmée, pas dans le JSX
```
Dans ce projet : `navigate('/login')` est utilisé dans `handleAddToCart` si non authentifié — on ne peut pas utiliser `<Link>` ici car c'est dans un gestionnaire d'événement.

---

---

## 8. SERVICES ET COMMUNICATION AVEC L'API

### Q47. Comment est organisée la couche service du frontend ?
**Réponse :**
Il y a une hiérarchie de classes :
```
BaseService<T> (abstract)
├── AuthService   (endpoint /users)
├── ProductService (endpoint /products)
├── CartService   (endpoint /carts)
└── UserService   (endpoint /users)
```
`BaseService` fournit les méthodes communes : `getAll()`, `getById()`, `buildUrl()`, `handleResponse()`.  
Les services spécifiques héritent et ajoutent leurs méthodes propres (`search()`, `signin()`, `addProduct()`...).

C'est le **patron Template Method** (design pattern) : la structure est définie dans la classe de base, les détails dans les sous-classes.

---

### Q48. Qu'est-ce que `fetch` et comment est-il utilisé dans les services ?
**Réponse :**
`fetch` est l'API native du navigateur pour faire des requêtes HTTP. Elle retourne une **Promise**.

```typescript
const response = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer token' },
  body: JSON.stringify(data)
})
const json = await response.json()
```

Dans `handleResponse()` de `BaseService`, la réponse est automatiquement convertie en JSON et les clés Sequelize (PascalCase) sont normalisées en camelCase.

---

### Q49. Qu'est-ce qu'une Promise et comment fonctionne `async/await` ?
**Réponse :**
Une **Promise** représente une valeur qui sera disponible dans le futur (résultat d'une opération asynchrone, typiquement un appel réseau). Elle a 3 états : pending, fulfilled, rejected.

`async/await` est du "sucre syntaxique" qui simplifie l'écriture des Promises :
```typescript
// Avec .then()
fetch(url).then(res => res.json()).then(data => setProducts(data))

// Avec async/await (plus lisible)
const loadProducts = async () => {
  try {
    const data = await productService.getAll()
    setProducts(data)
  } catch (error) {
    setError("Erreur de chargement")
  }
}
```
`await` "met en pause" l'exécution de la fonction async jusqu'à ce que la Promise se résolve, sans bloquer le reste du programme.

---

### Q50. Qu'est-ce que `getHeaders()` dans `api.ts` et à quoi sert le header `Authorization: Bearer` ?
**Réponse :**
`getHeaders()` est une fonction utilitaire qui construit les headers HTTP pour chaque requête :
- `Content-Type: application/json` : indique que le body est du JSON
- `Authorization: Bearer <token>` : envoie le JWT pour prouver l'identité. Le préfixe `Bearer` est la convention OAuth 2.0
- `X-Requested-With: XMLHttpRequest` : indique que c'est une requête AJAX
- `Cache-Control: no-cache` : évite que le navigateur mette en cache les réponses API

Le token est lu directement depuis `localStorage.getItem('auth_token')` (pas via le contexte, car `getHeaders` est utilisé hors composants React).

---

### Q51. Qu'est-ce que CORS et pourquoi est-il configuré sur le backend ?
**Réponse :**
CORS (Cross-Origin Resource Sharing) est un mécanisme de sécurité des navigateurs. Par défaut, un navigateur bloque les requêtes JavaScript vers un domaine différent de l'origine de la page.

Le frontend React tourne sur `http://localhost:5173` (Vite) et l'API sur `http://localhost:8080` → **origines différentes** → le navigateur bloquerait les requêtes.

`cors()` dans `main.js` ajoute les headers appropriés (`Access-Control-Allow-Origin: *`) pour autoriser ces requêtes cross-origin. En production, il faudrait restreindre l'origine au domaine du frontend.

---

### Q52. Pourquoi la fonction `handleResponse` normalise-t-elle les clés Sequelize ?
**Réponse :**
Sequelize retourne les associations avec des noms en PascalCase (commence par majuscule), ex : un produit avec ses images sera `{ name: "...", Images: [...], Category: {...} }`. En TypeScript/React, la convention est le camelCase (`images`, `category`).

La fonction récursive `normalizeKeys()` dans `handleResponse` transforme automatiquement :
- `Images` → `images`
- `Category` → `category`
- `Products` → `products`

Cela évite d'avoir à gérer deux conventions dans le code frontend.

---

### Q53. Qu'est-ce qu'un singleton et comment est-il utilisé dans les services ?
**Réponse :**
Un singleton est un objet dont il n'existe **qu'une seule instance**. Dans ce projet, chaque service est exporté comme instance unique :
```typescript
// authService.ts
export const authService = new AuthService()
// Tout le monde importe la même instance, pas besoin de créer un new AuthService() à chaque fois
```
C'est suffisant ici car les services ne stockent pas d'état (ce sont de simples wrappers de `fetch`).

---

---

## 9. COMPOSANTS CLÉS

### Q54. Explique la structure de `PageLayout`.
**Réponse :**
`PageLayout` est un composant de mise en page générique qui enveloppe toutes les pages :
```typescript
const PageLayout = ({ children, bg = 'background.cream' }) => (
  <Box display="flex" flexDirection="column" minH="100vh" bg={bg}>
    <Navbar />
    <Box flex={1}>{children}</Box>  {/* flex:1 = occupe tout l'espace disponible */}
    <Footer />
  </Box>
)
```
`minH="100vh"` → la page occupe toujours au minimum toute la hauteur de l'écran.  
`flex={1}` sur le contenu → le footer reste collé en bas même si le contenu est court (sticky footer sans CSS absolu).

---

### Q55. Explique comment `RelatedProducts` filtre et limite les produits.
**Réponse :**
```typescript
const MAX_SUGGESTIONS = 4

const RelatedProducts = ({ currentProductId, products }) => {
  const suggestions = products
    .filter(p => p.id !== currentProductId) // exclut le produit actuel
    .slice(0, MAX_SUGGESTIONS)              // garde max 4 suggestions
  
  if (suggestions.length === 0) return null // ne render rien si vide
  
  return <>{suggestions.map(p => <ProductCard key={p.id} product={p} />)}</>
}
```
La constante `MAX_SUGGESTIONS = 4` évite le "magic number" dans le code.

---

### Q56. Qu'est-ce qu'un "fallback" d'image et comment est-il géré dans `ProductCard` ?
**Réponse :**
Si une image produit n'a pas d'URL ou si la propriété `images` est vide, `ProductCard` utilise une image de remplacement (fallback) :
```typescript
const imageUrl = product.images?.[0]?.link || 'https://placehold.co/400x300?text=Coffee'
```
- `product.images?.[0]?.link` : optional chaining — retourne `undefined` si `images` est null/undefined
- `|| 'https://...'` : si undefined/null/vide, utilise l'image placeholder

---

### Q57. Qu'est-ce que l'optional chaining `?.` en JavaScript/TypeScript ?
**Réponse :**
L'optional chaining permet d'accéder à des propriétés potentiellement nulles sans provoquer d'erreur :
```typescript
// Sans optional chaining (risque de TypeError)
product.images[0].link // si images est null → crash

// Avec optional chaining
product.images?.[0]?.link // si images est null → retourne undefined (pas d'erreur)
```
Très utilisé dans ce projet pour accéder aux associations Sequelize qui peuvent être absentes : `cart?.Products?.length ?? 0`.

---

---

## 10. BACKEND NODE.JS / EXPRESS

### Q58. Comment fonctionne le middleware pipeline dans Express ?
**Réponse :**
Dans Express, une requête HTTP passe par une **chaîne de middlewares** dans l'ordre de leur déclaration. Chaque middleware peut :
1. Modifier `req` ou `res`
2. Appeler `next()` pour passer au middleware suivant
3. Mettre fin à la requête (`res.json(...)`)

```javascript
// Dans main.js
app.use(cors())                    // 1. CORS headers
app.use(bodyParser.json())         // 2. Parse le body JSON
app.use('/api', authenticate)      // 3. Vérifie JWT pour toutes les routes /api
app.use('/api', load_user)         // 4. Charge req.user depuis la BDD
app.use('/api', router)            // 5. Route vers le bon controller
app.use(errorHandler)              // 6. Gestion globale des erreurs
```

---

### Q59. Comment fonctionnent les routes dans ce projet ? Qu'est-ce que le chargement dynamique ?
**Réponse :**
Dans `routes/index.js`, les routes sont chargées dynamiquement :
```javascript
fs.readdirSync(__dirname)         // lit le dossier routes/
  .filter(f => f !== 'index.js') // exclut lui-même
  .forEach(file => {
    const routes = require(`./${file}`) // charge chaque fichier
    routes.forEach(({ url, method, func }) => {
      router[method](url, func)  // app.get('/products', controller)
    })
  })
```
Chaque fichier de route exporte un tableau : `module.exports = [{ url: '/users', method: 'get', func: get_all }]`

Ce pattern évite d'importer manuellement chaque fichier de route dans `index.js`.

---

### Q60. Qu'est-ce que `req`, `res`, `next` dans Express ?
**Réponse :**
- **`req`** (Request) : représente la requête HTTP entrante. Contient : `req.body` (body parsé), `req.params` (`:id` dans l'URL), `req.query` (`?search=...`), `req.user` (ajouté par le middleware `load_user`), `req.auth` (ajouté par `express-jwt`)
- **`res`** (Response) : permet d'envoyer la réponse. `res.json(data)`, `res.status(404).json({message: '...'})`, `res.sendStatus(201)`
- **`next`** : fonction pour passer au middleware suivant. `next(error)` pour déclencher le handler d'erreur global.

---

### Q61. Qu'est-ce que `body-parser` et pourquoi en a-t-on besoin ?
**Réponse :**
HTTP transmet les données sous forme de texte brut (stream). `body-parser.json()` lit le corps de la requête et le convertit en objet JavaScript accessible via `req.body`. Sans ce middleware, `req.body` serait `undefined` pour les requêtes POST/PUT.

```javascript
// sans body-parser
req.body // undefined
// avec body-parser.json()
req.body // { emailAddress: "user@test.com", password: "..." }
```

---

### Q62. Comment fonctionne la gestion des erreurs globale dans Express ?
**Réponse :**
Dans Express, un middleware à **4 paramètres** `(err, req, res, next)` est automatiquement reconnu comme gestionnaire d'erreurs. Il est déclaré **en dernier** dans `main.js` :
```javascript
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || 'Erreur interne' })
})
```
Si n'importe quel controller appelle `next(error)`, Express saute tous les middlewares normaux et appelle directement ce handler.

---

### Q63. Qu'est-ce que `module.exports` et `require` en Node.js ?
**Réponse :**
C'est le système de modules CommonJS (CJS) de Node.js :
- `module.exports = { maFonction }` : exporte depuis un fichier
- `const { maFonction } = require('./fichier')` : importe

C'est l'équivalent de `export` / `import` d'ES Modules (utilisé côté React). Le backend Node.js utilise CommonJS, le frontend React/Vite utilise ESM.

---

---

## 11. BASE DE DONNÉES ET SEQUELIZE

### Q64. Qu'est-ce qu'un ORM et pourquoi utiliser Sequelize ?
**Réponse :**
Un ORM (Object-Relational Mapper) est une couche d'abstraction qui permet de manipuler une base de données relationnelle avec du code objet, sans écrire de SQL.

Sequelize permet d'écrire :
```javascript
User.findByPk(id)                   // SELECT * FROM Users WHERE id = ?
User.create({ firstName, email })   // INSERT INTO Users VALUES (...)
cart.addProduct(product)            // INSERT INTO Product_Cart VALUES (...)
```
Avantages : protection contre les injections SQL, portabilité entre SGBD, associations gérées automatiquement.

---

### Q65. Explique les relations entre les modèles dans ce projet.
**Réponse :**
| Relation | Entités | Type | Table jointure |
|---|---|---|---|
| Un user a plusieurs adresses | User → MailingAddress | `hasMany` | - |
| Un user a un panier | User → Cart | `hasOne` | - |
| Un panier a plusieurs produits | Cart ↔ Product | `belongsToMany` | `Product_Cart` |
| Un user a plusieurs rôles | User ↔ Role | `belongsToMany` | `Users_Roles` |
| Un produit appartient à une catégorie | Product → Category | `belongsTo` | - |
| Un produit a plusieurs images | Product → Image | `hasMany` | - |

Les relations `belongsToMany` créent automatiquement des tables de jointure.

---

### Q66. Qu'est-ce que `sequelize.sync()` ?
**Réponse :**
`sequelize.sync()` crée (ou met à jour) les tables en base de données à partir des définitions des modèles. Options :
- `sync()` : créé les tables si elles n'existent pas (sans les supprimer)
- `sync({ force: true })` : supprime ET recrée toutes les tables (⚠️ perd les données)
- `sync({ alter: true })` : modifie les tables existantes pour correspondre aux modèles

Dans ce projet, un `sequelize.sync()` simple est utilisé au démarrage.

---

### Q67. Qu'est-ce que `onDelete: 'CASCADE'` dans les associations ?
**Réponse :**
La suppression en cascade : si un `User` est supprimé, toutes ses `MailingAddress`, `Phone`, `PaymentMethod` sont automatiquement supprimées aussi en base de données (pas d'orphelins).

```javascript
User.hasMany(MailingAddress, { onDelete: 'CASCADE' })
```
Sans ça, supprimer un user avec des adresses lancerait une erreur de contrainte d'intégrité référentielle (clé étrangère).

---

### Q68. Comment est-ce que `total` du panier est-il calculé et pourquoi n'est-il pas en base ?
**Réponse :**
Dans `cart_ctrl.js`, le total est calculé dynamiquement :
```javascript
const total = cart.Products.reduce((sum, product) => sum + product.price, 0)
cart.dataValues.total = total  // ajouté en mémoire, pas sauvegardé en BDD
```
Il n'est pas stocké en base car c'est une **valeur dérivée** (calculable depuis les produits du panier). Stocker une valeur dérivée crée un risque de désynchronisation (si le prix d'un produit change, le total serait faux). On applique le principe de "source unique de vérité".

---

### Q69. Pourquoi `User.toJSON()` est-il overridé pour supprimer le mot de passe ?
**Réponse :**
```javascript
// models/user.js
toJSON() {
  const values = { ...this.get() }
  delete values.password
  return values
}
```
`toJSON()` est appelé automatiquement par Express quand il sérialise l'objet en JSON pour la réponse HTTP (`res.json(user)`). En supprimant `password` ici, on s'assure qu'il n'est **jamais** envoyé au client, quelle que soit la route qui retourne un User — protection systématique, même si le développeur oublie de l'exclure manuellement.

---

### Q70. Qu'est-ce que `Op.like` dans Sequelize et comment est-il utilisé ?
**Réponse :**
`Op.like` est l'opérateur SQL `LIKE` dans Sequelize, pour la recherche par pattern avec `%` comme wildcard :
```javascript
// Dans product_ctrl.js - recherche textuelle
where: {
  [Op.or]: [
    { name: { [Op.like]: `%${search}%` } },        // contient dans le nom
    { description: { [Op.like]: `%${search}%` } }  // ou dans la description
  ]
}
// Équivalent SQL : WHERE name LIKE '%coffee%' OR description LIKE '%coffee%'
```

---

---

## 12. AUTHENTIFICATION ET JWT

### Q71. Qu'est-ce qu'un JWT et comment est-il structuré ?
**Réponse :**
JWT (JSON Web Token) est un token signé composé de 3 parties encodées en Base64, séparées par des `.` :

```
eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZW1haWwiOiIuLi4ifQ.SIGNATURE
      HEADER                    PAYLOAD                  SIGNATURE
```

- **Header** : algorithme de signature (`HS256`)
- **Payload** : données (dans ce projet : `id`, `firstName`, `lastName`, `emailAddress`) — ⚠️ **non chiffré**, lisible par tous
- **Signature** : `HMAC(header + payload, secret_key)` — prouve que le token n'a pas été modifié

Le serveur vérifie la signature à chaque requête. L'état n'est pas stocké côté serveur → stateless.

---

### Q72. Comment fonctionne le flux de connexion dans ce projet ?
**Réponse :**
```
1. [Client] LoginPage → authService.signin({ email, password })
           → POST /api/users/signin

2. [Serveur] user_ctrl.signIn :
   - User.findOne({ where: { emailAddress: email } })
   - bcrypt.compareSync(password, user.password)
   - Si OK : jwt.sign(user.toJSON(), 'private_key')
   - Retourne { token, user }

3. [Client] login(token, user) appelé dans AuthContext
   - useLocalStorage → sauvegarde token + user dans localStorage
   - isAuthenticated = true
   - navigate('/')
```

---

### Q73. Qu'est-ce que `bcrypt` et pourquoi hache-t-on les mots de passe ?
**Réponse :**
`bcrypt` est un algorithme de hachage de mots de passe. Un haché bcrypt ressemble à : `$2b$10$...` (impossibles à décrypter). Il utilise un **sel** (salt) aléatoire généré automatiquement pour éviter les attaques par table arc-en-ciel.

```javascript
// À l'inscription
const hashed = bcrypt.hashSync(plainPassword, 10) // 10 = coût (rounds)
User.create({ password: hashed })

// À la connexion
bcrypt.compareSync(plainPassword, hashedInDB) // true/false
```
On ne stocke **jamais** les mots de passe en clair. Si la base de données est compromise, les mots de passe restent illisibles.

---

### Q74. Comment le middleware `authenticate` protège-t-il les routes ?
**Réponse :**
```javascript
// middlewares/auth.js
const authenticate = expressjwt({
  secret: 'private_key',
  algorithms: ['HS256']
}).unless({
  path: [
    '/api/users/signup', '/api/users/signin',  // pas de JWT requis
    { url: '/api/products', methods: ['GET'] }, // GET produits = public
    '/api/categories'
  ]
})
```
Si le token est absent ou invalide sur une route protégée, `express-jwt` renvoie automatiquement un `401 Unauthorized`. Si valide, le payload décodé est mis dans `req.auth`.

---

### Q75. Qu'est-ce que le middleware `ownership` et comment fonctionne-t-il ?
**Réponse :**
`checkOwnership` vérifie qu'un utilisateur n'accède qu'à ses **propres** ressources :
```javascript
// middlewares/ownership.js
const checkOwnership = (userIdParam = 'user_id') => {
  return async (req, res, next) => {
    const isAdmin = await isUserAdmin(req.user.id)
    if (isAdmin) return next()  // les admins ont tous les droits
    
    if (req.user.id !== parseInt(req.params[userIdParam])) {
      return res.status(403).json({ message: 'Accès refusé' })
    }
    next()
  }
}
```
C'est une **factory de middlewares** : `checkOwnership('user_id')` retourne un middleware. Cela le rend configurable pour différents paramètres de route.

---

### Q76. Qu'est-ce que le middleware `isAdmin` ?
**Réponse :**
```javascript
// middlewares/admin.js
const isAdmin = async (req, res, next) => {
  if (!req.user) return res.status(401).json({...})
  
  const user = await User.findByPk(req.user.id, { include: Role })
  const admin = user.Roles.some(r => r.name.toLowerCase() === 'admin')
  
  if (!admin) return res.status(403).json({ message: 'Accès interdit' })
  next()
}
```
Différence entre **401 Unauthorized** (non authentifié, pas de token) et **403 Forbidden** (authentifié mais pas les droits).

---

### Q77. Quels sont les risques de sécurité liés à la clé JWT en dur `'private_key'` ?
**Réponse :**
C'est une **vulnérabilité critique** (Cryptographic Failure — OWASP A02). Une clé en dur dans le code source :
- Est visible dans l'historique Git
- Peut être exposée si le dépôt est public
- Ne peut pas être changée sans redéployer l'application

La bonne pratique : `process.env.JWT_SECRET` chargé depuis un fichier `.env` (jamais versionné) :
```javascript
jwt.sign(payload, process.env.JWT_SECRET) // clé dans variable d'environnement
```

---

---

## 13. SYSTÈME DE PANIER

### Q78. Comment fonctionne la logique "getOrCreate" du panier ?
**Réponse :**
```javascript
// cart_ctrl.js
const getOrCreate = async (req, res) => {
  let cart = await req.requestedUser.getCart({
    include: [{ model: Product, include: [Category, Image] }]
  })
  
  if (!cart) {
    // Création si inexistant
    cart = await Cart.create({ expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) })
    await req.requestedUser.setCart(cart)
  }
  
  cart.dataValues.total = cart.Products.reduce((sum, p) => sum + p.price, 0)
  res.json(cart)
}
```
`getCart()` est une méthode auto-générée par Sequelize pour l'association `hasOne(Cart)`.

---

### Q79. Pourquoi `CartContext` a-t-il `loadingProductId` au lieu d'un simple `isLoading` ?
**Réponse :**
Avec un simple `isLoading`, tous les boutons "Ajouter" ou "Supprimer" du panier afficheraient un spinner en même temps quand une opération est en cours. Avec `loadingProductId`, on sait **quel produit précis** est en cours d'opération :

```typescript
// Dans CartPage
{cart.Products.map(product => (
  <Button
    isLoading={loadingProductId === product.id}  // spinner uniquement sur CE produit
    onClick={() => removeFromCart(product.id)}
  >
    ✕
  </Button>
))}
```
C'est un choix d'UX (User Experience) qui rend l'interface plus réactive et précise.

---

### Q80. Comment le panier est-il synchronisé entre le serveur et le client ?
**Réponse :**
1. **Au connexion** : `CartContext` détecte `isAuthenticated = true` → `refreshCart()` → `GET /api/carts/user/:id`
2. **Lors d'un `addToCart`** : appel API `POST /api/carts/:cartId/products/:productId`, puis `refreshCart()` pour re-synchroniser l'état local avec la BDD
3. **À la déconnexion** : `cart` est mis à `null` dans le contexte
4. **Pas de polling** : le panier n'est rechargé que sur action utilisateur ou connexion (pas de websocket ni intervalle)

---

---

## 14. SÉCURITÉ

### Q81. Quelles sont les mesures de sécurité en place dans ce projet ?
**Réponse :**
**Côté backend :**
- Mots de passe hachés avec bcrypt (sel aléatoire, 10 rounds)
- JWT pour l'authentification stateless (HMAC HS256)
- Suppression du `password` dans `User.toJSON()`
- Middleware `ownership` : un user ne peut accéder qu'à ses ressources
- Middleware `isAdmin` : vérification de rôle pour les routes admin
- Sequelize ORM : protection contre les injections SQL (requêtes paramétrées)

**Côté frontend :**
- Routes protégées via `ProtectedRoute`
- Gestion du 401 dans `ProfilePage` : logout automatique si token expiré

---

### Q82. Qu'est-ce qu'une injection SQL et comment Sequelize la prévient-elle ?
**Réponse :**
Une injection SQL consiste à injecter du code SQL malveillant dans un paramètre : `' OR 1=1 --`. Une requête non protégée comme :
```sql
SELECT * FROM users WHERE email = '" + email + "'"
```
avec `email = "' OR 1=1 --"` retournerait tous les utilisateurs.

Sequelize utilise des **requêtes paramétrées** (préparées) : les valeurs sont séparées de la requête SQL et passées comme paramètres — le driver SQL les échappe automatiquement. `User.findOne({ where: { emailAddress: email } })` est sûr quelle que soit la valeur d'`email`.

---

### Q83. Qu'est-ce qu'une attaque XSS et ce projet y est-il vulnérable ?
**Réponse :**
XSS (Cross-Site Scripting) : injection de code JavaScript malveillant dans une page. React protège nativement contre le XSS en **échappant automatiquement** tout contenu rendu dans le JSX :
```jsx
// Même si product.name = '<script>alert("xss")</script>'
<Text>{product.name}</Text>  // → rendu comme texte pur, pas comme HTML
```
Attention : `dangerouslySetInnerHTML` contourne cette protection et doit être évité.

---

### Q84. Quels sont les points d'amélioration de sécurité dans ce projet ?
**Réponse :**
1. **Clé JWT en dur** (`'private_key'`) → à externaliser dans `process.env.JWT_SECRET`
2. **CORS trop permissif** (`cors()` sans options = `*`) → restreindre à l'URL du frontend
3. **Pas de refresh token** → un JWT expiré force un logout (UX dégradée mais sécurisé)
4. **Pas de rate limiting** → l'endpoint `/signin` est vulnérable aux attaques brute force
5. **Pas d'expiration du JWT** → une fois émis, le token est valide indéfiniment (idéalement ajouter `expiresIn: '24h'`)
6. **Paiement non implémenté** → `PaymentMethod` stocke le `cardNumber` en clair (violerait PCI-DSS en vrai)

---

---

## 15. QUESTIONS DE CODE POINTUES

### Q85. Qu'est-ce que l'`optional chaining` `?.` vs le `nullish coalescing` `??` ?
**Réponse :**
```typescript
// Optional chaining ?. : accès sécurisé à une propriété potentiellement null
cart?.Products?.length  // undefined si cart est null, sinon cart.Products.length

// Nullish coalescing ?? : valeur par défaut si null ou undefined (pas si 0 ou '')
cart?.Products?.length ?? 0  // 0 si le résultat est null ou undefined

// Différence avec || :
0 || 5     // → 5 (0 est falsy)
0 ?? 5     // → 0 (0 n'est ni null ni undefined)
```
Dans `Navbar` : `cart?.Products?.length ?? 0` donne `0` même si le panier est vide (0 produits), pas `5` par défaut.

---

### Q86. Qu'est-ce que le spread operator `...` et comment est-il utilisé dans ce projet ?
**Réponse :**
Le spread operator `...` "étale" les éléments d'un tableau ou les propriétés d'un objet :

```typescript
// Dans ProfilePage — n'envoie le mot de passe que s'il est rempli
const payload = {
  firstName,
  lastName,
  ...(password.trim() !== '' && { password })  // spread conditionnel
}
// Si password = '' : payload = { firstName, lastName }
// Si password = '123' : payload = { firstName, lastName, password: '123' }

// Dans BaseService — copie d'objet
const values = { ...this.get() }  // copie superficielle
```

---

### Q87. Qu'est-ce qu'un `reduce()` et comment calcule-t-il le total du panier ?
**Réponse :**
`reduce()` parcourt un tableau et accumule une valeur :
```javascript
// cart_ctrl.js
const total = cart.Products.reduce(
  (accumulator, product) => accumulator + product.price,  // fonction réductrice
  0  // valeur initiale de l'accumulateur
)
// [{ price: 12 }, { price: 8 }, { price: 15 }]
// → 0 + 12 = 12 → 12 + 8 = 20 → 20 + 15 = 35
```

---

### Q88. Qu'est-ce qu'une classe abstraite et comment est-elle utilisée dans les services ?
**Réponse :**
Une classe abstraite (`abstract class` en TypeScript) ne peut pas être instanciée directement — elle sert de base à d'autres classes. Elle peut définir des méthodes concrètes (réutilisables) et abstraites (à implémenter dans les sous-classes).

```typescript
abstract class BaseService<T> {
  protected endpoint: string
  
  buildUrl(path = ''): string {
    return `${baseUrl}${this.endpoint}${path}`  // méthode concrète réutilisable
  }
  
  async getById(id: number): Promise<T> {
    const res = await fetch(this.buildUrl(`/${id}`))
    return this.handleResponse<T>(res)
  }
}

class ProductService extends BaseService<Product> {
  constructor() { super(); this.endpoint = '/products' }
  
  async search(params?): Promise<Product[]> { /* méthode spécifique */ }
}
```

---

### Q89. Qu'est-ce que `readdirSync` dans le backend et pourquoi est-il utilisé ?
**Réponse :**
`fs.readdirSync(path)` est une méthode Node.js qui lit **synchroniquement** le contenu d'un dossier et retourne un tableau de noms de fichiers.

Dans `routes/index.js` et `models/index.js` :
```javascript
const files = fs.readdirSync(__dirname)
  .filter(f => f !== 'index.js' && f.endsWith('.js'))
```
Cela permet de **charger automatiquement** tous les fichiers de routes/modèles sans avoir à les importer manuellement un par un. Avantage : ajouter une nouvelle route = créer le fichier, pas besoin de modifier `index.js`.

---

### Q90. Qu'est-ce que `extendTheme` de Chakra UI dans `theme.ts` ?
**Réponse :**
`extendTheme()` permet de personnaliser le thème par défaut de Chakra UI de façon **déclarative** et **type-safe** :
```typescript
const theme = extendTheme({
  colors: {
    primary: { 900: '#3E2723' },    // surcharge la palette
    background: { cream: '#F7F4F0' }
  },
  fonts: {
    heading: 'Playfair Display, serif',
    body: 'Inter, sans-serif'
  },
  config: { initialColorMode: 'light' }
})
```
Ces valeurs sont accessibles dans tous les composants Chakra via des props : `<Box bg="background.cream">`, `<Heading fontFamily="heading">`.

---

### Q91. Pourquoi utilise-t-on `parseInt(id, 10)` dans `ProductDetailPage` ?
**Réponse :**
`useParams()` retourne toujours des **strings** même pour des paramètres numériques. `parseInt(id, 10)` convertit la string `"5"` en number `5`.

Le `10` est la **radix** (base numérique). Convention : toujours préciser `10` pour éviter des comportements inattendus (une string commençant par `0` pourrait être interprétée en base 8 par certains vieux environnements).

```typescript
const { id } = useParams()  // id = "5" (string)
const productId = parseInt(id, 10)  // → 5 (number)
productService.getById(productId)
```

---

### Q92. Qu'est-ce que `createRoot` dans `main.tsx` et pourquoi est-ce différent de l'ancien `ReactDOM.render` ?
**Réponse :**
`createRoot` est l'API React 18 qui active le **mode concurrent**. L'ancien `ReactDOM.render()` était synchrone et bloquait le thread principal.

```typescript
// React 18
const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<App />)
```

Le mode concurrent permet des fonctionnalités comme :
- **Automatic Batching** : plusieurs `setState` dans la même fonction ne déclenchent qu'un seul re-render
- **Transitions** : marquer certaines mises à jour comme non-urgentes
- **Suspense** amélioré pour le chargement de données

Le `!` à la fin de `getElementById('root')!` est l'opérateur non-null assertion TypeScript (on affirme que l'élément existe).

---

### Q93. Qu'est-ce que l'`event StorageEvent` dans `useLocalStorage` et à quoi sert-il ?
**Réponse :**
Le navigateur émet un événement `'storage'` sur la `window` quand une autre **fenêtre ou onglet** modifie le `localStorage`.

```typescript
useEffect(() => {
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === key && e.newValue !== null) {
      setValue(JSON.parse(e.newValue))
    }
  }
  window.addEventListener('storage', handleStorageChange)
  return () => window.removeEventListener('storage', handleStorageChange)  // cleanup
}, [key])
```

Sans cela, si l'utilisateur a l'app ouverte dans deux onglets et se connecte dans l'un, l'autre onglet ne le saurait pas avant le prochain rechargement.

---

### Q94. Qu'est-ce que `dataValues` en Sequelize et pourquoi `cart.dataValues.total = ...` ?
**Réponse :**
En Sequelize, une instance de modèle n'est pas un simple objet JS — c'est une instance de classe. Les données "réelles" (colonnes de la BDD) sont stockées dans `instance.dataValues`. Quand Sequelize sérialise l'instance en JSON (`toJSON()`), il utilise ces `dataValues`.

```javascript
cart.dataValues.total = 35  // ajoute une propriété virtuelle
res.json(cart)  // → inclura total dans la réponse JSON
```

C'est une façon d'ajouter un champ calculé non-persisté à une réponse Sequelize. Une alternative plus propre serait de définir un `getter` virtuel dans le modèle.

---

### Q95. Qu'est-ce que `scrollIntoView()` et comment est-il utilisé dans `HomePage` ?
**Réponse :**
`scrollIntoView()` est une API DOM native qui fait défiler la page pour rendre un élément visible dans le viewport :

```typescript
const catalogRef = useRef<HTMLDivElement>(null)

const scrollToCatalog = () => {
  catalogRef.current?.scrollIntoView({ behavior: 'smooth' })
}

// Dans le JSX
<Button onClick={scrollToCatalog}>Voir le catalogue</Button>
<div ref={catalogRef}> {/* Le catalogue */} </div>
```

`behavior: 'smooth'` active l'animation de scroll (plutôt qu'un saut instantané). Cela crée une navigation "ancre" fluide dans la SPA sans changer d'URL.

---

### Q96. Pourquoi y a-t-il deux fichiers `tsconfig` (`tsconfig.json` et `tsconfig.node.json`) ?
**Réponse :**
Les deux fichiers cibles différents :
- `tsconfig.json` : pour les fichiers de l'application React (`src/**`) qui tournent dans le **navigateur**
- `tsconfig.node.json` : pour `vite.config.ts` qui tourne dans l'environnement **Node.js** (nécessite des types Node comme `process`, `__dirname`)

`vite.config.ts` référence `tsconfig.node.json` via la directive `/// <reference>`. Séparer les configs permet d'avoir des targets et lib différents selon l'environnement d'exécution.

---

### Q97. La page `OrderConfirmationPage` ne fait aucun appel API. Qu'est-ce que cela implique et comment l'améliorer ?
**Réponse :**
Actuellement, la page affiche simplement un message de confirmation statique. Aucune commande n'est créée en base de données. Cela implique :
- Le panier n'est pas vidé après la "commande"
- Aucun historique de commandes
- Aucune logique de paiement

Pour l'améliorer, il faudrait :
1. Créer un modèle `Order` en base (avec status, date, produits, user, total)
2. Créer un endpoint `POST /api/orders`
3. L'appeler depuis `CartPage` avant de naviguer vers `/order-confirmation`
4. Vider le panier après confirmation
5. Intégrer un vrai système de paiement (Stripe, etc.)

---

### Q98. Qu'est-ce que le `?? 0` dans `cartCount = cart?.Products?.length ?? 0` dans Navbar ?
**Réponse :**
Décomposition :
1. `cart` peut être `null` (pas connecté, ou panier non chargé)
2. `cart?.Products` : si cart est null → `undefined` (pas d'erreur grâce à `?.`)
3. `cart?.Products?.length` : si Products est undefined → `undefined`
4. `?? 0` : si la valeur est `null` ou `undefined`, retourne `0`

Résultat : l'expression retourne toujours un nombre. `0` quand le panier est vide ou non chargé, sinon le nombre de produits. Ce `0` est affiché dans le badge de panier de la Navbar.

---

### Q99. Qu'est-ce que `Partial<T>` et comment pourrait-il être utilisé dans ce projet ?
**Réponse :**
`Partial<T>` est un type utilitaire TypeScript qui rend toutes les propriétés d'un type optionnelles. C'est utile pour les formulaires de mise à jour :

```typescript
// Sans Partial — obligation de fournir toutes les propriétés
interface UserUpdate {
  firstName?: string
  lastName?: string
  password?: string
}

// Avec Partial — équivalent mais automatique
type UserUpdate = Partial<AuthUser>
// → { firstName?: string; lastName?: string; emailAddress?: string; ... }
```

`UserUpdate` dans `auth.types.ts` fait déjà ce travail manuellement pour n'exposer que les champs modifiables.

---

### Q100. Si tu devais refactoriser ou améliorer une chose dans ce projet, que choisirais-tu ?
**Réponse :**
Plusieurs réponses possibles (adapter à ta réflexion) :

**Option A — Technique :** Externaliser la clé JWT dans les variables d'environnement. C'est la modification la plus critique en termes de sécurité, avec le moins d'impact sur le code existant.

**Option B — UX :** Implémenter un vrai système de commandes avec le modèle `Order` en backend, pour finaliser le tunnel de vente.

**Option C — Performance :** Déporter les filtres de `CoffeePage` côté serveur (endpoint avec query params) plutôt que de charger tous les produits et filtrer en mémoire — plus scalable.

**Option D — Architecture :** Ajouter un refresh token pour éviter que les utilisateurs soient déconnectés brusquement à l'expiration du JWT.

---

## BONUS — QUESTIONS GLOSSAIRE RAPIDE

| Terme | Définition courte |
|---|---|
| **ESLint** | Linter JS/TS — détecte les erreurs de style/logique au moment de l'écriture |
| **Vite HMR** | Hot Module Replacement — remplace le module modifié dans le navigateur sans rechargement |
| **Tree-shaking** | Vite/Rollup supprime le code non utilisé dans le bundle final |
| **Bundle** | Fichier JS unique (ou quelques fichiers) produit par Vite incluant tout le code de l'app |
| **ARIA** | Ensemble d'attributs HTML pour l'accessibilité aux personnes handicapées |
| **Framer Motion** | Bibliothèque d'animations React (requise par Chakra UI) |
| **Emotion** | CSS-in-JS (styles écrits en JavaScript, requis par Chakra UI) |
| **Barrel file** | Fichier `index.ts` qui re-exporte tout depuis un dossier pour simplifier les imports |
| **ESM vs CJS** | ES Modules (import/export) vs CommonJS (require/module.exports) |
| **OWASP Top 10** | Liste des 10 vulnérabilités web les plus critiques (injection, auth faible, XSS...) |
| **Sequelize getter** | Propriété virtuelle calculée à la volée, non stockée en BDD |
| **Seed** | Données initiales insérées en BDD pour le développement (script `init-db.js`) |
| **Magic number** | Valeur numérique non nommée dans le code (ex: `4`) → à remplacer par une constante nommée (`MAX_SUGGESTIONS = 4`) |
| **Middleware factory** | Fonction qui retourne un middleware (ex: `checkOwnership(param)`) |
| **select * N+1** | Anti-pattern DB : charger une liste puis faire une requête par élément — Sequelize `include` l'évite |

---

*Dernière mise à jour : 5 mars 2026 — Projet Forest Roast / Meridian Coffee*
