import React, { useState, useEffect } from "react";
import {
  Eye,
  ArrowRight,
  Zap,
  Users,
  Brain,
  Shield,
  Globe,
  TrendingUp,
  Clock,
  Target,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const OurProduct = ({ productData = [] }) => {
  const [filteredProducts, setFilteredProducts] = useState(productData);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setFilteredProducts(productData);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        mass: 0.8,
      },
    },
  };

  // Function to get gradient based on product id
  const getProductGradient = (id) => {
    const gradients = [
      "from-[#1F2E9A] via-[#1A3CC3] to-[#2430A3]",
      "from-[#9B3DFF] via-[#9B5CFF] to-[#A83DFF]",
      "from-[#2EC5FF] via-[#2ED8FF] to-[#00C6FF]",
      "from-[#00B894] via-[#00D3A9] to-[#00E5B4]",
      "from-[#FF6B6B] via-[#FF8E8E] to-[#FFA8A8]",
      "from-[#8E44AD] via-[#9B59B6] to-[#AF7AC5]",
    ];
    return gradients[id % gradients.length];
  };

  // Function to get icon based on product title
  const getProductIcon = (title, id) => {
    const icons = [
      <Users className="w-5 h-5 text-white" />,
      <Brain className="w-5 h-5 text-white" />,
      <Shield className="w-5 h-5 text-white" />,
      <Globe className="w-5 h-5 text-white" />,
      <TrendingUp className="w-5 h-5 text-white" />,
      <Zap className="w-5 h-5 text-white" />,
    ];
    
    if (title?.toLowerCase().includes("hrms") || title?.toLowerCase().includes("hr")) {
      return <Users className="w-5 h-5 text-white" />;
    } else if (title?.toLowerCase().includes("recruitment") || title?.toLowerCase().includes("ai")) {
      return <Brain className="w-5 h-5 text-white" />;
    } else if (title?.toLowerCase().includes("document")) {
      return <Shield className="w-5 h-5 text-white" />;
    } else if (title?.toLowerCase().includes("attendance")) {
      return <Globe className="w-5 h-5 text-white" />;
    } else if (title?.toLowerCase().includes("insight") || title?.toLowerCase().includes("analytic")) {
      return <TrendingUp className="w-5 h-5 text-white" />;
    }
    
    return icons[id % icons.length];
  };

  // Default product data if none provided
  const defaultProducts = [
    {
      id: 1,
      title: "Intelligent Recruitment",
      short_desc: "AI-powered recruitment platform with smart matching and automated workflows",
      title_meta: "Smart Hiring Solution",
      accuricy: "98% accuracy",
      support_time: "24/7 support",
      happy_customer: "500+",
      rating: "4.9",
      slug: "intelligent-recruitment",
      images: [{ image_url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop" }]
    },
    {
      id: 2,
      title: "HRMS Features",
      short_desc: "Complete employee lifecycle management with automated workflows",
      title_meta: "HR Management",
      accuricy: "99% efficiency",
      support_time: "24/7 support",
      happy_customer: "1000+",
      rating: "4.8",
      slug: "hrms-features",
      images: [{ image_url: "https://images.unsplash.com/photo-1552581234-26160f608093?w=400&h=300&fit=crop" }]
    },
    {
      id: 3,
      title: "Smart Document Hub",
      short_desc: "AI-driven document management with smart categorization",
      title_meta: "Document Management",
      accuricy: "99.9% security",
      support_time: "24/7 support",
      happy_customer: "300+",
      rating: "4.7",
      slug: "smart-document-hub",
      images: [{ image_url: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop" }]
    },
    {
      id: 4,
      title: "Compliance Guardian",
      short_desc: "Automated compliance monitoring with real-time updates",
      title_meta: "Legal Compliance",
      accuricy: "100% compliance",
      support_time: "24/7 support",
      happy_customer: "200+",
      rating: "4.9",
      slug: "compliance-guardian",
      images: [{ image_url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop" }]
    },
    {
      id: 5,
      title: "Attendance Pro",
      short_desc: "Real-time tracking with geofencing and biometric integration",
      title_meta: "Time & Attendance",
      accuricy: "99.5% accuracy",
      support_time: "24/7 support",
      happy_customer: "400+",
      rating: "4.8",
      slug: "attendance-pro",
      images: [{ image_url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop" }]
    },
    {
      id: 6,
      title: "Insights Dashboard",
      short_desc: "Interactive analytics with predictive insights and custom KPIs",
      title_meta: "Business Intelligence",
      accuricy: "98% accuracy",
      support_time: "24/7 support",
      happy_customer: "350+",
      rating: "4.9",
      slug: "insights-dashboard",
      images: [{ image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop" }]
    },
  ];

  const products = productData.length > 0 ? productData : defaultProducts;

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #FAFAFF 0%, #F2EEFF 50%, #FAFAFF 100%)",
      }}
    >
      {/* Sophisticated Background Pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #e2e8f0 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
            opacity: 0.4,
          }}
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.04, 0.07, 0.04],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-[#1F2E9A] to-[#9B3DFF] rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.15, 1, 1.15],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#2EC5FF] to-[#00B894] rounded-full blur-3xl"
        />
      </div>

      {/* Max Width 7xl Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6" 
               style={{ backgroundColor: 'rgba(20,184,166,0.1)', borderColor: 'rgba(20,184,166,0.2)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-teal">Our Products</span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1]">
            <span className="block text-[#2430A3]">Discover Our</span>
            <span className="block mt-2 bg-gradient-to-r from-[#1F2E9A] via-[#9B3DFF] to-[#E60023] bg-clip-text text-transparent">
              Product Ecosystem
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            A seamlessly integrated platform where every module works in perfect
            harmony to transform your HR operations.
          </p>
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          {products.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-24"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-7xl mb-6"
              >
                📦
              </motion.div>
              <h4 className="text-3xl font-bold bg-gradient-to-r from-[#1F2E9A] to-[#9B3DFF] bg-clip-text text-transparent mb-3">
                No products found
              </h4>
              <p className="text-lg text-gray-500 mb-8">
                Please check back later for our product listings
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="products-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={cardVariants}
                  layout
                  className="group relative bg-white rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl shadow-gray-200/60 hover:shadow-2xl hover:shadow-gray-300/80 transition-all duration-500 hover:-translate-y-3 cursor-pointer border border-gray-200/60"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  onClick={() => navigate(`/product/${product.slug || product.id}`)}
                >
                  {/* Premium Image Container */}
                  <div className="relative h-56 md:h-60 lg:h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ 
                        backgroundImage: `url(${product.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop'})` 
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a143c] via-[#0a143c]/70 to-transparent transition-all duration-500 group-hover:from-[#465aff] group-hover:via-[#465aff]/70" />

                    {/* Stats Badge - Top Left */}
                    <motion.div
                      className="absolute top-4 left-4 z-20"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-xl md:rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/40">
                        <div
                          className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-gradient-to-r ${getProductGradient(product.id)} animate-pulse`}
                        />
                        <span className="text-[10px] md:text-xs font-bold text-gray-900">
                          {product.rating ? `${product.rating} ★` : 'Premium'}
                        </span>
                      </div>
                    </motion.div>

                    {/* Views Badge - Hover State */}
                    <motion.div
                      className="absolute top-16 right-4 z-20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: hoveredProduct === product.id ? 1 : 0,
                        y: hoveredProduct === product.id ? 0 : 10,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 px-2 py-1.5 md:px-3 md:py-2 rounded-lg md:rounded-xl bg-white/20 backdrop-blur-md text-white">
                          <Eye className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="text-xs md:text-sm font-semibold">
                            {product.happy_customer || 0}
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Center Hover Action Icon */}
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: hoveredProduct === product.id ? 1 : 0,
                          scale: hoveredProduct === product.id ? 1 : 0,
                          rotate: hoveredProduct === product.id ? 360 : 0,
                        }}
                        transition={{
                          duration: 0.5,
                          rotate: { duration: 0.6 },
                        }}
                        className="w-14 h-14 md:w-20 md:h-20 bg-white/98 backdrop-blur-lg rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/50"
                      >
                        <ArrowRight
                          className="w-5 h-5 md:w-7 md:h-7 text-[#1F2E9A] group-hover:-rotate-45 transition-transform duration-500"
                          strokeWidth={2.5}
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Premium Content Section */}
                  <div className="p-4 md:p-6">
                    <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                      <div className={`p-2 md:p-2.5 rounded-lg md:rounded-xl bg-gradient-to-br ${getProductGradient(product.id)}`}>
                        {getProductIcon(product.title, product.id)}
                      </div>
                      <h3 className="text-base md:text-xl font-bold text-gray-900 leading-tight group-hover:text-[#1F2E9A] transition-colors duration-300 line-clamp-1">
                        {product.title}
                      </h3>
                    </div>

                    <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 leading-relaxed line-clamp-2">
                      {product.short_desc || product.title_meta || "Comprehensive HR solution for modern businesses"}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-xs text-gray-500">
                        {product.accuricy && (
                          <div className="flex items-center gap-1 md:gap-1.5">
                            <Target className="w-3 h-3 md:w-3.5 md:h-3.5 text-gray-400" />
                            <span className="font-medium">{product.accuricy}</span>
                          </div>
                        )}
                        {product.support_time && (
                          <div className="flex items-center gap-1 md:gap-1.5">
                            <Clock className="w-3 h-3 md:w-3.5 md:h-3.5 text-gray-400" />
                            <span className="font-medium">{product.support_time}</span>
                          </div>
                        )}
                      </div>

                      {/* Explore Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-[10px] md:text-xs font-semibold px-2 py-1 md:px-3 md:py-1.5 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 flex items-center gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/product/${product.slug || product.id}`);
                        }}
                      >
                        <span>Explore</span>
                        <ChevronRight className="w-2.5 h-2.5 md:w-3 md:h-3" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Subtle Shine Effect */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                      background:
                        hoveredProduct === product.id
                          ? `linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`
                          : "transparent",
                    }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* View All Products Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12 md:mt-16"
        >
          {/* <button
            onClick={() => navigate("/product")}
            className="group relative inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl bg-gradient-to-r from-[#1F2E9A] to-[#2430A3] text-white font-bold text-base md:text-lg hover:shadow-2xl hover:shadow-[#1F2E9A]/30 transition-all duration-500 hover:-translate-y-1 btn-teal"
          >
            <span>View All Products</span>
            <ExternalLink className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </button> */}
          <button className="btn group btn-slide-bg font-bold text-base md:text-lg! hover:shadow-2xl hover:shadow-[#1F2E9A]/30 transition-all duration-500 hover:-translate-y-1"  onClick={() => navigate("/product")}>
            View All Products   <ExternalLink className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
    </section>
  );
};

export default OurProduct;