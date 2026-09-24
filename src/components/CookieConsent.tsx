import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "./ui/button";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "false");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-5 md:max-w-[320px] z-[100]"
        >
          <div className="bg-[#151715]/95 border border-[#FFCA16]/25 rounded-2xl p-4 shadow-2xl shadow-black/50 backdrop-blur-md">
            <div className="flex items-start gap-3">
              <div className="bg-[#FFCA16]/10 p-2 rounded-lg shrink-0">
                <Cookie className="w-4 h-4 text-[#FFCA16]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-display font-bold text-sm text-white">
                    Privacidade de Cookies
                  </h3>
                  <button 
                    onClick={() => setIsVisible(false)}
                    className="text-white/45 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[11px] text-white/55 leading-relaxed mb-4">
                  Nós usamos cookies para melhorar sua experiência no site do Studio Kiiro. Ao continuar navegando, você concorda com a nossa política de privacidade.
                </p>
                <div className="flex gap-2">
                  <Button 
                    onClick={acceptCookies}
                    className="bg-[#FFCA16] hover:bg-[#ffd84c] text-black font-semibold text-xs rounded-full px-4 py-1.5 h-auto"
                  >
                    Aceitar Todos
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={declineCookies}
                    className="border-[#FFCA16]/30 text-[#FFCA16] hover:bg-[#FFCA16]/10 text-xs rounded-full px-4 py-1.5 h-auto"
                  >
                    Recusar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
