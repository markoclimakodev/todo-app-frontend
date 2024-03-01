export const todoListCategories: Record<string, string> = {
  "todas tarefas": "LayoutList",
  "importantes": "Star",
  "profissional": "Briefcase",
  "estudos": "GraduationCap",
  "concluídas": "CheckSquare",
  "casa": "Home",
  "academia": "Dumbbell",
  "esportes": "Bike",
  "idiomas": "Languages",
  "code": "Code2",
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

export const handleTaskListIcons = (icon: string) => {
  return todoListCategories[icon] || 'BookmarkCheck'
}