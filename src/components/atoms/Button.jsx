export default function Button({ children, variant = 'primary', className = '', ...props }) {
  return <button className={`pixel-button pixel-button--${variant} ${className}`} {...props}>{children}</button>;
}