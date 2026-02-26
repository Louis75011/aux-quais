import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  MapPin, 
  Phone, 
  Clock, 
  Instagram, 
  Facebook,
  ChevronDown,
  ArrowRight,
  UtensilsCrossed,
  Coffee,
  CakeSlice,
  Star,
  ShieldCheck,
  Cookie
} from 'lucide-react';
import { MENU_ITEMS, BUSINESS_INFO, LOCATIONS } from './constants';
import { MenuItem, CartItem, OrderMethod } from './types';

type Page = 'home' | 'privacy' | 'cookies';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('tout');
  const [orderMethod, setOrderMethod] = useState<OrderMethod>('takeaway');
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const cartTotal = useMemo(() => 
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  [cart]);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'tout') return MENU_ITEMS;
    return MENU_ITEMS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  const renderPrivacy = () => (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
      <button onClick={() => setCurrentPage('home')} className="mb-8 text-brand-green flex items-center gap-2 hover:underline">
        <ArrowRight className="w-4 h-4 rotate-180" /> Retour à l'accueil
      </button>
      <h1 className="text-4xl font-serif mb-8">Politique de Confidentialité</h1>
      <div className="prose prose-brand max-w-none space-y-6 text-gray-600">
        <p>Dernière mise à jour : 26 février 2026</p>
        <section>
          <h2 className="text-2xl font-serif text-brand-dark mb-4">1. Collecte des données</h2>
          <p>Nous collectons uniquement les données nécessaires au traitement de votre commande : nom, téléphone et adresse de livraison le cas échéant.</p>
        </section>
        <section>
          <h2 className="text-2xl font-serif text-brand-dark mb-4">2. Utilisation des données</h2>
          <p>Vos données sont utilisées exclusivement pour la gestion de vos commandes et ne sont jamais revendues à des tiers.</p>
        </section>
        <section>
          <h2 className="text-2xl font-serif text-brand-dark mb-4">3. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles en nous contactant à contact@auxquais.fr.</p>
        </section>
      </div>
    </div>
  );

  const renderCookies = () => (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
      <button onClick={() => setCurrentPage('home')} className="mb-8 text-brand-green flex items-center gap-2 hover:underline">
        <ArrowRight className="w-4 h-4 rotate-180" /> Retour à l'accueil
      </button>
      <h1 className="text-4xl font-serif mb-8">Gestion des Cookies</h1>
      <div className="prose prose-brand max-w-none space-y-6 text-gray-600">
        <p>Dernière mise à jour : 26 février 2026</p>
        <section>
          <h2 className="text-2xl font-serif text-brand-dark mb-4">Qu'est-ce qu'un cookie ?</h2>
          <p>Un cookie est un petit fichier texte déposé sur votre terminal lors de la visite d'un site.</p>
        </section>
        <section>
          <h2 className="text-2xl font-serif text-brand-dark mb-4">Cookies utilisés</h2>
          <p>Nous utilisons uniquement des cookies techniques essentiels au fonctionnement du panier et de votre session de navigation. Aucun cookie de pistage publicitaire n'est utilisé.</p>
        </section>
      </div>
    </div>
  );

  if (currentPage === 'privacy') return <div className="min-h-screen bg-brand-cream">{renderPrivacy()}</div>;
  if (currentPage === 'cookies') return <div className="min-h-screen bg-brand-cream">{renderCookies()}</div>;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3 text-brand-dark' : 'bg-transparent py-6 text-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-white font-serif text-xl font-bold">
              AQ
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-serif font-bold leading-none">Aux Quais</h1>
              <p className="text-[10px] uppercase tracking-widest opacity-60">Salon de Thé</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-wider">
            <a href="#menu" className="hover:text-brand-accent transition-colors">La Carte</a>
            <a href="#about" className="hover:text-brand-accent transition-colors">Notre Histoire</a>
            <a href="#faq" className="hover:text-brand-accent transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-brand-accent transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-green text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
            <button className={`btn-primary hidden sm:block ${!isScrolled ? 'bg-white text-brand-green hover:bg-brand-accent hover:text-white' : ''}`}>
              Commander
            </button>
            <button className="md:hidden p-2">
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/auxquais-interior/1920/1080?blur=2" 
            alt="Aux Quais Interior" 
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-brand-accent font-serif italic text-2xl mb-4">Bienvenue chez</h2>
            <h1 className="text-6xl md:text-8xl font-serif font-bold mb-6 tracking-tight">Aux Quais</h1>
            <p className="text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto leading-relaxed">
              Votre escale gourmande, bio et locale en gare. Pâtisseries artisanales et cuisine de saison.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className={`px-6 py-3 rounded-full border-2 transition-all flex items-center gap-2 ${
                    selectedLocation.id === loc.id 
                      ? 'bg-brand-green border-brand-green text-white shadow-lg scale-105' 
                      : 'bg-white/10 border-white/30 text-white hover:bg-white/20'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  {loc.name}
                  {loc.id === 'noisy' && <span className="text-[10px] bg-brand-accent px-1.5 py-0.5 rounded ml-1">Bientôt</span>}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a href="#menu" className="btn-primary bg-brand-green hover:bg-brand-accent text-white px-10 py-4 text-lg">
                Voir la carte
              </a>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Plat du Jour Highlight */}
      <section className="py-24 bg-brand-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-brand-green font-serif italic text-xl mb-2 block">Aujourd'hui</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-6">Le Plat du Marché</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Chaque jour, notre chef prépare un plat unique avec les arrivages frais du matin. 
                Une cuisine authentique, saine et savoureuse pour votre pause déjeuner.
              </p>
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-brand-green/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/5 rounded-bl-full transition-transform group-hover:scale-110" />
                <h3 className="text-2xl font-serif font-bold text-brand-dark mb-2">{MENU_ITEMS[0].name}</h3>
                <p className="text-gray-500 mb-6 italic">{MENU_ITEMS[0].description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-serif font-bold text-brand-green">{MENU_ITEMS[0].price.toFixed(2)}€</span>
                  <button 
                    onClick={() => addToCart(MENU_ITEMS[0])}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Ajouter au panier
                  </button>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={MENU_ITEMS[0].image} 
                  alt="Plat du jour" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-brand-accent text-white p-6 rounded-2xl shadow-xl rotate-3">
                <p className="font-serif text-xl font-bold">100% Fait Maison</p>
                <p className="text-sm opacity-90">Produits locaux & bio</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">Notre Carte Gourmande</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Découvrez nos créations artisanales, préparées chaque matin dans notre atelier.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['tout', 'salé', 'sucré', 'boissons'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-full text-sm font-medium uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                    ? 'bg-brand-dark text-white shadow-lg' 
                    : 'bg-brand-cream text-brand-dark hover:bg-brand-green/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 flex flex-col h-full group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-brand-green shadow-sm">
                      {item.price.toFixed(2)}€
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-serif font-bold text-brand-dark">{item.name}</h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-6 line-clamp-2">{item.description}</p>
                    <button 
                      onClick={() => addToCart(item)}
                      className="btn-primary w-full flex items-center justify-center gap-2 mt-auto group-hover:bg-brand-accent"
                    >
                      <Plus className="w-4 h-4" /> Ajouter au panier
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-green/10 -skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="relative">
                <img 
                  src="https://picsum.photos/seed/bakery/800/1000" 
                  alt="Our Bakery" 
                  className="rounded-3xl shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-8 -left-8 bg-brand-green p-8 rounded-2xl shadow-xl hidden lg:block">
                  <p className="text-4xl font-serif font-bold mb-1">100%</p>
                  <p className="text-sm uppercase tracking-widest opacity-80">Fait Maison</p>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="text-brand-accent font-serif italic text-xl mb-2 block">Notre Histoire</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Une escale gourmande en gare</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Aux Quais est né de l'envie de transformer l'attente en gare en un moment de plaisir et de détente. 
                  Installé au cœur de la gare de L'Étang-la-Ville, nous proposons une cuisine authentique, 
                  préparée chaque jour avec passion.
                </p>
                <p>
                  Nous privilégions les circuits courts et les produits issus de l'agriculture biologique locale. 
                  Que ce soit pour un café rapide, un déjeuner sur le pouce ou une pâtisserie réconfortante, 
                  nous vous accueillons avec le sourire.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div>
                    <h4 className="text-brand-accent font-serif text-2xl font-bold mb-1">Bio</h4>
                    <p className="text-sm text-gray-400">Ingrédients certifiés</p>
                  </div>
                  <div>
                    <h4 className="text-brand-accent font-serif text-2xl font-bold mb-1">Local</h4>
                    <p className="text-sm text-gray-400">Producteurs d'Île-de-France</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Ce qu'ils en disent</h2>
              <p className="text-gray-500">
                Parce que votre satisfaction est notre plus belle récompense. 
                Retrouvez les avis de nos clients fidèles.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-brand-cream px-6 py-3 rounded-2xl border border-gray-100">
              <div className="flex text-brand-accent">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <span className="font-bold text-lg">4.9/5</span>
              <span className="text-gray-400 text-sm">(120+ avis)</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Assa T. C.",
                text: "Excellente adresse si vous prenez le train, rentrez du travail ou souhaitez faire une pause. Plats faits maison, du sucré, du salé, des thés et cafés de toutes sortes. Tout y est bon !",
                source: "Google"
              },
              {
                name: "Maicon M.",
                text: "Je vous recommande chaleureusement AUX QUAIS. Conçu comme un nouveau concept de salon de thé au sein de la gare, cet endroit promet d'offrir une expérience chaleureuse aux voyageurs.",
                source: "Google"
              },
              {
                name: "Boris H.",
                text: "Fantastique pause pour les cyclistes et traileurs de l'Ouest Parisien. C'est très calme, c'est beau et c'est très très très bon. Le carrot cake est, pour moi, le meilleur de la région.",
                source: "Google"
              }
            ].map((review, i) => (
              <div key={i} className="bg-brand-cream p-10 rounded-[32px] border border-gray-100 relative">
                <div className="text-brand-accent mb-6 flex">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-gray-700 italic mb-8 leading-relaxed">"{review.text}"</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold font-serif text-lg">{review.name}</span>
                  <span className="text-xs uppercase tracking-widest text-gray-400">{review.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-brand-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Questions Fréquentes</h2>
            <p className="text-gray-500">Tout ce que vous devez savoir sur Aux Quais.</p>
          </div>

          <div className="space-y-4">
            {[
              { q: "Où se situe Aux Quais ?", a: "Nous sommes installés directement dans le bâtiment de la gare de L'Étang-la-Ville (Ligne L)." },
              { q: "Peut-on manger sur place ?", a: "Oui ! Nous disposons d'une salle chaleureuse et d'une terrasse pour profiter de votre pause." },
              { q: "Proposez-vous des options végétariennes ?", a: "Absolument. La majorité de nos salades et sandwiches sont déclinables ou pensés pour être végétariens." },
              { q: "Faites-vous de la livraison ?", a: "Oui, nous livrons aux alentours de L'Étang-la-Ville et Noisy-le-Roi." }
            ].map((item, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <summary className="flex justify-between items-center p-6 cursor-pointer list-none font-medium hover:text-brand-green transition-colors">
                  {item.q}
                  <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-brand-cream pt-20 pb-10 border-t border-brand-green/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-white font-serif text-xl font-bold">
                  AQ
                </div>
                <h2 className="text-2xl font-serif font-bold text-brand-dark">Aux Quais</h2>
              </div>
              <p className="text-gray-500 mb-6 italic">
                "Votre escale gourmande, bio et locale en gare."
              </p>
              <div className="flex gap-4">
                <a href={BUSINESS_INFO.socials.instagram} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-green shadow-sm hover:bg-brand-green hover:text-white transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href={BUSINESS_INFO.socials.facebook} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-green shadow-sm hover:bg-brand-green hover:text-white transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-serif font-bold text-brand-dark mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-brand-green shrink-0 mt-1" />
                  <span>{selectedLocation.address}</span>
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-5 h-5 text-brand-green shrink-0" />
                  <span>{selectedLocation.phone}</span>
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <Clock className="w-5 h-5 text-brand-green shrink-0" />
                  <span>{BUSINESS_INFO.hours.tuesday} - {BUSINESS_INFO.hours.saturday}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-serif font-bold text-brand-dark mb-6">Navigation</h4>
              <ul className="space-y-3">
                <li><a href="#menu" className="text-gray-600 hover:text-brand-green transition-colors">La Carte</a></li>
                <li><a href="#about" className="text-gray-600 hover:text-brand-green transition-colors">Notre Histoire</a></li>
                <li><a href="#faq" className="text-gray-600 hover:text-brand-green transition-colors">FAQ</a></li>
                <li><button onClick={() => setCurrentPage('privacy')} className="text-gray-600 hover:text-brand-green transition-colors">Confidentialité</button></li>
                <li><button onClick={() => setCurrentPage('cookies')} className="text-gray-600 hover:text-brand-green transition-colors">Cookies</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-serif font-bold text-brand-dark mb-6">Newsletter</h4>
              <p className="text-sm text-gray-500 mb-4">Inscrivez-vous pour recevoir nos menus de la semaine.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-brand-green flex-grow"
                />
                <button className="w-10 h-10 bg-brand-green text-white rounded-full flex items-center justify-center hover:bg-brand-accent transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-brand-green/10 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} {BUSINESS_INFO.name}. Tous droits réservés.</p>
            <div className="mt-4 flex justify-center gap-6">
              <button onClick={() => setCurrentPage('privacy')} className="hover:text-brand-green flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Confidentialité
              </button>
              <button onClick={() => setCurrentPage('cookies')} className="hover:text-brand-green flex items-center gap-1">
                <Cookie className="w-3 h-3" /> Cookies
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-brand-cream z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white">
                <div>
                  <h2 className="text-2xl font-serif">Mon Panier</h2>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">
                    {cart.length} article{cart.length > 1 ? 's' : ''}
                  </p>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                    <ShoppingBag className="w-16 h-16 mb-4" />
                    <p className="text-lg font-serif">Votre panier est vide</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 text-brand-green underline font-medium"
                    >
                      Découvrir la carte
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-gray-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <span className="font-serif">{(item.price * item.quantity).toFixed(2)} €</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-3">{item.price.toFixed(2)} € / unité</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-full px-3 py-1">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-brand-green">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-brand-green">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-8 bg-white border-t border-gray-100 space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Méthode de réception</span>
                      <div className="flex gap-2">
                        {(['takeaway', 'delivery', 'dine-in'] as OrderMethod[]).map(m => (
                          <button
                            key={m}
                            onClick={() => setOrderMethod(m)}
                            className={`px-3 py-1 rounded-full border text-[10px] uppercase font-bold transition-all ${
                              orderMethod === m 
                                ? 'bg-brand-green border-brand-green text-white' 
                                : 'border-gray-100 text-gray-400 hover:border-gray-200'
                            }`}
                          >
                            {m === 'takeaway' ? 'À emporter' : m === 'delivery' ? 'Livraison' : 'Sur place'}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between text-xl font-serif pt-4 border-t border-gray-50">
                      <span>Total</span>
                      <span>{cartTotal.toFixed(2)} €</span>
                    </div>
                  </div>
                  <button className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-3">
                    Commander — {cartTotal.toFixed(2)} €
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">
                    Paiement sécurisé par carte ou sur place
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
