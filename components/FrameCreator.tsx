
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Upload, Download, RotateCw, ZoomIn, ZoomOut, Trash2, LayoutGrid, Search, ChevronLeft, ChevronRight, Share2, Loader2, Sparkles } from 'lucide-react';
import { CANDIDATE, FRAME_OPTIONS, ALIM_IMAGES, LOGOS } from '../constants';

const ITEMS_PER_PAGE = 8;

export const FrameCreator: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [selectedFrame, setSelectedFrame] = useState(FRAME_OPTIONS[0]);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredFrames = useMemo(() => {
    return FRAME_OPTIONS.filter(f => 
      f.slogan.toLowerCase().includes(searchTerm.toLowerCase()) || 
      f.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredFrames.length / ITEMS_PER_PAGE);
  const currentFrames = filteredFrames.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setZoom(1);
        setRotation(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 1080;
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);

    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        ctx.save();
        ctx.translate(size / 2, size / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        
        const aspectRatio = img.width / img.height;
        let drawWidth, drawHeight;
        
        if (aspectRatio > 1) {
          drawWidth = size * zoom * aspectRatio;
          drawHeight = size * zoom;
        } else {
          drawWidth = size * zoom;
          drawHeight = (size * zoom) / aspectRatio;
        }

        ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
        ctx.restore();

        renderComplexStyle(ctx, size, selectedFrame);
        drawWatermark(ctx, size);
      };
    } else {
      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 45px Hind Siliguri';
      ctx.textAlign = 'center';
      ctx.fillText('নির্বাচনি ফ্রেম তৈরি করতে ছবি যোগ করুন', size / 2, size / 2);
      renderComplexStyle(ctx, size, selectedFrame);
      drawWatermark(ctx, size);
    }
  };

  const drawWatermark = (ctx: CanvasRenderingContext2D, size: number) => {
    ctx.save();
    // Smaller watermark as requested: Power by: Eng'r Walid
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'right';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 4;
    ctx.fillText("Power by: Eng'r Walid", size - 25, size - 25);
    ctx.restore();
  };

  const renderComplexStyle = (ctx: CanvasRenderingContext2D, size: number, frame: any) => {
    const { type, slogan, color, accent } = frame;
    ctx.save();
    
    switch (type) {
      case 'classic':
        drawBanner(ctx, size, size * 0.25, color, accent, slogan, true);
        break;
      case 'banner_top':
        drawBanner(ctx, size, size * 0.2, color, accent, slogan, false, true);
        break;
      case 'banner_bottom':
        drawBanner(ctx, size, size * 0.2, color, accent, slogan, false, false);
        break;
      case 'circular':
        ctx.strokeStyle = color;
        ctx.lineWidth = 40;
        ctx.strokeRect(20, 20, size - 40, size - 40);
        drawTextOnPath(ctx, slogan, size / 2, size - 80, color, 'white');
        break;
      case 'ribbon':
        drawRibbon(ctx, size, slogan, color);
        break;
      case 'modern':
        drawModernOverlay(ctx, size, color, accent, slogan);
        break;
      case 'bold':
        drawBoldBanner(ctx, size, color, accent, slogan);
        break;
      case 'elegant':
        drawElegantBorder(ctx, size, color, accent, slogan);
        break;
      default:
        drawBanner(ctx, size, size * 0.25, color, accent, slogan, true);
    }

    drawScaleLogo(ctx, 150, 150, 100);
    drawAlimBadge(ctx, size, ALIM_IMAGES.portrait_bg);
    ctx.restore();
  };

  const drawBanner = (ctx: CanvasRenderingContext2D, size: number, h: number, color: string, accent: string, text: string, withPrimaryName: boolean = true, isTop: boolean = false) => {
    const y = isTop ? 0 : size - h;
    const grad = ctx.createLinearGradient(0, y, 0, y + h);
    grad.addColorStop(isTop ? 1 : 0, 'rgba(0,0,0,0.4)');
    grad.addColorStop(isTop ? 0 : 1, color);
    
    ctx.fillStyle = grad;
    ctx.fillRect(0, y, size, h);
    
    ctx.fillStyle = accent;
    ctx.fillRect(0, isTop ? y + h - 10 : y, size, 10);

    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    
    if (withPrimaryName) {
      ctx.font = 'bold 70px Hind Siliguri';
      ctx.fillText(CANDIDATE.name, size / 2, y + h * 0.45);
      ctx.font = '38px Hind Siliguri';
      ctx.fillText(text, size / 2, y + h * 0.75);
    } else {
      ctx.font = 'bold 50px Hind Siliguri';
      ctx.fillText(text, size / 2, y + h * 0.6);
    }
  };

  const drawRibbon = (ctx: CanvasRenderingContext2D, size: number, text: string, color: string) => {
    ctx.save();
    ctx.translate(size * 0.75, size * 0.1);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = color;
    ctx.fillRect(-size, -60, size * 2, 120);
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.font = 'bold 35px Hind Siliguri';
    ctx.fillText(text, 0, 15);
    ctx.restore();
    
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, size - 120, size, 120);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 60px Hind Siliguri';
    ctx.textAlign = 'center';
    ctx.fillText(CANDIDATE.name, size / 2, size - 45);
  };

  const drawModernOverlay = (ctx: CanvasRenderingContext2D, size: number, color: string, accent: string, text: string) => {
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath();
    ctx.moveTo(0, size - 220);
    ctx.lineTo(size, size - 280);
    ctx.lineTo(size, size);
    ctx.lineTo(0, size);
    ctx.fill();

    ctx.fillStyle = color;
    ctx.font = 'bold 65px Hind Siliguri';
    ctx.textAlign = 'left';
    ctx.fillText(CANDIDATE.name, 60, size - 110);
    
    ctx.fillStyle = accent;
    ctx.font = 'bold 30px Hind Siliguri';
    ctx.fillText(text, 65, size - 50);
  };

  const drawBoldBanner = (ctx: CanvasRenderingContext2D, size: number, color: string, accent: string, text: string) => {
    ctx.fillStyle = color;
    ctx.fillRect(0, size - 300, 600, 180);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 70px Hind Siliguri';
    ctx.fillText(CANDIDATE.name, 40, size - 185);
    
    ctx.fillStyle = accent;
    ctx.fillRect(0, size - 120, size, 120);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 45px Hind Siliguri';
    ctx.textAlign = 'center';
    ctx.fillText(text, size / 2, size - 45);
  };

  const drawElegantBorder = (ctx: CanvasRenderingContext2D, size: number, color: string, accent: string, text: string) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 20;
    ctx.strokeRect(30, 30, size - 60, size - 60);
    
    ctx.fillStyle = 'white';
    ctx.fillRect(size / 2 - 400, size - 100, 800, 100);
    ctx.strokeStyle = accent;
    ctx.lineWidth = 4;
    ctx.strokeRect(size / 2 - 400, size - 100, 800, 100);
    
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.font = 'bold 50px Hind Siliguri';
    ctx.fillText(CANDIDATE.name, size / 2, size - 35);
  };

  const drawTextOnPath = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, bgColor: string, textColor: string) => {
    const pad = 40;
    ctx.font = 'bold 45px Hind Siliguri';
    const width = ctx.measureText(text).width + pad * 2;
    
    ctx.fillStyle = bgColor;
    ctx.fillRect(x - width / 2, y - 50, width, 100);
    
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y + 15);
  };

  const drawScaleLogo = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
    const logoImg = new Image();
    logoImg.crossOrigin = "anonymous";
    logoImg.src = LOGOS.SCALE;
    logoImg.onload = () => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.clip();
      ctx.drawImage(logoImg, x - radius, y - radius, radius * 2, radius * 2);
      ctx.restore();
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.strokeStyle = '#006a4e';
      ctx.lineWidth = 5;
      ctx.stroke();
    };
  };

  const drawAlimBadge = (ctx: CanvasRenderingContext2D, size: number, src: string) => {
    const badgeSize = 220;
    const padding = 60;
    const x = size - badgeSize - padding;
    const y = size - badgeSize - padding;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x + badgeSize / 2, y + badgeSize / 2, badgeSize / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(img, x, y, badgeSize, badgeSize);
      ctx.restore();

      ctx.beginPath();
      ctx.arc(x + badgeSize / 2, y + badgeSize / 2, badgeSize / 2, 0, Math.PI * 2);
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 10;
      ctx.stroke();
      
      ctx.fillStyle = '#f42a41';
      ctx.font = 'bold 30px Hind Siliguri';
      ctx.textAlign = 'center';
      ctx.fillText('অধ্যক্ষ আলীম', x + badgeSize / 2, y + badgeSize + 45);
    };
  };

  useEffect(() => {
    drawCanvas();
  }, [image, selectedFrame, zoom, rotation]);

  const handleShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsSharing(true);
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], 'alim_avatar.png', { type: 'image/png' });
        
        if (navigator.share) {
          await navigator.share({
            title: `${CANDIDATE.name} নির্বাচনী এভাটার`,
            text: `আমি ${CANDIDATE.name}-এর সমর্থনে এই এভাটারটি তৈরি করেছি। দাড়িপাল্লা মার্কায় ভোট দিন!`,
            files: [file],
          });
        } else {
          alert('দুঃখিত, আপনার ব্রাউজার সরাসরি শেয়ারিং সাপোর্ট করে না। ডাউনলোড করে শেয়ার করুন।');
        }
        setIsSharing(false);
      }, 'image/png');
    } catch (err) {
      console.error('Error sharing:', err);
      setIsSharing(false);
    }
  };

  return (
    <div className="bg-white rounded-[60px] shadow-3xl overflow-hidden border border-gray-100 p-6 md:p-12">
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-1/2 space-y-8">
          <div className="relative aspect-square rounded-[48px] overflow-hidden bg-gray-50 border-[12px] border-white shadow-3xl ring-1 ring-black/5 group">
            <canvas ref={canvasRef} className="w-full h-full object-contain cursor-grab active:cursor-grabbing" />
            {!image && (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-black/5 transition-all"
              >
                <div className="w-24 h-24 bg-green-600 rounded-[32px] flex items-center justify-center text-white shadow-2xl mb-6 group-hover:scale-110 transition-transform">
                  <Upload size={40} />
                </div>
                <p className="font-black text-gray-800 text-2xl">আপনার ছবি যোগ করুন</p>
                <p className="text-gray-400 font-bold mt-2 italic">PNG বা JPG ফরম্যাটে আপলোড করুন</p>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4">
             <ControlBtn icon={<ZoomIn size={24}/>} onClick={() => setZoom(z => Math.min(z + 0.1, 4))} />
             <ControlBtn icon={<ZoomOut size={24}/>} onClick={() => setZoom(z => Math.max(z - 0.1, 0.5))} />
             <ControlBtn icon={<RotateCw size={24}/>} onClick={() => setRotation(r => r + 90)} />
             <ControlBtn icon={<Trash2 size={24}/>} onClick={() => setImage(null)} color="text-red-500 bg-red-50" />
          </div>
        </div>

        <div className="lg:w-1/2 flex flex-col h-full">
          <div className="flex-grow space-y-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-green-100 text-green-700 rounded-[24px]">
                  <LayoutGrid size={28} />
                </div>
                <h3 className="text-3xl font-black text-gray-800 tracking-tight">স্টাইল পছন্দ করুন</h3>
              </div>
              <div className="text-xs font-black text-white uppercase tracking-widest bg-red-600 px-4 py-2 rounded-full shadow-lg">
                {FRAME_OPTIONS.length} টি স্টাইল
              </div>
            </div>

            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" size={24} />
              <input 
                type="text" 
                placeholder="স্লোগান বা স্টাইল দিয়ে খুঁজুন..." 
                className="w-full pl-16 pr-8 py-6 bg-gray-50 border-2 border-transparent rounded-[32px] focus:border-green-500 focus:bg-white outline-none transition-all font-bold text-lg"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(0);
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-5 min-h-[380px]">
              {currentFrames.map(frame => (
                <button
                  key={frame.id}
                  onClick={() => setSelectedFrame(frame)}
                  className={`relative p-6 rounded-[36px] border-[3px] transition-all text-left overflow-hidden ${
                    selectedFrame.id === frame.id 
                      ? 'border-green-600 bg-green-50 shadow-2xl scale-105' 
                      : 'border-gray-100 hover:border-green-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-4 h-4 rounded-full ${selectedFrame.id === frame.id ? 'bg-green-600 animate-pulse' : 'bg-gray-200'}`} />
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{frame.type}</span>
                  </div>
                  <div className="font-black text-gray-800 text-lg leading-tight mb-3">{frame.slogan}</div>
                  <div className="flex gap-2">
                    <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: frame.color }} />
                    <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: frame.accent }} />
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center gap-6 py-4">
               <button 
                disabled={currentPage === 0}
                onClick={() => setCurrentPage(p => p - 1)}
                className="p-4 rounded-2xl bg-gray-50 text-gray-600 hover:bg-green-100 hover:text-green-700 disabled:opacity-30 transition-all shadow-md"
               >
                 <ChevronLeft size={28} />
               </button>
               <span className="font-black text-gray-500 text-xl">পৃষ্ঠা {currentPage + 1} / {totalPages || 1}</span>
               <button 
                disabled={currentPage >= totalPages - 1}
                onClick={() => setCurrentPage(p => p + 1)}
                className="p-4 rounded-2xl bg-gray-50 text-gray-600 hover:bg-green-100 hover:text-green-700 disabled:opacity-30 transition-all shadow-md"
               >
                 <ChevronRight size={28} />
               </button>
            </div>
          </div>

          <div className="mt-12 pt-10 border-t border-gray-100 space-y-6">
             <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
             {!image ? (
               <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-8 bg-green-600 text-white rounded-[40px] font-black text-2xl hover:bg-green-700 transition-all shadow-4xl flex items-center justify-center gap-4"
              >
                <Sparkles size={32} /> পোস্টার তৈরি শুরু করুন
               </button>
             ) : (
               <div className="grid grid-cols-2 gap-6">
                 <button 
                  onClick={() => {
                    const canvas = canvasRef.current;
                    if (!canvas) return;
                    const link = document.createElement('a');
                    link.download = `alim_avatar_${selectedFrame.id}.png`;
                    link.href = canvas.toDataURL('image/png', 1.0);
                    link.click();
                  }}
                  className="flex items-center justify-center gap-4 py-8 bg-green-700 text-white rounded-[40px] font-black text-xl hover:bg-green-800 transition-all shadow-3xl"
                 >
                  <Download size={28} /> ডাউনলোড
                 </button>
                 <button 
                  onClick={handleShare}
                  disabled={isSharing}
                  className="flex items-center justify-center gap-4 py-8 bg-blue-600 text-white rounded-[40px] font-black text-xl hover:bg-blue-700 transition-all shadow-3xl disabled:opacity-50"
                 >
                  {isSharing ? <Loader2 className="animate-spin" /> : <Share2 size={28} />} শেয়ার
                 </button>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ControlBtn: React.FC<{ icon: React.ReactNode, onClick: () => void, color?: string }> = ({ icon, onClick, color = "bg-white text-gray-600" }) => (
  <button onClick={onClick} className={`p-5 rounded-3xl shadow-xl hover:scale-110 active:scale-90 transition-all border border-gray-100 ${color}`}>
    {icon}
  </button>
);
