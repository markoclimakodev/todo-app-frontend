export const todoListCategories: Record<string, string> = {
  "todas tarefas": "LayoutList",
  "importantes": "Star",
  "profissional": "Briefcase",
  "estudos": "GraduationCap",
  "concluídas": "CheckSquare",
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