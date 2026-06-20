interface AvatarProps {
  initials: string;
  colorHex: string;
  size?: number;
}

export default function Avatar({ initials, colorHex, size = 32 }: AvatarProps) {
  return (
    <div 
      className="rounded-full flex items-center justify-center font-bold shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: `${colorHex}22`, // 22 is hex for ~13% opacity
        border: `1px solid ${colorHex}44`,
        color: colorHex,
        fontSize: size * 0.35,
      }}
    >
      {initials}
    </div>
  );
}