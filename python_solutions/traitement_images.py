# Traitement d'images en niveaux de gris
# Images représentées par des tableaux à 5 lignes et 4 colonnes
# Valeurs de pixels : 0 (noir) à 255 (blanc)

# =============================================================================
# QUESTION 1 : Algorithme mystère (retournement vertical)
# =============================================================================

Tab = [
    [0,   0,   255, 255],
    [255, 255, 255, 255],
    [0,   255, 0,   225],
    [0,   0,   255, 0  ],
    [0,   0,   0,   0  ],
]

def algorithme_mystere(Tab):
    """Retourne un nouveau tableau TabRes où TabRes[i][j] = Tab[4-i][j].
    Cela correspond à un retournement vertical (flip) de l'image."""
    TabRes = [[0] * 4 for _ in range(5)]
    for i in range(5):
        for j in range(4):
            TabRes[i][j] = Tab[4 - i][j]
    return TabRes

def afficher_tableau(tableau, titre=""):
    if titre:
        print(titre)
    for ligne in tableau:
        print(ligne)
    print()

TabRes = algorithme_mystere(Tab)
afficher_tableau(Tab, "Tableau Tab (image initiale) :")
afficher_tableau(TabRes, "Tableau TabRes après algorithme mystère (retournement vertical) :")

# =============================================================================
# QUESTION 2 : Vérifier si une image est entièrement noire
# =============================================================================

def est_entierement_noire(T):
    """Retourne True si tous les pixels du tableau T valent 0 (image noire),
    False sinon."""
    for i in range(5):
        for j in range(4):
            if T[i][j] != 0:
                return False
    return True

image_noire = [[0] * 4 for _ in range(5)]
print("Test est_entierement_noire sur image noire :", est_entierement_noire(image_noire))
print("Test est_entierement_noire sur Tab          :", est_entierement_noire(Tab))
print()

# =============================================================================
# QUESTION 3a : Calculer la luminosité (moyenne des niveaux de gris)
# =============================================================================

def luminosite(T):
    """Retourne la moyenne de toutes les valeurs du tableau T (5x4 = 20 pixels)."""
    total = 0
    for i in range(5):
        for j in range(4):
            total += T[i][j]
    return total / 20

print("Luminosité de Tab    :", luminosite(Tab))
print("Luminosité de TabRes :", luminosite(TabRes))
print()

# =============================================================================
# QUESTION 3b : Tester si l'image doit être retouchée
# =============================================================================

def necessite_retouche(T):
    """Teste si l'image associée au tableau T doit être retouchée.
    Si la luminosité est entre 100 et 150 (inclus), l'image est satisfaisante.
    Sinon, elle doit être retouchée."""
    lum = luminosite(T)
    if 100 <= lum <= 150:
        print(f"Luminosité = {lum:.1f} → Image satisfaisante, pas de retouche nécessaire.")
        return False
    else:
        print(f"Luminosité = {lum:.1f} → Image à retoucher.")
        return True

necessite_retouche(Tab)
necessite_retouche(TabRes)
