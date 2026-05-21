import { useState, useEffect, useRef } from "react";
import { X, Save, Sparkles, Image as ImageIcon, Link as LinkIcon, Upload } from "lucide-react";
import { WebsiteTemplate } from "../data/defaultSites";

interface SiteFormProps {
  site?: WebsiteTemplate | null;
  onSave: (site: WebsiteTemplate) => void;
  onClose: () => void;
}

const CATEGORIES = [
  "Restaurantes & Cafés",
  "Saúde & Bem-estar",
  "Imobiliária",
  "E-commerce",
  "Serviços Profissionais",
  "Desporto & Fitness",
  "Tecnologia & SaaS",
  "Portfólio / Pessoal",
  "Institucional",
  "Outro"
];

export default function SiteForm({ site, onSave, onClose }: SiteFormProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  
  // Image type: "url" or "file"
  const [imageType, setImageType] = useState<"url" | "file">("url");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFileBase64, setImageFileBase64] = useState("");
  const [fileName, setFileName] = useState("");
  
  const [techStackStr, setTechStackStr] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (site) {
      setTitle(site.title);
      setCategory(site.category);
      setDescription(site.description);
      setUrl(site.url);
      
      // Determine if stored image is a base64 string or an external URL
      if (site.imageUrl.startsWith("data:image/")) {
        setImageType("file");
        setImageFileBase64(site.imageUrl);
        setImageUrl("");
        setFileName("Imagem Carregada");
      } else {
        setImageType("url");
        setImageUrl(site.imageUrl);
        setImageFileBase64("");
        setFileName("");
      }
      
      setTechStackStr(site.techStack.join(", "));
    } else {
      setTitle("");
      setCategory(CATEGORIES[0]);
      setDescription("");
      setUrl("https://");
      setImageType("url");
      setImageUrl("");
      setImageFileBase64("");
      setFileName("");
      setTechStackStr("React, Tailwind CSS");
    }
  }, [site]);

  // Handle local image upload and convert to base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("A imagem selecionada é demasiado grande. Por favor escolha um ficheiro com menos de 2MB.");
        return;
      }
      
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImageFileBase64(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Parse tech stack tags
    const techStack = techStackStr
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    // Determine target image URL
    let finalImageUrl = "";
    if (imageType === "file" && imageFileBase64) {
      finalImageUrl = imageFileBase64;
    } else if (imageType === "url" && imageUrl.trim()) {
      finalImageUrl = imageUrl;
    }

    // Fallback Image if none provided
    if (!finalImageUrl) {
      const categoryKeywords: Record<string, string> = {
        "Restaurantes & Cafés": "restaurant",
        "Saúde & Bem-estar": "medical",
        "Imobiliária": "realestate",
        "E-commerce": "ecommerce",
        "Serviços Profissionais": "office",
        "Desporto & Fitness": "gym",
        "Tecnologia & SaaS": "dashboard",
        "Portfólio / Pessoal": "portfolio",
        "Institucional": "business",
        "Outro": "web"
      };
      const keyword = categoryKeywords[category] || "website";
      finalImageUrl = `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80&sig=${Math.floor(Math.random() * 105)}&q=${encodeURIComponent(keyword)}`;
    }

    const savedSite: WebsiteTemplate = {
      id: site?.id || Date.now().toString(),
      title,
      category,
      description,
      url: url.startsWith("http") ? url : `https://${url}`,
      imageUrl: finalImageUrl,
      techStack,
      isCustom: true
    };

    onSave(savedSite);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl flex flex-col shadow-2xl overflow-hidden max-h-[90vh]">
        
        {/* Form Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-850 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">
              {site ? "Editar Modelo de Website" : "Adicionar Novo Modelo"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 p-1.5 text-slate-400 hover:bg-slate-700 hover:text-white transition-all border border-slate-700 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-350">
          
          {/* Title and Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-400 block">Título do Website *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: BarberStyle - Barbearia"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-400 block">Categoria *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer text-slate-200"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* URL */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-400 block">URL do Website *</label>
            <input
              type="text"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Ex: https://meusite.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Image Upload Mode Selector */}
          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-slate-400 block">Imagem do Website (Capa) *</label>
            
            <div className="flex gap-2 p-1 bg-slate-950 rounded-lg border border-slate-850">
              <button
                type="button"
                onClick={() => setImageType("url")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                  imageType === "url"
                    ? "bg-slate-800 text-white border border-slate-700"
                    : "text-slate-400 hover:text-slate-250"
                }`}
              >
                <LinkIcon className="h-3.5 w-3.5" />
                <span>Endereço de Imagem (URL)</span>
              </button>
              <button
                type="button"
                onClick={() => setImageType("file")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                  imageType === "file"
                    ? "bg-slate-800 text-white border border-slate-700"
                    : "text-slate-400 hover:text-slate-250"
                }`}
              >
                <ImageIcon className="h-3.5 w-3.5" />
                <span>Carregar do PC (Upload)</span>
              </button>
            </div>

            {/* Sub-inputs depending on mode */}
            {imageType === "url" ? (
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Ex: https://images.unsplash.com/..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            ) : (
              <div className="space-y-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                
                <div 
                  onClick={triggerFileSelect}
                  className="border-2 border-dashed border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-950/60 rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 select-none"
                >
                  <Upload className="h-6 w-6 text-indigo-400" />
                  <span className="text-[11px] font-bold text-slate-300">
                    {fileName ? fileName : "Clique para selecionar uma imagem do PC"}
                  </span>
                  <span className="text-[9px] text-slate-500">Dimensão recomendada: 800x450px (Max 2MB)</span>
                </div>

                {imageFileBase64 && (
                  <div className="relative w-36 aspect-video rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
                    <img src={imageFileBase64} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFileBase64("");
                        setFileName("");
                      }}
                      className="absolute top-1 right-1 bg-red-500 hover:bg-red-650 text-white rounded-full p-1 cursor-pointer transition-colors"
                      title="Remover Imagem"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-400 block">Breve Descrição *</label>
            <textarea
              required
              rows={3}
              maxLength={200}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o propósito deste website..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
            />
          </div>

          {/* Tech Stack Comma Separated */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-400 block">
              Tecnologias Utilizadas (Separadas por vírgula)
            </label>
            <input
              type="text"
              value={techStackStr}
              onChange={(e) => setTechStackStr(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-slate-850 px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-all border border-slate-800 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 text-xs font-semibold text-white transition-all cursor-pointer shadow-lg shadow-indigo-950/40"
            >
              <Save className="h-4 w-4" />
              <span>Guardar Modelo</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
