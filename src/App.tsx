import { useState, useEffect } from "react";
import { 
  defaultSites, 
  WebsiteTemplate 
} from "./data/defaultSites";
import SiteForm from "./components/SiteForm";
import { 
  Search, 
  Plus, 
  ExternalLink, 
  Edit2, 
  Trash2,
  Code
} from "lucide-react";

import LoginScreen from "./components/LoginScreen";
import { LogOut } from "lucide-react";

export default function App() {
  // --- Auth State ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // --- Persistent State ---
  const [sites, setSites] = useState<WebsiteTemplate[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  // --- Modals & Selection ---
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingSite, setEditingSite] = useState<WebsiteTemplate | null>(null);

  // Check auth session on mount
  useEffect(() => {
    const storedAuth = sessionStorage.getItem("demo_hub_authenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("demo_hub_authenticated");
    setIsAuthenticated(false);
  };

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedSites = localStorage.getItem("demo_hub_sites");
    if (savedSites) {
      try {
        setSites(JSON.parse(savedSites));
      } catch (e) {
        setSites(defaultSites);
      }
    } else {
      setSites(defaultSites);
    }
  }, []);

  // Save to LocalStorage helpers
  const saveSites = (updatedSites: WebsiteTemplate[]) => {
    setSites(updatedSites);
    localStorage.setItem("demo_hub_sites", JSON.stringify(updatedSites));
  };

  // --- CRUD Functions ---
  const handleSaveSite = (newSite: WebsiteTemplate) => {
    let updatedSites: WebsiteTemplate[];
    if (editingSite) {
      // Editing
      updatedSites = sites.map(s => s.id === newSite.id ? newSite : s);
    } else {
      // Adding new
      updatedSites = [newSite, ...sites];
    }
    saveSites(updatedSites);
    setShowFormModal(false);
    setEditingSite(null);
  };

  const handleDeleteSite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Tem a certeza de que deseja eliminar este modelo de site?")) {
      const updatedSites = sites.filter(s => s.id !== id);
      saveSites(updatedSites);
    }
  };

  // --- Filtering & Sorting Logic ---
  const categories = ["Todos", ...Array.from(new Set(sites.map(s => s.category)))];

  const filteredSites = sites.filter(site => {
    const matchesCategory = selectedCategory === "Todos" || site.category === selectedCategory;
    const matchesSearch = 
      site.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const sortedSites = [...filteredSites].sort((a, b) => {
    if (sortBy === "title_asc") return a.title.localeCompare(b.title);
    if (sortBy === "title_desc") return b.title.localeCompare(a.title);
    return 0; // relevance / order in list
  });

  const handleOpenSite = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* HEADER SECTION */}
      <header className="border-b border-slate-900 bg-slate-950/80 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            
            {/* Logo area */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-black tracking-wider uppercase text-white block leading-tight">GoWeb Hub</span>
                <p className="text-[9px] text-slate-500 tracking-normal font-medium">Demonstração de Websites</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => {
                  setEditingSite(null);
                  setShowFormModal(true);
                }}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-650 bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-2 text-[10px] sm:text-xs font-bold transition-all shadow-md shadow-indigo-950/40 cursor-pointer"
              >
                <Plus className="h-4 w-4 shrink-0" />
                <span>Adicionar Modelo</span>
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-xl bg-red-950/40 hover:bg-red-950 border border-red-900/40 hover:border-red-900 text-red-400 hover:text-red-300 px-3.5 py-2 text-[10px] sm:text-xs font-bold transition-all cursor-pointer"
                title="Terminar Sessão"
              >
                <LogOut className="h-3.5 w-3.5 shrink-0" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* SUB-HEADER INFO */}
      <div className="bg-indigo-950/20 border-b border-indigo-900/20 py-2.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs text-indigo-300">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0"></span>
          <span>Clica em qualquer cartão para abrir o website instantaneamente numa nova aba do navegador para o teu cliente.</span>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* Filters and search control panel */}
        <div className="bg-slate-900 border border-slate-850 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider hidden lg:inline">Filtrar por:</span>
            <div className="flex gap-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-medium cursor-pointer transition-all shrink-0 ${
                    selectedCategory === category
                      ? "bg-indigo-650/15 border-indigo-550 text-indigo-400 bg-indigo-600/10 border-indigo-500"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Search & Sort Panel */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 flex-1 max-w-xl md:justify-end">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar por nome ou tecnologia..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-200"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto shrink-0 select-none">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-slate-450 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="relevance">Ordenação Padrão</option>
                <option value="title_asc">Nome: A - Z</option>
                <option value="title_desc">Nome: Z - A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {sortedSites.length === 0 ? (
          <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
            <p className="text-slate-400">Nenhum modelo de site encontrado para os termos pesquisados.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Todos");
              }}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold underline cursor-pointer"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedSites.map((site) => (
              <div 
                key={site.id}
                onClick={() => handleOpenSite(site.url)}
                className="group bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-950/20 transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Image Preview Container */}
                <div className="relative aspect-video overflow-hidden bg-slate-950 shrink-0">
                  <img 
                    src={site.imageUrl} 
                    alt={site.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                  
                  {/* Badges on image */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    <span className="bg-slate-900/90 text-white text-[9px] font-bold px-2.5 py-0.5 rounded border border-slate-800 backdrop-blur-sm">
                      {site.category}
                    </span>
                  </div>

                  {/* Interactive overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-950/70 transition-opacity duration-300">
                    <div className="flex items-center gap-2 rounded-xl bg-indigo-650 bg-indigo-650/90 text-white text-xs font-bold py-2.5 px-4 shadow-lg">
                      <ExternalLink className="h-4 w-4" />
                      <span>Abrir Website</span>
                    </div>
                  </div>
                </div>

                {/* Content details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-extrabold text-sm text-white leading-tight group-hover:text-indigo-400 transition-colors">
                        {site.title}
                      </h4>
                      {site.isCustom && (
                        <span className="bg-emerald-500/10 text-emerald-400 text-[8px] font-bold px-1.5 py-0.5 rounded border border-emerald-500/20 shrink-0">
                          Personalizado
                        </span>
                      )}
                    </div>
                    
                    <p className="text-[11px] text-slate-400 leading-normal line-clamp-3">
                      {site.description}
                    </p>
                  </div>

                  {/* Tech stack */}
                  <div className="space-y-3 pt-3 border-t border-slate-800/80">
                    <div className="flex items-center gap-1.5 text-slate-455 text-slate-400">
                      <Code className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Tecnologias:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {site.techStack.map((tech, idx) => (
                        <span key={idx} className="bg-slate-950 border border-slate-850 text-indigo-400 text-[9px] px-2 py-0.5 rounded font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions buttons panel (stops card propagation for editing) */}
                  <div 
                    className="flex items-center gap-2 pt-2 border-t border-slate-800/80" 
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => handleOpenSite(site.url)}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white py-2 text-[10px] font-bold transition-all cursor-pointer"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Ver Site</span>
                    </button>

                    <button
                      onClick={() => {
                        setEditingSite(site);
                        setShowFormModal(true);
                      }}
                      className="flex items-center justify-center bg-slate-850 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-lg p-2 transition-all cursor-pointer"
                      title="Editar Website"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={(e) => handleDeleteSite(site.id, e)}
                      className="flex items-center justify-center bg-slate-850 hover:bg-red-950 border border-slate-800 hover:border-red-900 text-red-400 hover:text-red-300 rounded-lg p-2 transition-all cursor-pointer"
                      title="Eliminar Website"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Demo Hub. Acesso rápido e simples aos teus projetos.</p>
        </div>
      </footer>

      {/* Site Form Modal (Add / Edit Templates) */}
      {showFormModal && (
        <SiteForm
          site={editingSite}
          onSave={handleSaveSite}
          onClose={() => {
            setShowFormModal(false);
            setEditingSite(null);
          }}
        />
      )}

    </div>
  );
}
