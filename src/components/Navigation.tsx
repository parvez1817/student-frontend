import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, LogOut, Phone } from 'lucide-react';

interface NavigationProps {
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">ID</span>
            </div>
            <div>
              <h1 className="text-white font-semibold text-lg">Sona College of Technology</h1>
              <p className="text-white/70 text-xs">ID Card Portal</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={onLogout}
              variant="ghost"
              className="text-white hover:bg-white/20 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
            <a
              href="tel:8248518232"
              className="ml-2"
            >
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20 transition-colors duration-200"
              >
                <Phone className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </a>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right"
                className="bg-white/10 backdrop-blur-lg border-l border-white/20 text-white">
                <div className="flex flex-col space-y-4 mt-8">
                  <Button
                    onClick={() => {
                      onLogout();
                      setIsOpen(false);
                    }}
                    variant="ghost"
                    className="text-white hover:bg-white/20 justify-start"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                  <a
                    href="tel:8248518232"
                  >
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-white/20 transition-colors duration-200"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Footer Component
const Footer = () => (
  <footer className="w-full bg-white/10 backdrop-blur-lg border-t border-white/20 text-center py-3 fixed bottom-0 left-0 z-40">
    <span className="text-white/70 text-sm">© 2024 Sona College of Technology. All rights reserved.</span>
  </footer>
);

export { Footer };

export default Navigation;