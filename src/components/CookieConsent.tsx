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
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[100]"
        >
          <div className="bg-surface border border-kiiro/20 rounded-2xl p-6 shadow-2xl shadow-black/50 backdrop-blur-md">
            <div className="flex items-start gap-4">
              <div className="bg-kiiro/10 p-3 rounded-xl shrink-0">
                <Cookie className="w-6 h-6 text-kiiro" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-bold text-lg text-white">
                    Privacidade de Cookies
                  </h3>
                  <button 
                    onClick={() => setIsVisible(false)}
                    className="text-muted-foreground hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Nós usamos cookies para melhorar sua experiência no site do Studio Kiiro. Ao continuar navegando, você concorda com a nossa política de privacidade.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={acceptCookies}
                    className="bg-kiiro hover:bg-kiiro-dark text-white font-semibold rounded-full px-8 py-2 h-auto"
                  >
                    Aceitar Todos
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={declineCookies}
                    className="border-kiiro/30 text-kiiro hover:bg-kiiro/10 rounded-full px-8 py-2 h-auto"
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
