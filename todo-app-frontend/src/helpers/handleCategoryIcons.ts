export const todoListCategories: Record<string, string> = {
  "todas": "LayoutList",
  "importantes": "Star",
  "profissional": "Briefcase",
  "estudos": "GraduationCap",
  "concluídas": "CheckSquare",
  "casa": "Home",
  "academia": "Dumbbell",
  "esportes": "Bike",
  "idiomas": "Languages",
  "code": "Code2",
  "programação": "Code2",
  "react": "Code2",
  "node": "Hexagon",
  "compras": "ShoppingCart",
  "financeiro": "CircleDollarSign",
  "hobbies": "Laugh",
  "outros": "Shapes",
  "pessoal": "BookUser",
  "relacionamentos": "Handshake",
  "criativos": "Sparkles",
  "saúde e bem-estar": "HeartPulse",
  "viagens": "PlaneTakeoff",
  "livros": "LibraryBig",
}

export const handleCategoryIcons = (icon: string) => {
  return todoListCategories[icon] || 'BookmarkCheck'
}