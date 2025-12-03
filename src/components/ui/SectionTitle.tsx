/**
 * SK Rental - Section Title with Ribbons Component
 */

interface SectionTitleProps {
  primaryText: string;
  secondaryText: string;
  primaryText2?: string;
  secondaryText2?: string;
  centered?: boolean;
}

export default function SectionTitle({
  primaryText,
  secondaryText,
  primaryText2,
  secondaryText2,
  centered = true,
}: SectionTitleProps) {
  return (
    <div className={`relative ${centered ? 'text-center' : ''}`}>
      {/* Ribetes laterales */}
      <div className="flex items-center justify-center gap-4">
        {/* Ribete izquierdo */}
        <span className="hidden md:block h-[2px] w-16 lg:w-24 bg-gradient-to-r from-transparent to-primary" />

        {/* Texto */}
        <p className="text-xl md:text-2xl lg:text-3xl">
          <span className="text-secondary font-medium">{primaryText} </span>
          <span className="text-primary font-bold">{secondaryText}</span>
          {primaryText2 && (
            <>
              <span className="text-secondary font-medium"> {primaryText2} </span>
              <span className="text-primary font-bold">{secondaryText2}</span>
            </>
          )}
        </p>

        {/* Ribete derecho */}
        <span className="hidden md:block h-[2px] w-16 lg:w-24 bg-gradient-to-l from-transparent to-primary" />
      </div>
    </div>
  );
}
