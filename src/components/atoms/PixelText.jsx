export default function PixelText({ as: Tag = 'p', className = '', children, ...props }) {
  return <Tag className={`pixel-text ${className}`} {...props}>{children}</Tag>;
}