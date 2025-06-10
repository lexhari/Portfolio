function Button({ children, href, download, variant = "primary", className = "", onClick, newTab }) {
  const getButtonClasses = () => {
    const baseClasses = "px-4 py-2 transition-colors duration-200";
    
    const variantClasses = {
      primary: "bg-yellow text-sm rounded-xl font-medium font-dm-sans hover:bg-yellow/90",
      outlined: "bg-transparent border border-creamBG font-medium rounded-2xl text-xl font-norwige text-creamBG py-4 hover:bg-yellow hover:text-offBlack hover:border-yellow",
      link: "bg-transparent text-creamBG underline font-medium font-norwige hover:text-yellow px-0 py-0",
      link2: "bg-transparent text-creamBG font-norwige font-semibold hover:text-yellow px-0 py-0"
    };
    
    return `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${className}`;
  };

  if (download && href) {
    return (
      <a href={href} download>
        <button className={getButtonClasses()}>{children}</button>
      </a>
    );
  }
  
  if (href && !download) {
    return (
      <a 
        href={href} 
        target={newTab ? "_blank" : undefined} 
        rel={newTab ? "noopener noreferrer" : undefined}
      >
        <button className={getButtonClasses()}>{children}</button>
      </a>
    );
  }
  
  return (
    <button className={getButtonClasses()} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;